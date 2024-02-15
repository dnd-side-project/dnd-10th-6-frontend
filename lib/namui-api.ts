import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from 'axios'
import type { ProviderType, User } from '@/lib/auth'
import { NamuiError, raiseNamuiErrorFromStatus } from '@/error'
import { AUTH } from '@/constants'

export class NamuiApi {
  private static instance: AxiosInstance
  private static instanceOption: CreateAxiosDefaults = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  }
  private static accessToken: string = ''
  /**
   * @param provider
   * @returns
   */
  static signIn(provider: ProviderType, code: string | string[]) {
    return NamuiApi.handler<{ accessToken: string; refreshToken: string }>({
      method: 'POST',
      url: `/api/v1/auth/login`,
      data: {
        provider: provider.toUpperCase(),
        code,
      },
    })
  }

  static getUserData() {
    return NamuiApi.handler<User>({
      method: 'GET',
      url: '/api/v1/auth/test',
    })
  }

  private static async getNewToken() {
    const serverURL = new URL(process.env.NEXT_PUBLIC_API_URL)
    serverURL.pathname = '/api/v1/refresh'
    const response = await fetch(serverURL).then((res) => {
      if (res.status > 400) {
        throw raiseNamuiErrorFromStatus(res.status)
      } else {
        return res.json() as Promise<{
          data: {
            accessToken: 'string'
          }
        }>
      }
    })
    NamuiApi.setToken(response.data.accessToken)
    return response.data.accessToken
  }

  private static injectInterceptor(instance: AxiosInstance) {
    const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[LOG-Request] : ${config.url}`)
        console.log(`[LOG-Request] : ${config.headers}`)
      }
      const accessToken = NamuiApi.accessToken

      config.headers = {
        ...config.headers,
        [AUTH.AUTH_HEADER_KEY]: accessToken,
      }

      return config
    }
    const onErrorRequest = (
      err: AxiosError | Error | NamuiError,
    ): Promise<AxiosError> => {
      return Promise.reject(err)
    }

    const onResponse = (config: AxiosResponse) => config.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onErrorResponse = async (error: any) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(
          `[LOG-RESPONSE-ERROR] : PATH-${error.request.path} ${error?.message}`,
        )
      }
      if (error.response?.status === 401) {
        const newAccessToken = await this.getNewToken()
        error.config.headers = {
          ...error.config.headers,
          [AUTH.AUTH_HEADER_KEY]: newAccessToken,
        }
        return await this.getInstance()(error.config)
      }
      const errorInstance = axios.isAxiosError(error)
        ? raiseNamuiErrorFromStatus(error.status || error.response?.status)
        : error

      return Promise.reject(errorInstance)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    instance.interceptors.request.use(onRequest, onErrorRequest)
    instance.interceptors.response.use(onResponse, onErrorResponse)
  }

  /**
   * @returns {AxiosInstance}
   */
  static getInstance(): AxiosInstance {
    if (!NamuiApi.instance) {
      NamuiApi.instance = axios.create(this.instanceOption)
      NamuiApi.injectInterceptor(NamuiApi.instance)
    }
    return NamuiApi.instance
  }

  static setToken(accessToken?: string) {
    if (accessToken) {
      NamuiApi.accessToken = accessToken
    }
  }

  private static async handler<Response>(config: AxiosRequestConfig) {
    const instance = this.getInstance()
    return instance(config) as Response
  }
}
