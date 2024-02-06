import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from 'axios'

import type { ProviderType } from '@/lib/auth'
import { NamuiError } from '@/error'

export class NamuiApi {
  private static instance: AxiosInstance
  private static instanceOption: CreateAxiosDefaults = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  }

  static getNewToken(refreshToken?: string) {
    if (!refreshToken) throw new NamuiError.UnauthorizedError()
  }

  /**
   * @apiType Server
   * @param provider
   * @returns
   */
  static signIn(provider: ProviderType, code: string | string[]) {
    return NamuiApi.getData<{ accessToken: string; refreshToken: string }>(
      NamuiApi.handler({
        method: 'POST',
        url: `/api/v1/auth/login`,
        data: {
          provider,
          code,
        },
      }),
    )
  }

  /**
   *
   * @returns {AxiosInstance}
   */
  static getInstance(): AxiosInstance {
    if (!NamuiApi.instance) {
      NamuiApi.instance = axios.create(this.instanceOption)
    }
    return NamuiApi.instance
  }

  private static async getData<T>(
    response: Promise<AxiosResponse<{ data: T }>>,
  ) {
    return response.then((res) => res.data)
  }
  private static getTokenFromHeader() {
    const namuiWikiInstance = this.getInstance()
    const token = namuiWikiInstance.defaults?.headers?.['Authorization'] ?? ''
    return String(token ?? '').replaceAll('Bearer ', '')
  }

  private static handler<Response>(config: AxiosRequestConfig) {
    return this.getInstance()<Response>(config)
  }
}
