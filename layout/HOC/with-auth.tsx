import { ComponentType, ReactNode } from 'react'
import { useRouter } from 'next/router'
import { useSession } from '@/provider/session-provider'
import { useBrowserLayoutEffect } from '@/lib/client/utils'

type HOC = {
  (): React.JSX.Element
  getLayout?: (page: ReactNode) => ReactNode
}
function withAuth<T extends object>(Component: ComponentType<T>): HOC {
  const Protector = (props: T) => {
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
