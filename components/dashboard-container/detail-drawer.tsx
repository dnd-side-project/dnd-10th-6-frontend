import React, { useContext, useMemo, useRef } from 'react'
import Drawer from '../ui/drawer'
import { DetailQsContext } from '@/pages/dashboard'
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

export interface DetailResponse {
  data: Data
}

export interface Data {
  questionTitle: string
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
  period: string
  relation: string
  answer: string
  reason: string
  createdAt: string
}

export type DetailType = 'TWO_CHOICE' | 'SHORT_ANSWER' | 'MULTIPLE_CHOICE'
const DetailDrawer = () => {
  const router = useRouter()

  const detailType: DetailType =
    (router.query.type as DetailType) ?? 'MULTIPLE_CHOICE'
  return (
    <Drawer
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
    </Drawer>
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
      return page.data?.answers?.totalPage <= page?.data?.answers?.page
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
        <p className="px-5 py-4 text-body3-medium text-text-sub-gray76">
          <b className="text-brand-main-green400">
            {parsedData?.pages[0]?.data?.answers?.totalCount}명
          </b>
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
}: {
  cardItem: Content
  summary: string
  treeType: TreeType
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
          <h3 className="text-body1-bold">{cardItem.senderName}님</h3>
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
}: {
  cardItem: Content
  summary: string
  treeType: TreeType
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
          <h3 className="text-body1-bold">{cardItem.senderName}님</h3>
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
