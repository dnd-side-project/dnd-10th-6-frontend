import OnBoard from '@/components/onboard'
import { useEffect, useState } from 'react'

const Page = () => {
  const [isViewOnboard, setIsViewOnboard] = useState(() => false)
  useEffect(() => {
    setIsViewOnboard(!!localStorage.getItem('namui-init'))
  }, [])

  return isViewOnboard ? (
    <div className="min-h-[100dvh] flex flex-col pb-[50px] px-5">INDEX</div>
  ) : (
    <OnBoard
      onStartClick={() => {
        localStorage.setItem('namui-init', 'true')
        setIsViewOnboard(true)
      }}
    />
  )
}

export default Page
