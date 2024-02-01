export type Provider = 'kakao'
export const getNewToken = async () => '11'

export class Oauth {
  static getAuthorizationURL(provider: Provider | string) {
    let url = ''
    let clientId = ''
    let redirectUri = ''
    switch (provider) {
      case 'kakao':
        url = 'https://kauth.kakao.com/oauth/authorize'
        clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
        redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL
        break
      default:
        return null
    }
    const authURL = new URL(url)
    authURL.searchParams.set('response_type', 'code')
    authURL.searchParams.set('client_id', clientId)
    authURL.searchParams.set('redirect_uri', redirectUri)
    return authURL
  }
}
