import React, { ReactNode, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from '@/provider/session-provider'
import { useToggletheme } from '@/contexts/wiki-provider'
import FormLayout from '@/layout/form-layout'
import { WikiType } from '@/types'
import { Button } from '@/components/ui'
import ShareModal from '@/components/share-modal'
import submitTree from '@/assets/characters/submit-tree.svg'
import submitFlower from '@/assets/characters/submit-flower.svg'

const index = () => {
  const { data } = useSession()
  const searchParams = useSearchParams()
  const wikiType = searchParams.get('wikiType')! as WikiType

  useToggletheme(wikiType)

  const wikiInfo = useMemo(
    () => ({
      NAMUI: {
        icon: submitTree,
        wikiName: '남의위키',
      },
      ROMANCE: {
        icon: submitFlower,
        wikiName: '연애위키',
      },
    }),
    [],
  )

  return (
    <FormLayout
      button={
        <div className="flex w-full flex-col space-y-3">
          <ShareModal wikiType={wikiType}>
            <Button>친구에게 내 소개 부탁하기</Button>
          </ShareModal>
          {/* <Button variant="default">작성한 소개서 보러가기</Button> */}
        </div>
      }
      header={{
        leftIcon: <></>,
        center: <></>,
        rightIcon: (
          <Link href={data?.user?.wikiId ? 'garden' : '/'}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.786 6.45173C23.1277 6.11002 23.1277 5.556 22.786 5.21429C22.4443 4.87258 21.8903 4.87258 21.5486 5.21429L14.0007 12.7622L6.45271 5.21429C6.111 4.87258 5.55698 4.87258 5.21527 5.21429C4.87356 5.556 4.87356 6.11002 5.21527 6.45173L12.7632 13.9997L5.21527 21.5476C4.87356 21.8893 4.87356 22.4434 5.21527 22.7851C5.55697 23.1268 6.11099 23.1268 6.4527 22.7851L14.0007 15.2371L21.5486 22.7851C21.8903 23.1268 22.4443 23.1268 22.786 22.7851C23.1277 22.4434 23.1277 21.8893 22.786 21.5476L15.2381 13.9997L22.786 6.45173Z"
                fill="#111111"
              />
            </svg>
          </Link>
        ),
      }}
      content={
        <>
          <div className="flex grow flex-col items-center justify-center space-y-8 px-5 text-center">
            <Image src={wikiInfo[wikiType].icon} alt="submitTree" />
            <div className="flex w-full flex-col items-center justify-center space-y-2">
              <h1 className="text-mainTitle2-bold ">
                {wikiInfo[wikiType].wikiName} 작성이 끝났어요
              </h1>
              <p className="text-subTitle2-medium text-text-sub-gray4f">
                친구에게도 나에 대해 알려달라고
                <br />
                부탁해보세요
              </p>
            </div>
          </div>
        </>
      }
    />
  )
}

export default index
index.getLayout = (page: ReactNode) => page
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { wikiType } = ctx.query
  if (
    !wikiType ||
    typeof wikiType !== 'string' ||
    !['NAMUI', 'ROMANCE'].includes(wikiType.toUpperCase())
  ) {
    return { notFound: true }
  }

  return {
    props: {
      wikiType,
    },
  }
}
