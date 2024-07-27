import { Button } from '@/components/ui'
import { FilterType } from '@/hooks/use-filter'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { GetSurveyResponse } from '@/model/survey.entity'
import { NamuiApi } from '@/lib/namui-api'
import { AnimatePresence } from 'framer-motion'
import TreeCard from '../tree-card'
import { fadeInProps } from '@/variants'
import { cn } from '@/lib/client/utils'
import { PropswithWikiType } from '@/types'

const TreeInfo = ({
  wikiType,
  wikiCount,
}: PropswithWikiType<{ filter: FilterType; wikiCount: number }>) => {
  const { data: surveys, isLoading } = useQuery<GetSurveyResponse>({
    queryKey: ['survey'],
    queryFn: ({ pageParam = 0 }) => {
      return NamuiApi.getSurveys(pageParam as number, wikiType)
    },
  })

  return (
    <div className="mb-[100px] flex flex-col space-y-8">
      <div className="mx-auto mb-8 flex flex-col space-y-4 text-center">
        <h3 className="text-t3-kr-m">내 정원에 심어진 나무</h3>
        <b className="text-d4-kr-b">{wikiCount}그루</b>
      </div>

      <div className="[mask-image:linear-gradient(to_bottom,white_0%,transparent_100%)]">
        <AnimatePresence mode="wait">
          {!isLoading && surveys ? (
            <motion.div
              {...fadeInProps}
              transition={{ staggerChildren: 0.03 }}
              className="grid w-full grid-cols-3 gap-3"
            >
              {surveys.data.content.map((item) => (
                <TreeCard
                  disabled
                  senderName={item.senderName}
                  senderWikiId={item.senderWikiId}
                  key={`${item.surveyId}`}
                  id={item.surveyId}
                  period={item.period}
                  relation={item.relation}
                />
              ))}
              {Array.from(
                { length: 6 - surveys.data.content.length },
                () => null,
              ).map((_, index) => (
                <motion.div
                  variants={fadeInProps.variants}
                  key={`empty-${(index + 1) * (index + 1)}`}
                  className=" flex aspect-[104/110] h-full items-center justify-center rounded-md border border-dashed bg-bg-light p-[25%]"
                >
                  <svg
                    className="h-full w-full"
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.36523 17.5469C8.55024 19.222 9.87772 22.8973 13.7077 24.1978C17.5376 25.4983 20.8343 24.6076 22.0039 23.9997"
                      stroke="#D9D9D9"
                      strokeLinecap="round"
                    />
                    <circle cx="17" cy="17" r="16.5" stroke="#D9D9D9" />
                    <circle
                      cx="14.8053"
                      cy="12.6139"
                      r="1.64516"
                      fill="#D9D9D9"
                    />
                    <circle
                      cx="21.3893"
                      cy="14.8053"
                      r="1.64516"
                      fill="#D9D9D9"
                    />
                  </svg>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`empty-container`}
              {...fadeInProps}
              className="grid grid-cols-3 gap-3"
            >
              {Array.from({ length: 6 }, (_, v) => v + 1).map((i) => (
                <motion.div
                  variants={fadeInProps.variants}
                  key={`loading-${i}`}
                  className={cn(
                    'skeleton relative aspect-[104/110] h-full cursor-pointer',
                  )}
                >
                  <div className="flex h-[110px] w-[104px] items-center justify-center rounded"></div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col items-center space-y-12">
        <ul className="list-inside list-disc px-5 py-4 text-b2-kr-m tracking-tight text-font-gray-05">
          <li>내 소개서를 작성하면 내 정원에 나무가 심겨요.</li>
          <li>내 정원의 나무를 더 보고 싶다면 버튼을 눌러보세요.</li>
        </ul>
        <Button
          variant="Line-neutral"
          rounded="full"
          className="mx-auto w-fit px-8"
        >
          내 정원 더보기
        </Button>
      </div>
    </div>
  )
}

export default TreeInfo

{
  /* <div className="">
        <div className="flex items-center justify-between"></div>
        <ShareModal wikiType={wikiType}>
          <Button>링크 공유하기</Button>
        </ShareModal>
      </div> */
}

{
  /* !DELETE
      {short?.length ? (
        <>
          <div className="avoid-min-w relative -left-[1.5rem] flex w-[calc(100%_+_3rem)] space-x-2 overflow-x-scroll px-6 pl-6 scrollbar-hide">
            {short.slice(0, short.length / 2).map((item) => (
              <Badge
                key={item.id}
                onClick={() => {
                  handle(item.id, 'SHORT_ANSWER')
                }}
                title={SHORT_FILTER[item.name]}
              />
            ))}
          </div>
          <div className="relative -left-[1.5rem] mt-3 flex w-[calc(100%_+_3rem)] space-x-2 overflow-y-hidden overflow-x-scroll px-6 scrollbar-hide">
            {short.slice(short.length / 2, short.length).map((item) => (
              <Badge
                key={item.id}
                onClick={() => handle(item.id, 'SHORT_ANSWER')}
                title={SHORT_FILTER[item.name]}
              />
            ))}
          </div>
        </>
      ) : null} */
}
