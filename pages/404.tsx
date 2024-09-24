import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { cn } from '@/lib/client/utils'
import BaseLayout from '@/layout/base-layout'
import { Button } from '@/components/ui'
import { useWikiContext } from '@/contexts/wiki-provider'
import Flower404 from '@/components/svgs/404-flower'
import Tree404 from '@/components/svgs/404-tree'

const Pages = () => {
  const router = useRouter()
  const { wikiType } = useWikiContext()
  return (
    <BaseLayout showHeader={false} className={cn('h-calc-h overflow-y-scroll')}>
      <div className="-mt-5 flex grow flex-col items-center justify-center space-y-8 px-5 text-center">
        {wikiType === 'ROMANCE' ? <Flower404 /> : <Tree404 />}
        <div className="flex w-full flex-col items-center justify-center space-y-2">
          <h1 className="text-mainTitle2-bold ">페이지를 찾을 수 없어요</h1>
          <p className="text-subTitle2-medium text-text-sub-gray4f">
            입력한 주소가 정확한지 <br />
            다시 한번 확인해 주세요
          </p>
        </div>
        <Button
          onClick={() => {
            router.push('/main')
          }}
          className="w-40"
        >
          돌아가기
        </Button>
      </div>
    </BaseLayout>
  )
}

Pages.getLayout = (page: ReactNode) => page

export default Pages
