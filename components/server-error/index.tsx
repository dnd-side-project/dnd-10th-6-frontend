import Button from '@/components/button'
import BaseLayout from '@/layout/base-layout'
import { cn } from '@/lib/client/utils'
import React from 'react'
import { useRouter } from 'next/router'

const ServerError = () => {
  const router = useRouter()
  return (
    <BaseLayout showHeader={false} className={cn('h-calc-h overflow-y-scroll')}>
      <div className="grow -mt-5 flex flex-col items-center justify-center px-5 text-center space-y-8">
        <div className="w-full flex flex-col justify-center items-center space-y-2">
          <h1 className="text-mainTitle2-bold ">서버에 문제가 생겼어요</h1>
          <p className="text-subTitle2-medium text-text-sub-gray4f">
            잠시 후 다시 시도해주세요
          </p>
        </div>

        <Button
          onClick={() => {
            router.push('/garden')
          }}
          className="w-32"
        >
          내 정원가기
        </Button>
      </div>
    </BaseLayout>
  )
}

export default ServerError
