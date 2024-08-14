import { PropsWithChildren, useCallback, useState } from 'react'
import { createContext } from '@/lib/client/context'
import { useBrowserLayoutEffect } from '@/lib/client/utils'
import { WikiType } from '@/types'

const WIKI_CONTEXT = 'WikiContext'

type WikiContext = {
  wikiType: WikiType
  setWikiType: (newWikiType: WikiType) => void
}

const [Provider, useWikiContext] = createContext<WikiContext>(WIKI_CONTEXT)

const WikiProvider = ({ children }: PropsWithChildren) => {
  const [wikiType, setWikiType] = useState<WikiType>('NAMUI')

  const handleChangeWikiType = useCallback((newWikiType: WikiType) => {
    setWikiType(newWikiType)
  }, [])

  useBrowserLayoutEffect(() => {
    const classList: string[] = []
    document.documentElement.classList.forEach((item) => {
      classList.push(item)
    })
    document.documentElement.classList.remove(...classList)
    switch (wikiType) {
      case 'NAMUI':
        break
      case 'ROMANCE':
        document.documentElement.classList.add('romance')
        break
    }
  }, [wikiType])
  return (
    <Provider wikiType={wikiType} setWikiType={handleChangeWikiType}>
      {children}
    </Provider>
  )
}

const useToggletheme = (wikiType: WikiType) => {
  const { setWikiType } = useWikiContext()

  useBrowserLayoutEffect(() => {
    setWikiType(wikiType)
  }, [setWikiType, wikiType])
}

export type { WikiContext }
export { WikiProvider, useWikiContext, useToggletheme }
