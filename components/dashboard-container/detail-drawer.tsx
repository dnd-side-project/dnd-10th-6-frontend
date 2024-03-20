import React, { useContext, useEffect, useMemo, useRef } from 'react'

import useFilter, { Filter } from '@/hooks/use-filter'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { NamuiApi } from '@/lib/namui-api'
import { useIntersectionObserver } from '@/hooks/use-observer'
import { useSession } from '@/provider/session-provider'
import { motion } from 'framer-motion'
import { fadeInProps } from '@/variants'
import { relations } from '../badge/relation'
import { periods } from '../badge/period'
import { Period, Relation, TreeType, treeCardAsset } from '@/model/tree.entity'
import { useRouter } from 'next/router'
import { cn } from '@/lib/client/utils'
import { ShareImageContext } from '../share-image'
import { parseShareCardItems } from '../share-image/constants'
import { useMount } from '@/hooks/use-mount'
import SideDrawer from '../side-drawer'

export interface DetailResponse {
  data: Data
}

export interface Data {
  questionTitle: string
  questionName: string
  answers: Pageable
}

export interface Pageable {
  content: Content[]
  page: number
  size: number
  totalPage: number
  totalCount: number
}

export interface Content {
  senderName: string
  optionName: string
  period: Period
  relation: Relation
  answer: string
  reason: string
  createdAt: string
}

export type DetailType = 'TWO_CHOICE' | 'SHORT_ANSWER' | 'MULTIPLE_CHOICE'
const DetailDrawer = () => {
  const isMounted = useMount()
  const router = useRouter()
  const { clear } = useFilter()

  const detailType: DetailType =
    (router.query.type as DetailType) ?? 'MULTIPLE_CHOICE'

  // 라우터 이동시 필터 초기화
  useEffect(() => {
    return () => {
      clear()
    }
  }, [router.query])
  return !isMounted ? (
    <></>
  ) : (
    <SideDrawer
      zIndex={19}
      header={{
        center: <p className="text-body1-bold">상세 보기</p>,
        options: {
          onBackClick() {
            router.back()
          },
          showRight: false,
        },
      }}
      open={!!router.query.id}
      trigger={<></>}
    >
      {typeof router.query.id === 'string' ? (
        <Content id={router.query.id} type={detailType} />
      ) : null}
    </SideDrawer>
  )
}

export default DetailDrawer
const bgColor = (cardItem: Content) => {
  switch (cardItem.relation) {
    case 'ELEMENTARY_SCHOOL':
      return 'bg-relation-elementary_school'
    case 'MIDDLE_AND_HIGH_SCHOOL':
      return 'bg-relation-middle_and_high_school'
    case 'UNIVERSITY':
      return 'bg-relation-university'
    case 'WORK':
      return 'bg-relation-work'
    case 'SOCIAL':
      return 'bg-relation-social'
    case 'ETC':
      return 'bg-relation-etc'
    default:
      return ''
  }
}
function Content({ id, type }: { id: string; type: DetailType }) {
  const { selectedFilter } = useFilter()
  const { showShareImage } = useContext(ShareImageContext)
  const { data: user } = useSession()
  const {
    data: qs,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<
    DetailResponse,
    Error,
    InfiniteData<DetailResponse>,
    [string, string, string, string]
  >({
    initialPageParam: 0,
    getNextPageParam: (page) => {
      return page.data?.answers?.totalPage - 1 <= page?.data?.answers?.page
        ? undefined
        : page?.data?.answers?.page + 1
    },
    queryKey: [
      'question-detail',
      id,
      selectedFilter?.type ?? 'period',
      selectedFilter?.value ?? 'ALL',
    ],
    queryFn: ({ pageParam = 0, queryKey, ...rest }) => {
      return NamuiApi.getQuestionDetailById(pageParam as number, queryKey[1], [
        queryKey[2],
        queryKey[3],
      ])
    },
    enabled: !!id,
    select(data) {
      data.pages.forEach((item) => {
        item.data.questionTitle = item.data.questionTitle.replace(
          '{{userName}}',
          user?.user?.name ?? '',
        )
      })
      return data
    },
  })

  const parsedData = useMemo(() => {
    qs?.pages.forEach((item) => {
      item.data.questionTitle = item.data.questionTitle.replace(
        '{{userName}}',
        user?.user?.name ?? '',
      )
    })
    return qs
  }, [qs, user])

  const { ref } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.5,
    hasNextPage,
    fetchNextPage,
  })

  const treeType = useRef(new TreeType(treeCardAsset)).current

  return (
    <div className="flex flex-col divide-y-[12px] divide-line-soft">
      <div className="p-5 flex flex-col space-y-4">
        <div className="text-body3-medium px-2 py-1 bg-gray-gray50 rounded-md w-fit text-text-sub-gray76">
          질문
        </div>
        {isLoading ? (
          <div className="space-y-2">
            <p className="h-5 skeleton w-1/5"></p>
            <p className="h-5 skeleton w-1/2"></p>
          </div>
        ) : (
          <p
            dangerouslySetInnerHTML={{
              __html: parsedData?.pages[0]?.data?.questionTitle ?? '',
            }}
          ></p>
        )}
      </div>
      <div className="flex flex-col">
        <Filter />
        <p className="px-5 py-4 text-body3-medium text-text-sub-gray76 flex items-center">
          {typeof parsedData?.pages[0]?.data?.answers?.totalCount !==
          'number' ? (
            <b className="text-brand-main-green400 skeleton w-10 h-4 block mr-1"></b>
          ) : (
            <b className="text-brand-main-green400">
              {parsedData?.pages[0]?.data?.answers?.totalCount}명
            </b>
          )}
          의 친구가 이유를 적었어요
        </p>
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <motion.div
                key={`card-skeleton-${index}`}
                variants={fadeInProps.variants}
                className="p-4 flex justify-between space-x-4"
              >
                <div className="aspect-square rounded-full skeleton h-12  flex justify-center items-center"></div>
                <div className="flex flex-col grow space-y-4">
                  <div className="flex flex-col space-y-1">
                    <h3 className="text-body1-bold skeleton h-4 w-1/5"></h3>
                    <p className="text-body3-medium text-text-sub-gray76 skeleton h-4 w-1/2"></p>
                  </div>
                  {/* <div>{cardItem.answer}</div> 뱃지들어가야함 */}
                  <p className="text-body1-medium text-text-main-black11 skeleton w-1/3 h-4"></p>
                </div>
              </motion.div>
            ))
          : parsedData?.pages.map((page, pageNo) => (
              <div key={page.data.answers.page}>
                {page.data.answers.content.map((cardItem, cardIndex) => {
                  const parsedCreatedAt = new Date(cardItem.createdAt)
                  const createdAt = `${parsedCreatedAt.getFullYear()}.${parsedCreatedAt.getMonth() + 1}.${parsedCreatedAt.getDate()}`
                  return type === 'TWO_CHOICE' ? (
                    <TwoChoice
                      cardItem={cardItem}
                      onShareClick={
                        Object.hasOwn(
                          parseShareCardItems,
                          page.data.questionName,
                        )
                          ? () =>
                              showShareImage({
                                period: cardItem.period,
                                relation: cardItem.relation,
                                optionName: cardItem.optionName,
                                questionName: page.data.questionName as any,
                                reason: cardItem.reason,
                                senderName: cardItem.senderName,
                                value:
                                  page.data.questionName === 'BORROWING_LIMIT'
                                    ? parseInt(cardItem.answer).toLocaleString()
                                    : cardItem.answer,
                              })
                          : undefined
                      }
                      summary={[
                        periods[cardItem.period],
                        relations[cardItem.relation],
                        createdAt,
                      ].join(' · ')}
                      treeType={treeType}
                      key={
                        cardItem.senderName +
                        cardItem.answer +
                        `${pageNo}-${cardIndex}`
                      }
                    />
                  ) : type === 'MULTIPLE_CHOICE' ? (
                    <MultipleChoice
                      cardItem={cardItem}
                      onShareClick={
                        Object.hasOwn(
                          parseShareCardItems,
                          page.data.questionName,
                        )
                          ? () =>
                              showShareImage({
                                period: cardItem.period,
                                relation: cardItem.relation,
                                optionName: cardItem.optionName,
                                questionName: page.data.questionName as any,
                                reason: cardItem.reason,
                                senderName: cardItem.senderName,
                                value:
                                  page.data.questionName === 'BORROWING_LIMIT'
                                    ? parseInt(cardItem.answer).toLocaleString()
                                    : cardItem.answer,
                              })
                          : undefined
                      }
                      summary={[
                        periods[cardItem.period],
                        relations[cardItem.relation],
                        createdAt,
                      ].join(' · ')}
                      treeType={treeType}
                      key={
                        cardItem.senderName +
                        cardItem.answer +
                        `${pageNo}-${cardIndex}`
                      }
                    />
                  ) : (
                    <motion.div
                      key={
                        cardItem.senderName +
                        cardItem.answer +
                        `${pageNo}-${cardIndex}`
                      }
                      variants={fadeInProps.variants}
                      className="p-4 flex justify-between space-x-4"
                    >
                      <div
                        className={`w-[48px] h-[48px] rounded-full flex justify-center items-center ${bgColor(
                          cardItem,
                        )}`}
                      >
                        {treeType.render(
                          cardItem.period as Period,
                          cardItem.relation as Relation,
                        )}
                      </div>
                      <div className="flex flex-col grow space-y-4">
                        <div className="flex flex-col space-y-1">
                          <h3 className="text-body1-bold">
                            {cardItem.senderName}님
                          </h3>
                          <p className="text-body3-medium text-text-sub-gray76">
                            {[
                              periods[cardItem.period],
                              relations[cardItem.relation],
                              createdAt,
                            ].join(' · ')}
                          </p>
                        </div>
                        <p className="text-body1-medium bg-gray-gray50 text-text-sub-gray76 rounded-md p-4">
                          {cardItem.answer}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            ))}
        <div ref={ref} className="w-2 h-1" />
      </div>
    </div>
  )
}

function MultipleChoice({
  cardItem,
  summary,
  treeType,
  onShareClick,
}: {
  cardItem: Content
  summary: string
  treeType: TreeType
  onShareClick?: () => void
}) {
  return (
    <motion.div
      variants={fadeInProps.variants}
      className="p-4 flex justify-between space-x-4"
    >
      <div
        className={`w-[48px] h-[48px] rounded-full flex justify-center items-center ${bgColor(
          cardItem,
        )}`}
      >
        {treeType.render(
          cardItem.period as Period,
          cardItem.relation as Relation,
        )}
      </div>
      <div className="flex flex-col grow space-y-4">
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between">
            <h3 className="text-body1-bold">{cardItem.senderName}님</h3>
            {onShareClick && (
              <button onClick={onShareClick} className="shrink-0 self-baseline">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.41406 8.39453C5.06888 8.39453 4.78906 8.67435 4.78906 9.01953V16.2493C4.78906 16.5944 5.06888 16.8743 5.41406 16.8743H14.5807C14.9259 16.8743 15.2057 16.5944 15.2057 16.2493V9.01953C15.2057 8.67435 14.9259 8.39453 14.5807 8.39453H12.4974C12.1522 8.39453 11.8724 8.11471 11.8724 7.76953C11.8724 7.42435 12.1522 7.14453 12.4974 7.14453H14.5807C15.6163 7.14453 16.4557 7.984 16.4557 9.01953V16.2493C16.4557 17.2848 15.6163 18.1243 14.5807 18.1243H5.41406C4.37853 18.1243 3.53906 17.2848 3.53906 16.2493V9.01953C3.53906 7.984 4.37853 7.14453 5.41406 7.14453H7.4974C7.84257 7.14453 8.1224 7.42435 8.1224 7.76953C8.1224 8.11471 7.84257 8.39453 7.4974 8.39453H5.41406Z"
                    fill="#999999"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 2.70703C10.3452 2.70703 10.625 2.98685 10.625 3.33203V12.4987C10.625 12.8439 10.3452 13.1237 10 13.1237C9.65482 13.1237 9.375 12.8439 9.375 12.4987V3.33203C9.375 2.98685 9.65482 2.70703 10 2.70703Z"
                    fill="#999999"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.56676 2.05205C9.80938 1.81598 10.1958 1.81598 10.4385 2.05205L13.3551 4.88988C13.6025 5.1306 13.6079 5.52629 13.3672 5.77368C13.1265 6.02108 12.7308 6.0265 12.4834 5.78579L10.0026 3.37202L7.52178 5.78579C7.27439 6.0265 6.8787 6.02108 6.63798 5.77368C6.39727 5.52629 6.40269 5.1306 6.65009 4.88988L9.56676 2.05205Z"
                    fill="#999999"
                  />
                </svg>
              </button>
            )}
          </div>
          <p className={cn('text-body3-medium text-text-sub-gray76')}>
            {summary}
          </p>
        </div>
        <div
          className={cn(
            'w-fit text-body3-medium px-2 py-1 rounded-md bg-gray-gray50 text-text-sub-gray76',
          )}
        >
          {cardItem.answer}
        </div>
        <p className="text-body1-medium bg-gray-gray50 text-text-sub-gray4f rounded-md p-4">
          {cardItem.reason}
        </p>
      </div>
    </motion.div>
  )
}

function TwoChoice({
  cardItem,
  summary,
  treeType,
  onShareClick,
}: {
  cardItem: Content
  summary: string
  treeType: TreeType
  onShareClick?: () => void
}) {
  const isPositiveAnswer = cardItem.answer.includes('🙆‍♂️')
  return (
    <motion.div
      variants={fadeInProps.variants}
      className="p-4 flex justify-between space-x-4"
    >
      <div
        className={`w-[48px] h-[48px] rounded-full flex justify-center items-center ${bgColor(
          cardItem,
        )}`}
      >
        {treeType.render(
          cardItem.period as Period,
          cardItem.relation as Relation,
        )}
      </div>
      <div className="flex flex-col grow space-y-4">
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between">
            <h3 className="text-body1-bold">{cardItem.senderName}님</h3>
            {onShareClick && (
              <button onClick={onShareClick} className="shrink-0 self-baseline">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.41406 8.39453C5.06888 8.39453 4.78906 8.67435 4.78906 9.01953V16.2493C4.78906 16.5944 5.06888 16.8743 5.41406 16.8743H14.5807C14.9259 16.8743 15.2057 16.5944 15.2057 16.2493V9.01953C15.2057 8.67435 14.9259 8.39453 14.5807 8.39453H12.4974C12.1522 8.39453 11.8724 8.11471 11.8724 7.76953C11.8724 7.42435 12.1522 7.14453 12.4974 7.14453H14.5807C15.6163 7.14453 16.4557 7.984 16.4557 9.01953V16.2493C16.4557 17.2848 15.6163 18.1243 14.5807 18.1243H5.41406C4.37853 18.1243 3.53906 17.2848 3.53906 16.2493V9.01953C3.53906 7.984 4.37853 7.14453 5.41406 7.14453H7.4974C7.84257 7.14453 8.1224 7.42435 8.1224 7.76953C8.1224 8.11471 7.84257 8.39453 7.4974 8.39453H5.41406Z"
                    fill="#999999"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 2.70703C10.3452 2.70703 10.625 2.98685 10.625 3.33203V12.4987C10.625 12.8439 10.3452 13.1237 10 13.1237C9.65482 13.1237 9.375 12.8439 9.375 12.4987V3.33203C9.375 2.98685 9.65482 2.70703 10 2.70703Z"
                    fill="#999999"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.56676 2.05205C9.80938 1.81598 10.1958 1.81598 10.4385 2.05205L13.3551 4.88988C13.6025 5.1306 13.6079 5.52629 13.3672 5.77368C13.1265 6.02108 12.7308 6.0265 12.4834 5.78579L10.0026 3.37202L7.52178 5.78579C7.27439 6.0265 6.8787 6.02108 6.63798 5.77368C6.39727 5.52629 6.40269 5.1306 6.65009 4.88988L9.56676 2.05205Z"
                    fill="#999999"
                  />
                </svg>
              </button>
            )}
          </div>

          <p className={cn('text-body3-medium text-text-sub-gray76')}>
            {summary}
          </p>
        </div>
        <div
          className={cn(
            'w-fit text-body3-medium px-2 py-1 rounded-md',
            isPositiveAnswer
              ? 'bg-brand-main-200 text-brand-main-green400'
              : 'bg-brand-alert-200 text-brand-alert-900',
          )}
        >
          {cardItem.answer}
        </div>
        <p className="text-body1-medium p-4  bg-gray-gray50 text-text-sub-gray4f rounded-md">
          {cardItem.reason}
        </p>
      </div>
    </motion.div>
  )
}
