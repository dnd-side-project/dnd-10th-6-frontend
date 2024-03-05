import Drawer from '@/components/ui/drawer'
import React, { useState } from 'react'
import WriteListCard from '@/components/compositions/header/write-list/wirte-list-card'
import useFilter, { Filter } from '@/hooks/use-filter'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/use-observer'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { WritingListResponse } from '@/queries/surveys'
import { NamuiApi } from '@/lib/namui-api'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const WriteList = () => {
  const { selectedFilter } = useFilter()
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    WritingListResponse,
    Error,
    InfiniteData<WritingListResponse>,
    [string, string, string]
  >({
    initialPageParam: 0,
    getNextPageParam: (page) => {
      return page.data.totalPage <= page.data.page
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
    <Drawer
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
        <p className="py-[14px] text-body1-bold text-text-main-black11">
          작성 목록
        </p>
      }
    >
      <Filter />
      <div className="px-5">
        <p className="text-body3-medium text-text-sub-gray76 mt-1 mb-4 flex items-center">
          {typeof data?.pages[0].data.totalCount !== 'number' ? (
            <b className="text-brand-main-green400 skeleton w-10 h-4 block mr-1"></b>
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
                  className="flex py-5 justify-between space-x-4"
                >
                  <div className="aspect-square rounded-full skeleton h-12  flex justify-center items-center"></div>
                  <div className="flex flex-col grow space-y-4">
                    <div className="flex flex-col space-y-1">
                      <h3 className="text-body1-bold skeleton h-4 w-1/5"></h3>
                      {/* <p className="text-body3-medium text-text-sub-gray76 skeleton h-4 w-1/2"></p> */}
                    </div>
                    {/* <div>{cardItem.answer}</div> 뱃지들어가야함 */}
                    <div className="flex">
                      <div className="flex h-4 grow gap-x-2">
                        <p className="text-body1-medium text-text-main-black11 skeleton w-1/4 h-4"></p>
                        <p className="text-body1-medium text-text-main-black11 skeleton w-1/4 h-4"></p>
                      </div>
                      <p className="text-body1-medium text-text-main-black11 skeleton w-2/5 h-4"></p>
                    </div>
                  </div>
                </motion.div>
              ))}
        </motion.ul>
        <div ref={ref} className="h-2 w-2" />
      </div>
    </Drawer>
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
