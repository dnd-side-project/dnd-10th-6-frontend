interface ShareToKakaoArg {
  templateId: number
  installTalk?: boolean
  templateArgs: {
    SURVEY_PATH: string
  }
  serverCallbackArgs?: {}
}
export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production'
      readonly NEXT_PUBLIC_G_TAG: string
      readonly CHROMATIC_PROJECT_TOKEN: string
      readonly NEXT_PUBLIC_KAKAO_CLIENT_ID: string
      readonly NEXT_PUBLIC_KAKAO_REDIRECT_URL: string
      readonly NEXT_PUBLIC_API_URL: string
      readonly HOST: string
      readonly NEXT_PUBLIC_KAKAO_SHARE_TEMPLATE_ID: string
      readonly NEXT_PUBLIC_KAKAO_JS_KEY: string
      readonly NEXT_PUBLIC_NAVER_VERIFICATION: string
    }
  }
  interface Window {
    Kakao?: {
      init: (key: string) => void
      isInitialized: () => boolean
      Share: {
        sendCustom: (args: ShareToKakaoArg) => void
      }
    }
  }
}
