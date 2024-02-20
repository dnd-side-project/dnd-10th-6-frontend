import { useEffect, useState } from 'react'

export const useMount = () => {
  const [mount, setMount] = useState(false)
  useEffect(() => {
    setMount(true)
  }, [])

  return mount
}
