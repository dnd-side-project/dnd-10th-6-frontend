import { ReactNode, useContext, useMemo, useRef } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import withAuth from '@/layout/HOC/with-auth'
import FormLayout from '@/layout/form-layout'
import { useSession } from '@/provider/session-provider'

import { Survey, getSurveyByIdQuery } from '@/queries/surveys'
import { fadeInProps } from '@/variants'
import { CardType } from '@/model/card.entity'
import AnswerDetail from '@/components/compositions/answers/answer-detail'
import { RelationBadge, PeriodBadge } from '@/components/badge'
import {
  QS_NAMES,
  ShareImageContext,
  ShareImageDrawer,
  ShareImageProvider,
} from '@/components/share-image'
import { parseShareCardItems } from '@/components/share-image/constants'
import { useWikiContext } from '@/contexts/wiki-provider'

const Pages = ({ surveyId }: { surveyId: string }) => {
  const { data: { data: survey } = {}, isLoading } = useQuery(
    getSurveyByIdQuery(surveyId),
  )
  const router = useRouter()
  const { wikiType } = useWikiContext()
  const createdAt = useMemo(() => {
    if (!survey) return
    const parsedCreatedAt = new Date(survey.createdAt)
    return `${parsedCreatedAt.getFullYear()}.${parsedCreatedAt.getMonth() + 1}.${parsedCreatedAt.getDate()}`
  }, [survey])

  const treeType = useRef(new CardType(wikiType)).current

  return (
    <ShareImageProvider>
      <FormLayout
        header={{
          rightIcon: <></>,
          center: (
            <p className="text-body1-bold text-text-main-black11">상세보기</p>
          ),
          leftIcon: (
            <svg
              className="h-5 w-5"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.6187 23.6187C18.277 23.9604 17.723 23.9604 17.3813 23.6187L8.38128 14.6187C8.21719 14.4546 8.125 14.2321 8.125 14C8.125 13.7679 8.21719 13.5454 8.38128 13.3813L17.3813 4.38128C17.723 4.03957 18.277 4.03957 18.6187 4.38128C18.9604 4.72299 18.9604 5.27701 18.6187 5.61872L10.2374 14L18.6187 22.3813C18.9604 22.723 18.9604 23.277 18.6187 23.6187Z"
                fill="#111111"
              />
            </svg>
          ),
          options: {
            onBackClick() {
              router.back()
            },
          },
        }}
        content={
          <AnimatePresence mode="wait">
            {!isLoading && survey ? (
              <motion.div
                key={surveyId + 'detail'}
                {...fadeInProps}
                className="text flex w-full flex-col space-y-2"
              >
                <section>
                  <div className="flex justify-between space-x-4 py-5">
                    <div
                      className={`flex aspect-square h-[58px] w-[58px] items-center justify-center rounded-full ${CardType.getBgColorClassName(wikiType, survey.relation)}`}
                    >
                      {treeType.render(survey.period, survey.relation)}
                    </div>
                    <div className="flex grow flex-col space-y-2">
                      <h2 className="text-subTitle1-bold">
                        {survey.senderName}님
                      </h2>
                      <div className="flex space-x-1.5">
                        <PeriodBadge period={survey.period} />

                        <RelationBadge
                          wikiType={wikiType}
                          relation={survey.relation}
                        />
                      </div>
                    </div>
                    <div className="self-end  text-body3-medium text-text-sub-gray76">
                      {createdAt}
                    </div>
                  </div>
                </section>
                <section>
                  <SurveyAnswers survey={survey} />
                </section>
              </motion.div>
            ) : (
              <motion.div
                key={surveyId + 'detail-loading'}
                {...fadeInProps}
                className="flex flex-col space-y-4"
              >
                <section>
                  <div className="flex justify-between space-x-4 py-5">
                    <div className="skeleton flex aspect-square h-14 items-center justify-center rounded-full"></div>
                    <div className="flex grow flex-col space-y-2">
                      <div className="skeleton h-7 w-1/2" />
                      <div className="flex space-x-2">
                        <div className="skeleton h-6 w-3/5" />
                        <div className="skeleton h-6 w-1/3" />
                      </div>
                    </div>
                    <div className="skeleton h-6 w-1/4 self-end" />
                  </div>
                </section>
                <section className="grid w-full grid-cols-1 justify-start divide-y divide-line-soft">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <motion.div
                      key={`card-skeleton-${index}`}
                      variants={fadeInProps.variants}
                      className="flex flex-col justify-between space-y-4 py-8"
                    >
                      <h3 className="skeleton h-6 w-3/4"></h3>
                      <h3 className="skeleton h-6 w-1/5"></h3>
                      <h3 className="skeleton h-14 w-full"></h3>
                    </motion.div>
                  ))}
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        }
      />
      <ShareImageDrawer />
    </ShareImageProvider>
  )
}

function SurveyAnswers({ survey }: { survey: Survey }) {
  const { showShareImage } = useContext(ShareImageContext)
  const { data } = useSession()
  return (
    <div className="grid w-full grid-cols-1 justify-start space-y-4 divide-y">
      {survey.questionAndAnswers.map((item, index) => {
        const answer = Array.isArray(item.answer) ? item.answer[0] : item.answer

        return (
          <AnswerDetail
            questionName={item.questionName}
            onShareClick={
              Object.hasOwn(parseShareCardItems, item.questionName)
                ? () => {
                    showShareImage({
                      period: survey.period,
                      optionName: answer.optionName,
                      questionName: item.questionName as QS_NAMES,
                      reason: item.reason as QS_NAMES,
                      relation: survey.relation,
                      senderName: survey.senderName,
                      value:
                        typeof answer.value === 'number'
                          ? answer.value.toLocaleString()
                          : answer.value,
                    })
                  }
                : undefined
            }
            index={index}
            key={index}
            questionTitle={item.questionTitle
              .replace('{{userName}}', data?.user?.name ?? '')
              .replace('<br/>', ' ')}
            //
            answer={item.reason ? answer.text : item.reason}
            value={answer.value as string | boolean}
            reason={item.reason ?? answer.text}
          />
        )
      })}
    </div>
  )
}

const Answers = withAuth<{ surveyId: string }>(Pages)
Answers.getLayout = (page: ReactNode) => page

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.query.surveyId) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      surveyId: ctx.query.surveyId,
    },
  }
}

export default Answers
