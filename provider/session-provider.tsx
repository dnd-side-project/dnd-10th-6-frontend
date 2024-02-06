import { NamuiError } from '@/error'
import { Session } from '@/lib/auth'
import {
  PropsWithChildren,
  createContext,
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

const SessionContext = createContext<SessionContextValue | undefined>(undefined)

interface SessionProviderProps extends SessionContextType {
  refetchOnWindowFocus?: boolean
}
export const SessionProvider = ({
  children,
  ...props
}: PropsWithChildren<SessionProviderProps>) => {
  if (!SessionContext) {
    throw new Error('React Context is unavailable in Server Components')
  }
  const { session: InitialSession, refetchOnWindowFocus } = props

  const hasInitialSession = props.session !== undefined
  const [session, setSession] = useState<Session>(InitialSession)
  const [loading, setLoading] = useState(!hasInitialSession)

  const _getSession = async () => {
    try {
      throw new NamuiError.NotImplimentError()
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    _getSession()

    return () => {}
  }, [])

  useEffect(() => {
    const visibilityHandler = () => {
      if (refetchOnWindowFocus && document.visibilityState === 'visible')
        throw new NamuiError.NotImplimentError()
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
        : session
          ? 'authenticated'
          : 'unauthenticated',
      async update() {
        if (loading || !session) return
        setLoading(true)
        const newSession = await new Promise<Session>((resolve) =>
          resolve(null),
        )
        setLoading(false)
        if (newSession) {
          setSession(newSession)
        }
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
}) => {
  if (!SessionContext) {
    throw new Error('React Context is unavailable in Server Components')
  }
  const value = useContext(SessionContext) as SessionContextValue<R>
  if (!value && process.env.NODE_ENV !== 'production') {
    throw new Error('must be wrapped in a <SessionProvider />')
  }

  const { required } = options ?? {}

  const requiredAndNotLoading = required && value.status === 'unauthenticated'

  if (requiredAndNotLoading) {
    return {
      data: value.data,
      update: value.update,
      status: 'loading',
    }
  }

  return value
}
