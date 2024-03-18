import { ReactNode, useContext, useMemo, useRef } from 'react'
import withAuth from '@/layout/HOC/with-auth'
import FormLayout from '@/layout/form-layout'
import AnswerDetail from '@/components/compositions/answers/answer-detail'
import { useRouter } from 'next/router'
import { useSession } from '@/provider/session-provider'
import { AnimatePresence, motion } from 'framer-motion'
import RelationBadge from '@/components/badge/relation'
import PeriodBadge from '@/components/badge/period'
import { useQuery } from '@tanstack/react-query'
import { Survey, getSurveyByIdQuery } from '@/queries/surveys'
import { GetServerSideProps } from 'next'
import { fadeInProps } from '@/variants'
import { TreeType, treeCardAsset } from '@/model/tree.entity'
import {
  ShareImageContext,
  ShareImageDrawer,
  ShareImageProvider,
} from '@/components/share-image'
import { parseShareCardItems } from '@/components/share-image/constants'
const Pages = ({ surveyId }: { surveyId: string }) => {
  const { data } = useSession()
  const { data: { data: survey } = {}, isLoading } = useQuery(
    getSurveyByIdQuery(surveyId),
  )
  const router = useRouter()

  const createdAt = useMemo(() => {
    if (!survey) return
    const parsedCreatedAt = new Date(survey.createdAt)
    return `${parsedCreatedAt.getFullYear()}.${parsedCreatedAt.getMonth() + 1}.${parsedCreatedAt.getDate()}`
  }, [survey])

  const treeType = useRef(new TreeType(treeCardAsset)).current

  const bgColor = (survey: Survey) => {
    switch (survey.relation) {
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
              className="w-5 h-5"
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
                className="w-full flex text flex-col space-y-2"
              >
                <section>
                  <div className="py-5 flex justify-between space-x-4">
                    <div
                      className={`aspect-square w-[58px] h-[58px] rounded-full flex justify-center items-center ${bgColor(
                        survey,
                      )}`}
                    >
                      {treeType.render(survey.period, survey.relation)}
                    </div>
                    <div className="flex flex-col grow space-y-2">
                      <h2 className="text-subTitle1-bold">
                        {survey.senderName}님
                      </h2>
                      <div className="flex space-x-1.5">
                        <PeriodBadge period={survey.period} />

                        <RelationBadge relation={survey.relation} />
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
                  <div className="py-5 flex justify-between space-x-4">
                    <div className="aspect-square rounded-full flex justify-center items-center skeleton h-14"></div>
                    <div className="flex flex-col grow space-y-2">
                      <div className="h-7 skeleton w-1/2" />
                      <div className="flex space-x-2">
                        <div className="h-6 skeleton w-3/5" />
                        <div className="h-6 skeleton w-1/3" />
                      </div>
                    </div>
                    <div className="self-end skeleton h-6 w-1/4" />
                  </div>
                </section>
                <section className="w-full grid grid-cols-1 divide-y justify-start divide-line-soft">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <motion.div
                      key={`card-skeleton-${index}`}
                      variants={fadeInProps.variants}
                      className="py-8 flex flex-col justify-between space-y-4"
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
    <div className="w-full space-y-4  grid grid-cols-1 divide-y justify-start">
      {survey.questionAndAnswers.map((item, index) => (
        <AnswerDetail
          questionName={item.questionName}
          onShareClick={
            Object.hasOwn(parseShareCardItems, item.questionName)
              ? () => {
                  showShareImage({
                    period: survey.period,
                    questionName: item.questionName as any,
                    reason: item.reason as any,
                    relation: survey.relation,
                    senderName: survey.senderName,
                    value: item.value,
                  })
                }
              : undefined
          }
          index={index}
          key={index}
          questionTitle={item.questionTitle
            .replace('{{userName}}', data?.user?.name ?? '')
            .replace('<br/>', ' ')}
          answer={item.reason ? item.text : item.reason}
          value={item.value}
          reason={item.reason ?? item.text}
        />
      ))}
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
