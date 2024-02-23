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
import { DashboardData } from '@/model/dashboard.entity'
import { QsSchemaType } from '@/hooks/useQuestionsForm'

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

  static async getTokenFromServer() {
    return await NamuiApi.handler({
      method: 'GET',
      url: '/api/auth/access',
      baseURL:
        typeof window !== 'undefined'
          ? window.location.origin
          : process.env.HOST,
    })
  }

  static async submitSurvey(data: QsSchemaType) {
    return await NamuiApi.handler({
      method: 'POST',
      url: '/api/v1/surveys',
      data,
    })
  }

  static async withdraw() {
    return await NamuiApi.handler({
      method: 'DELETE',
      url: '/api/v1/withdraw',
    })
  }

  static async editProfile(nickname: string) {
    return await NamuiApi.handler({
      method: 'PUT',
      url: '/api/v1/users/profile',
      data: { nickname },
    })
  }

  static async getPublicUserInfo(wikiId: string) {
    return await NamuiApi.handler<{ data: { nickname: string } }>({
      method: 'GET',
      url: `/api/v1/users?wikiId=${wikiId}`,
    })
  }

  static async getUserData() {
    return await NamuiApi.handler<{ data: User }>({
      method: 'GET',
      url: '/api/v1/users/profile',
    })
  }

  static async getDashboard(filter: [key: string, value: string]) {
    return await NamuiApi.handler<NamuiResponse<DashboardData>>({
      method: 'GET',
      url: '/api/v1/dashboard',
      params:
        filter[0] === 'total'
          ? {}
          : {
              [filter[0]]: filter[1],
            },
    })
  }

  static async getQs() {
    return await NamuiApi.handler<NamuiResponse<Question[]>>({
      method: 'GET',
      url: '/api/v1/questions',
    })
  }

  static async getSurveyId(userId: string) {
    return await NamuiApi.handler<NamuiResponse<string>>({
      method: 'GET',
      url: `/api/v1/surveys?surveyId=${userId}`,
    })
  }

  static async signUp(nickname: string) {
    return await NamuiApi.handler<{
      accessToken: string
    }>({
      method: 'POST',
      url: '/api/auth/signup',
      baseURL:
        typeof window !== 'undefined'
          ? window.location.origin
          : process.env.HOST,
      data: {
        nickname,
      },
    })
  }

  static async signOut() {
    return await NamuiApi.handler({
      method: 'POST',
      url: '/api/auth/signout',
      baseURL:
        typeof window !== 'undefined'
          ? window.location.origin
          : process.env.HOST,
    })
  }

  private static async getNewToken() {
    const { accessToken } = await NamuiApi.handler<{
      accessToken: string | null
      message: string
    }>({
      method: 'POST',
      url: '/api/auth/refresh',
      baseURL:
        typeof window !== 'undefined'
          ? window.location.origin
          : process.env.HOST,
    })
    return accessToken
  }

  private static injectInterceptor(instance: AxiosInstance) {
    const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
      if (process.env.NODE_ENV === 'development') {
        console.log(
          '%c[LOG-Request-URL]: ' + `%c${config.url}`,
          'color: #00BC68;',
          'color: #4F98E9;',
        )
        console.log(
          `%c[LOG-Request-Header] : %c${config.headers}`,
          'color: #00BC68;',
          'color: #4F98E9;',
        )
      }
      const accessToken = NamuiApi.accessToken
      if (accessToken) {
        config.headers = {
          ...config.headers,
          [AUTH.AUTH_HEADER_KEY]: accessToken,
        }
      } else {
        delete config.headers?.[AUTH.AUTH_HEADER_KEY]
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
          `%c[LOG-RESPONSE-ERROR]
%cPATH: %c${error.request.responseURL}
%cMessage: %c${error?.message}`,
          'color: #DC0000;',
          'color: #f56a6a;',
          'color: #DC0000;',
          'color: #f56a6a;',
          'color: #DC0000;',
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
        ? raiseNamuiErrorFromStatus(
            error.status || error.response?.status,
            true,
          )
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
    } else {
    }
  }
  static injectCookies(cookie: string) {
    this.getInstance().defaults.headers.common.cookie = cookie
  }

  private static async handler<Response>(config: AxiosRequestConfig) {
    return (await this.getInstance()(config)) as Response
  }
}
