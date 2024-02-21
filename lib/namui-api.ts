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
import { Question } from '@/model/question.entity'

interface NamuiResponse<T = any> {
  data: T
}

export class NamuiApi {
  private static instance: AxiosInstance
  private static instanceOption: CreateAxiosDefaults = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  }
  private static accessToken: string = ''
  /**
   * @NOTE 로그인 API
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

  static async getUserData() {
    return await NamuiApi.handler<{ data: User }>({
      method: 'GET',
      url: '/api/v1/users/profile',
    })
  }

  static async getQs() {
    return await NamuiApi.handler<NamuiResponse<Question[]>>({
      method: 'GET',
      url: '/api/v1/questions',
    })
  }

  static async signUp(nickname: string) {
    return await NamuiApi.handler<{
      accessToken: string
    }>({
      method: 'POST',
      url: '/api/auth/signup',
      baseURL: window.location.origin,
      data: {
        nickname,
      },
    })
  }

  static async signOut() {
    return await NamuiApi.handler({
      method: 'POST',
      url: '/api/auth/signout',
      baseURL: window.location.origin,
    })
  }

  private static async getNewToken() {
    const { accessToken } = await NamuiApi.handler<{
      accessToken: string | null
      message: string
    }>({
      method: 'POST',
      url: '/api/auth/refresh',
      baseURL: window.location.origin,
    })
    return accessToken
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
        if (newAccessToken) {
          error.config.headers = {
            ...error.config.headers,
            [AUTH.AUTH_HEADER_KEY]: newAccessToken,
          }
          this.setToken(newAccessToken)
          return await this.handler(error.config)
        }
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

  static hasToken() {
    return !!this.accessToken
  }

  static setToken(accessToken?: string) {
    if (accessToken) {
      NamuiApi.accessToken = accessToken
    }
  }

  private static async handler<Response>(config: AxiosRequestConfig) {
    return (await this.getInstance()(config)) as Response
  }
}
