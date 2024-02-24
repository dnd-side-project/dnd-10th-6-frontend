import PeriodBadge from '@/components/badge/period'
import RelationBadge from '@/components/badge/relation'
import withAuth from '@/layout/HOC/with-auth'
import FormLayout from '@/layout/form-layout'
import { useSession } from '@/provider/session-provider'
import e from 'cors'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

const Pages = () => {
  const { data } = useSession()
  const router = useRouter()
  const mock = [
    {
      data: {
        questionTitle:
          '{{userName}}님은<br/><b>사람들과 빨리 친해지는 편</b>인가요?',
        pageable: {
          content: [
            {
              senderName: null,
              period: 'INFINITE',
              relation: 'ELEMENTARY_SCHOOL',
              answer: '65d84728cfc30b23f358ca5a',
              reason: 'adsf',
            },
            {
              senderName: null,
              period: 'INFINITE',
              relation: 'ELEMENTARY_SCHOOL',
              answer: '65d84728cfc30b23f358ca5a',
              reason: 'adsf',
            },
          ],
          page: 0,
          size: 20,
          totalPage: 1,
          totalCount: 2,
        },
      },
    },
  ]

  return (
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
        <div className="w-full flex text flex-col space-y-2">
          <section>
            <div className="py-5 flex justify-between space-x-4">
              <div className="flex flex-col grow space-y-2">
                <div className="w-fit border rounded border-border-gray text-body3-medium">질문</div>
                <h2 className="text-subTitle1-bold">
                  {mock[0].data.questionTitle}
                </h2>
                <div className="flex space-x-1.5"></div>
              </div>
              <div className="self-end  text-body3-medium text-text-sub-gray76"></div>
            </div>
          </section>
        </div>
      }
    />
  )
}

const AnswersQuestions = withAuth(Pages)
AnswersQuestions.getLayout = (page: ReactNode) => page

export default AnswersQuestions
