import { NotImplimentError } from '@/error'
import { ProviderType, Session, signIn } from '@/lib/auth'
import { useBrowserLayoutEffect } from '@/lib/client/utils'
import { NamuiApi } from '@/lib/namui-api'
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

export interface SessionContextType {
  session: Session
}

export type UpdateSession = () => Promise<Session | null>

export type SessionContextValue<R extends boolean = false> = R extends true
  ?
      | { update: UpdateSession; data: Session; status: 'authenticated' }
      | { update: UpdateSession; data: null; status: 'loading' }
  :
      | { update: UpdateSession; data: Session; status: 'authenticated' }
      | {
          update: UpdateSession
          data: null
          status: 'unauthenticated' | 'loading'
        }

type SessionHandler = {
  signin: (args?: { provider: ProviderType; callbackUrl?: string }) => void
  signout: () => Promise<void>
}
interface SessionProviderProps extends SessionContextType {
  refetchOnWindowFocus?: boolean
  onSessionChange?: (session: Session) => void
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined)

export const SessionProvider = ({
  children,
  ...props
}: PropsWithChildren<SessionProviderProps>) => {
  if (!SessionContext) {
    throw new Error('React Context is unavailable in Server Components')
  }
  const { session: InitialSession, refetchOnWindowFocus } = props

  const hasInitialSession = props.session !== undefined
  const [session, setSession] = useState<Session>(() => {
    return InitialSession
  })
  const [loading, setLoading] = useState(!hasInitialSession)

  useBrowserLayoutEffect(() => {
    props.onSessionChange && props.onSessionChange(session)
  }, [session])

  const _getSession = useCallback(async () => {
    try {
      if (session?.token?.accessToken) {
        const newSession = await NamuiApi.getUserData()
        setSession((prev) => ({ ...prev, user: newSession }))
      }
    } catch (error) {
      setSession(null)
    } finally {
      setLoading(false)
    }
  }, [session?.token?.accessToken])

  useEffect(() => {
    _getSession()

    return () => {}
  }, [_getSession])

  useEffect(() => {
    const visibilityHandler = () => {
      if (refetchOnWindowFocus && document.visibilityState === 'visible')
        throw new NotImplimentError()
    }
    document.addEventListener('visibilitychange', visibilityHandler, false)
    return () =>
      document.removeEventListener('visibilitychange', visibilityHandler, false)
  }, [refetchOnWindowFocus])

  const value = useMemo(
    () => ({
      data: session,
      status: loading
        ? 'loading'
        : Object.keys(session ?? {}).length
          ? 'authenticated'
          : 'unauthenticated',
      async update() {
        if (loading || !session) return
        setLoading(true)
        const newSession = await new Promise<Session>((resolve) =>
          resolve(null),
        )
        setLoading(false)
        setSession(newSession)
      },
    }),
    [session, loading],
  )

  return (
    <SessionContext.Provider value={value as never}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = <R extends boolean>(options?: {
  required: boolean
}): SessionContextValue<R> & SessionHandler => {
  if (!SessionContext) {
    throw new Error('React Context is unavailable in Server Components')
  }
  const value = useContext(SessionContext) as SessionContextValue<R>
  if (!value && process.env.NODE_ENV !== 'production') {
    throw new Error('must be wrapped in a <SessionProvider />')
  }

  const { required } = options ?? {}

  const signin: SessionHandler['signin'] = useCallback((args) => {
    const { provider = 'kakao', callbackUrl } = args ?? {}
    if (callbackUrl) {
      sessionStorage.setItem('callbackUrl', callbackUrl)
    }
    signIn(provider, { callbackUrl })
  }, [])

  const signout: SessionHandler['signout'] = useCallback(async () => {
    const url = `/api/auth/signout`
    await fetch(url, {
      method: 'POST',
    })
    window.location.href = window.location.origin
  }, [])

  const requiredAndNotLoading = required && value.status === 'unauthenticated'

  if (requiredAndNotLoading) {
    return {
      data: value.data,
      update: value.update,
      status: 'loading',
      signin,
      signout,
    }
  }

  return { ...value, signin, signout }
}
