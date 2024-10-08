export const AUTH = {
  ACCESS_EXPIRED_TIME: 86400,
  REFRESH_EXPIRED_TIME: 86400,
  AUTH_HEADER_KEY: 'X-NAMUIWIKI-TOKEN'.toLowerCase(),
  OAUTH_TOKEN: 'oauthAccessToken' as const,
  OAUTH_PROVIDER: 'oauthProvider' as const,
  ACCESS_TOKEN_KEY: 'accessToken' as const,
  REFRESH_TOKEN_KEY: 'refreshToken' as const,

  LOGIN_REDIRECT_URL: 'REDIRECT_URL' as const,
}

export const QUESTION_MAX = 14
export const RANK_COLOR = {
  NAMUI: ['#00BC68', '#199EF0', '#FFEB34'],
  ROMANCE: ['#FF6460', '#199EF0', '#FFEB34'],
}
