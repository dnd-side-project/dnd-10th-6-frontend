import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from 'axios'

import { Provider } from '@/lib/server/auth'
import { NamuiError } from '@/error'

export class NamuiApi {
  private static instance: AxiosInstance
  private static instanceOption: CreateAxiosDefaults = {}

  static getNewToken(refreshToken?: string) {
    if (!refreshToken) throw new NamuiError.UnauthorizedError()
  }

  static signIn(provider: Provider) {
    return NamuiApi.handler({
      method: 'POST',
      url: `/api/auth/signin/${provider}`,
    })
  }

  private static getInstance() {
    if (!NamuiApi.instance) {
      NamuiApi.instance = axios.create(this.instanceOption)
    }
    return NamuiApi.instance
  }

  private static handler<Response>(config: AxiosRequestConfig) {
    return this.getInstance()<Response>(config)
  }
}
