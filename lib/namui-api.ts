import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from 'axios'
import type { ProviderType, User } from '@/lib/auth'
import { BadRequestError, raiseNamuiErrorFromStatus } from '@/error'

export class NamuiApi {
  private static instance: AxiosInstance
  private static instanceOption: CreateAxiosDefaults = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  }

  /**
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

  static getUserData() {
    return NamuiApi.getData<User>(
      NamuiApi.handler({
        method: 'GET',
        url: '/api/v1/auth/test',
      }),
    )
  }

  /**
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

  private static async handler<Response>(config: AxiosRequestConfig) {
    try {
      const instance = this.getInstance()
      return await instance<Response>(config)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return raiseNamuiErrorFromStatus(err.status || err.response?.status)
      }
      throw new BadRequestError('Holly Molly...')
    }
  }
}
