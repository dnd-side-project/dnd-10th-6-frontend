export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production'
      readonly NEXT_PUBLIC_G_TAG: string
      readonly CHROMATIC_PROJECT_TOKEN: string
      readonly NEXTAUTH_URL: string
      readonly NEXTAUTH_SECRET: string
      readonly KAKAO_CLIENT_ID: string
      readonly KAKAO_CLIENT_SECRET: string
    }
  }
}
