import { useMemo } from 'react'
import { useRouter } from 'next/router'

export type DrawerType = 'detail' | 'setting' | string

export interface useDrawerValue {
  type: DrawerType[]
  isOpen: boolean
}

const useDrawer = (currentType: DrawerType): useDrawerValue => {
  const router = useRouter()

  const type = useMemo(
    () =>
      typeof router.query.dType === 'string'
        ? [router.query.dType]
        : router.query.dType ?? [],
    [],
  )
  return { type, isOpen: type.includes(currentType) }
}

export default useDrawer
