import { useBrowserLayoutEffect } from '@/lib/client/utils'
import { useSession } from '@/provider/session-provider'
import { useRouter } from 'next/router'
import { ComponentType } from 'react'

function withAuth(Component: ComponentType) {
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
  return Protector
}

export default withAuth

withAuth.displayName = 'test'
