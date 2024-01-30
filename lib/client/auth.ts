import { NamuiError } from '@/error'
import { Oauth, Provider } from '@/lib/server/auth'
export interface SignInOptions {
  callbackUrl?: string
  redirect?: boolean
}

export async function signIn(
  provider: Provider,
  options?: SignInOptions,
): Promise<void> {
  const { callbackUrl = window.location.href, redirect = true } = options ?? {}
  console.log(callbackUrl, '<<')

  const url = Oauth.getAuthorizationURL(provider)
  if (!url) {
    throw new NamuiError.BadRequestError()
  }
  if (redirect) {
    window.location.href = url.toString()
    if (url.toString().includes('#')) window.location.reload()
    return
  }
}
