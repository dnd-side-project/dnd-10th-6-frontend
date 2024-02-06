import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from 'axios'

import type { ProviderType } from '@/lib/auth'
import { NamuiError } from '@/error'

export class NamuiApi {
  private static instance: AxiosInstance
  private static instanceOption: CreateAxiosDefaults = {}

  static getNewToken(refreshToken?: string) {
    if (!refreshToken) throw new NamuiError.UnauthorizedError()
  }

  /**
   * @apiType Server
   * @param provider
   * @returns
   */
  static signIn(provider: ProviderType) {
    return NamuiApi.handler({
      method: 'POST',
      url: `/api/auth/signin/${provider}`,
    })
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

  private static getTokenFromHeader() {
    const namuiWikiInstance = this.getInstance()
    const token = namuiWikiInstance.defaults?.headers?.['Authorization'] ?? ''
    return String(token ?? '').replaceAll('Bearer ', '')
  }

  private static handler<Response>(config: AxiosRequestConfig) {
    return this.getInstance()<Response>(config)
  }
}
