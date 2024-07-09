import React, { ReactNode, useState } from 'react'

import useFilter, { Filter } from '@/hooks/use-filter'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/use-observer'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { WritingListResponse } from '@/queries/surveys'
import { NamuiApi } from '@/lib/namui-api'
import SideDrawer from '@/components/side-drawer'
import WriteListCard from './wirte-list-card'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const WriteList = ({ trigger }: { trigger?: ReactNode }) => {
  const { selectedFilter } = useFilter()
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    WritingListResponse,
    Error,
    InfiniteData<WritingListResponse>,
    [string, string, string]
  >({
    initialPageParam: 0,
    getNextPageParam: (page) => {
      return page.data.totalPage - 1 <= page.data.page
        ? undefined
        : page.data.page + 1
    },
    queryKey: [
      'my-writing-list',
      selectedFilter?.type ?? 'period',
      selectedFilter?.value ?? 'ALL',
    ],
    queryFn: ({ pageParam = 0, queryKey }) =>
      NamuiApi.getMyWritingList(pageParam as number, [
        queryKey[1],
        queryKey[2],
      ]),
  })
  const [openAlert, setOpenAlert] = useState(false)
  const { ref } = useIntersectionObserver<HTMLDivElement>({
    hasNextPage,
    fetchNextPage,
  })

  return (
    <SideDrawer
      header={{
        center: <p className="text-body1-bold">작성목록</p>,
        options: {
          onBackClick() {
            setOpenAlert(false)
          },
          showRight: false,
        },
      }}
      open={openAlert}
      onChangeOpen={setOpenAlert}
      trigger={
        trigger ?? (
          <p className="py-[14px] text-body1-bold text-text-main-black11">
            작성 목록
          </p>
        )
      }
    >
      <Filter />
      <div className="px-5">
        <p className="mb-4 mt-1 flex items-center text-body3-medium text-text-sub-gray76">
          {typeof data?.pages[0].data.totalCount !== 'number' ? (
            <b className="skeleton text-brand-main-green400 mr-1 block h-4 w-10"></b>
          ) : (
            <b className="text-brand-main-green400">
              {data?.pages[0].data.totalCount}명
            </b>
          )}
          의 남의위키를 작성했어요
        </p>

        <motion.ul initial="hidden" animate="show" variants={container}>
          {!isLoading && data
            ? data.pages.map((page) =>
                page.data.content.map((item, index) => (
                  <WriteListCard key={index + item.surveyId} item={item} />
                )),
              )
            : Array.from({ length: 10 }).map((_, index) => (
                <motion.div
                  key={`card-skeleton-${index}`}
                  variants={variants}
                  className="flex justify-between space-x-4 py-5"
                >
                  <div className="skeleton flex aspect-square h-12  items-center justify-center rounded-full"></div>
                  <div className="flex grow flex-col space-y-4">
                    <div className="flex flex-col space-y-1">
                      <h3 className="skeleton h-4 w-1/5 text-body1-bold"></h3>
                      {/* <p className="text-body3-medium text-text-sub-gray76 skeleton h-4 w-1/2"></p> */}
                    </div>
                    {/* <div>{cardItem.answer}</div> 뱃지들어가야함 */}
                    <div className="flex">
                      <div className="flex h-4 grow gap-x-2">
                        <p className="skeleton h-4 w-1/4 text-body1-medium text-text-main-black11"></p>
                        <p className="skeleton h-4 w-1/4 text-body1-medium text-text-main-black11"></p>
                      </div>
                      <p className="skeleton h-4 w-2/5 text-body1-medium text-text-main-black11"></p>
                    </div>
                  </div>
                </motion.div>
              ))}
        </motion.ul>
        <div ref={ref} className="h-2 w-2" />
      </div>
    </SideDrawer>
  )
}

export default WriteList
const variants = {
  hidden: {
    opacity: 0,
    y: 10,
    transition: { ease: [0.78, 0.14, 0.15, 0.86] },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { ease: [0.78, 0.14, 0.15, 0.86] },
  },
}
