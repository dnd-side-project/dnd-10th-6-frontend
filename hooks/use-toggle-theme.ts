import { useBrowserLayoutEffect } from '@/lib/client/utils'
import { WikiType } from '@/types'

export const useToggleTheme = (wikiType: WikiType) => {
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
}
