import { useBrowserLayoutEffect } from '@/lib/client/utils'
import { useSession } from '@/provider/session-provider'
import { useRouter } from 'next/router'
import { ComponentType, ReactNode } from 'react'
type HOC = {
  (): React.JSX.Element
  getLayout?: (page: ReactNode) => ReactNode
}
function withAuth(Component: ComponentType): HOC {
  const Protector = <P extends object>(props: P) => {
    const { update } = useSession()
    const router = useRouter()

    const getNewUserSession = async () => {
      const newSession = await update()
      if (!newSession) {
        router.replace('/')
      }
    }

    useBrowserLayoutEffect(() => {
      getNewUserSession()
    }, [])
    return <Component {...props} />
  }

  return Protector as HOC
}

export default withAuth

withAuth.displayName = 'withAuth'
