import React, { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useSession } from '@/provider/session-provider'

import FormLayout from '@/layout/form-layout'

import MetaHead from '@/components/meta-head'
import Modal from '@/components/modal'
import { Button, Drawer, DrawerContent, DrawerFooter } from '@/components/ui'

import welcomeTree from '@/assets/characters/welcome-tree.webp'
import { useSearchParams } from 'next/navigation'
import { PropswithWikiType, WikiType, wikiTypeList } from '@/types'
import ShareModal from '@/components/share-modal'
import { Controller, useForm } from 'react-hook-form'
import { cn } from '@/lib/client/utils'

const WelcomePage = ({ wikiType }: PropswithWikiType) => {
  const router = useRouter()
  const { data } = useSession()
  const searchParams = useSearchParams()
  const wiki = wikiType || (searchParams.get('wikiType') as WikiType)
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [copyModalOpen, setCopyModalOpen] = useState(false)

  const closeBottomSheet = useCallback(
    (wikiType?: WikiType) => {
      setBottomSheetOpen(false)
      if (wikiType) {
        router.push({
          query: {
            wikiType,
          },
        })
        setShareModalOpen(true)
      }
    },
    [router],
  )

  return (
    <>
      <MetaHead
        title="환영해요! | 남의위키"
        description="남의위키를 통해 남이 써준 나의 소개서를 확인해보세요!"
        url="https://namui-wiki.life/welcome"
      />
      <FormLayout
        header={{
          leftIcon: <></>,
          center: <></>,
          rightIcon: (
            <button
              onClick={() => {
                router.replace('/garden')
              }}
            >
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
            </button>
          ),
        }}
        className="fixed left-0 top-0 z-10 w-full bg-white"
        content={
          <div className="-mt-5 flex grow flex-col items-center justify-center px-5 text-center">
            <Image src={welcomeTree} alt="welcome" width={300} height={150} />
            <p className="mb-3 mt-8 text-mainTitle2-bold">
              환영해요 {data?.user?.name}님
            </p>
            <p className="text-subTitle2-medium text-text-sub-gray4f">
              친구에게 내 소개를 부탁해보세요
              <br />
              친구가 소개서를 작성해주면
              <br />내 정원에 나무가 심겨요
            </p>

            <Modal
              open={copyModalOpen}
              onOpenChange={setCopyModalOpen}
              key="copyLinkModal"
              title="링크가 복사되었어요"
              footer={{
                item: [
                  <Button
                    onClick={() => setCopyModalOpen(false)}
                    variant="BG-accent"
                    className="border-t-[1px]"
                    key="copy-close"
                  >
                    확인
                  </Button>,
                ],
              }}
              trigger={<></>}
            />
          </div>
        }
        button={
          <Button onClick={() => setBottomSheetOpen(true)} variant="BG-brand">
            나에 대해 물어보기
          </Button>
        }
      />
      <BottomSheetButton
        bottomSheetOpen={bottomSheetOpen}
        closeBottomSheet={closeBottomSheet}
        wikiType={wiki}
      />
      <ShareModal
        wikiType={wiki}
        onOpenChange={setShareModalOpen}
        open={shareModalOpen}
      ></ShareModal>
    </>
  )
}

export default WelcomePage

// 추가된 BottomSheetButton 컴포넌트
interface BottomSheetButtonProps {
  bottomSheetOpen: boolean
  closeBottomSheet: (selectedWikiType?: WikiType) => void
  wikiType: WikiType
}

const BottomSheetButton = ({
  bottomSheetOpen,
  closeBottomSheet,
}: BottomSheetButtonProps) => {
  const form = useForm<{ wikiType: WikiType }>()

  const wikiInfo = useMemo(() => {
    return {
      NAMUI: {
        questionCount: 14,
        name: '남의위키',
        description: '다른 사람이 보는 내 모습은 어떨까요?',
      },
      ROMANCE: {
        questionCount: 8,
        name: '연애위키',
        description: '연애할 때 나는 어떤 사람인가요?',
      },
    }
  }, [])

  const handleSubmit = (values: { wikiType: WikiType }) => {
    closeBottomSheet(values.wikiType)
  }

  return (
    <>
      <Drawer
        open={bottomSheetOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeBottomSheet()
          }
        }}
      >
        <DrawerContent>
          <form
            className="flex flex-col p-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <Controller
              control={form.control}
              name="wikiType"
              render={({ field }) => (
                <div className="my-auto ml-2 flex flex-col items-start justify-start space-y-4">
                  <h2 className="text-left text-t2-kr-b">
                    나에 대해 물어볼
                    <br /> 주제를 선택해 주세요
                  </h2>
                  {wikiTypeList.map((wiki) => (
                    <button
                      type="button"
                      onClick={() => field.onChange(wiki)}
                      key={wiki}
                      data-selected={field.value === wiki}
                      className={cn(
                        'group flex w-full items-center justify-between space-y-2 rounded-2xl border-[1px] border-line-regular bg-white px-6 py-[30px] ',
                        'duration-200 data-[selected=true]:border-brand-main data-[selected=true]:bg-green-50',
                      )}
                    >
                      <div>
                        <div className="flex w-full items-center space-x-2">
                          <h3 className="text-t3-kr-b">
                            {wikiInfo[wiki].name}
                          </h3>
                          <div className="rounded-full bg-bg-green-hover px-[10px]  py-[3px] text-but4-m  text-green-500">
                            질문 {wikiInfo[wiki].questionCount}개
                          </div>
                        </div>
                        <p>{wikiInfo[wiki].description}</p>
                      </div>
                      <svg
                        width="22"
                        height="16"
                        viewBox="0 0 22 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-line-regular duration-200 group-data-[selected=true]:text-brand-main"
                      >
                        <path
                          d="M1.66663 9.16667L8.66663 15L20.3333 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  ))}

                  <Button type="submit">소개서 선택하기</Button>
                </div>
              )}
            />
          </form>

          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    </>
  )
}
