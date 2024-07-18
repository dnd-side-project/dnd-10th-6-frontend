import { Button } from '@/components/ui'
import TreeCard from '@/components/compositions/tree-card'
import Confetti from '@/components/confetti'
import BaseLayout from '@/layout/base-layout'
import { GetSurveyResponse } from '@/model/survey.entity'
import { InfiniteData } from '@tanstack/react-query'
import React from 'react'

const surveys: InfiniteData<GetSurveyResponse, unknown> = {
  pageParams: [],
  pages: [
    {
      data: {
        size: 6,
        totalCount: 6,
        totalPage: 1,
        page: 0,
        content: [
          {
            period: 'SIX_MONTHS',
            relation: 'MIDDLE_AND_HIGH_SCHOOL',
            senderName: '디엔이',
            surveyId: '',
            senderWikiId: '',
          },
          {
            period: 'ONE_YEAR',
            relation: 'WORK',
            senderName: '디엔이',
            surveyId: '',
            senderWikiId: '',
          },
          {
            period: 'FOUR_YEARS',
            relation: 'ETC',
            senderName: '디엔이',
            surveyId: '',
            senderWikiId: '',
          },
          {
            period: 'INFINITE',
            relation: 'ELEMENTARY_SCHOOL',
            senderName: '디엔이',
            surveyId: '',
            senderWikiId: '',
          },
          {
            period: 'SIX_MONTHS',
            relation: 'SOCIAL',
            senderName: '디엔이',
            surveyId: '',
            senderWikiId: '',
          },
          {
            period: 'ONE_YEAR',
            relation: 'WORK',
            senderName: '디엔이',
            surveyId: '',
            senderWikiId: '',
          },
        ],
      },
    },
  ] satisfies GetSurveyResponse[],
}

const OnboardStep2 = () => {
  return (
    <div
      key="step2"
      className="flex h-full flex-col items-center justify-center gap-5 space-y-[2vb] px-4 text-center"
    >
      <h2 className="text-[2.3vb]">
        친구와 <b>알게 된 기간, 경로</b>에 따라
        <br />
        <b>나무 카드의 모양과 색</b>이 달라져요
      </h2>
      <section className="flex aspect-[1/2.1653] w-[25vb] flex-col overflow-hidden rounded-[3vb] p-[0.75vb] shadow-onboard">
        <div className="relative flex grow flex-col overflow-y-scroll pb-[0.5vb] scrollbar-hide">
          <header className="bg-gray-gray50 flex h-[4vb] w-full items-center justify-between rounded-t-[2.2vb] p-[1vb]">
            <svg
              className="h-[1.195vb] w-[2.4vb]"
              width="15"
              height="6"
              viewBox="0 0 15 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.44996 5V1.49316H1.43238L0.339609 2.24316V1.54883L1.4441 0.772461H2.19117V5H1.44996ZM4.62 0.699219C5.55164 0.699219 6.32801 1.35254 6.32801 2.83496V2.84082C6.32801 4.23828 5.68055 5.07324 4.60242 5.07324C3.8202 5.07324 3.23426 4.62207 3.10242 3.9834L3.09656 3.95117H3.84656L3.85535 3.97754C3.96961 4.26758 4.22742 4.45508 4.60535 4.45508C5.28504 4.45508 5.56922 3.80469 5.59852 3.00488C5.60145 2.96094 5.60437 2.91699 5.60437 2.87012H5.5868C5.4198 3.25684 4.99793 3.5498 4.42664 3.5498C3.61219 3.5498 3.03797 2.96387 3.03797 2.16992V2.16406C3.03797 1.31152 3.70887 0.699219 4.62 0.699219ZM4.62 2.9668C5.1034 2.9668 5.47254 2.62695 5.47254 2.15527V2.15234C5.47254 1.68359 5.1034 1.31738 4.62879 1.31738C4.16004 1.31738 3.78211 1.68066 3.78211 2.1377V2.14355C3.78211 2.62402 4.13953 2.9668 4.62 2.9668ZM7.15137 2.23438C6.91406 2.23438 6.72656 2.04688 6.72656 1.80957C6.72656 1.57227 6.91406 1.3877 7.15137 1.3877C7.38867 1.3877 7.57324 1.57227 7.57324 1.80957C7.57324 2.04688 7.38867 2.23438 7.15137 2.23438ZM7.15137 4.38477C6.91406 4.38477 6.72656 4.19727 6.72656 3.95996C6.72656 3.72266 6.91406 3.53809 7.15137 3.53809C7.38867 3.53809 7.57324 3.72266 7.57324 3.95996C7.57324 4.19727 7.38867 4.38477 7.15137 4.38477ZM9.63879 5.07324C8.60168 5.07324 7.97766 4.23242 7.97766 2.8877V2.88184C7.97766 1.53711 8.60168 0.699219 9.63879 0.699219C10.673 0.699219 11.2999 1.53711 11.2999 2.88184V2.8877C11.2999 4.23242 10.673 5.07324 9.63879 5.07324ZM9.63879 4.45508C10.2071 4.45508 10.5382 3.86328 10.5382 2.8877V2.88184C10.5382 1.90625 10.2071 1.32031 9.63879 1.32031C9.0675 1.32031 8.73937 1.90625 8.73937 2.88184V2.8877C8.73937 3.86328 9.0675 4.45508 9.63879 4.45508ZM11.7043 5V4.48438L13.1985 3.02832C13.7522 2.48633 13.8723 2.27246 13.8723 1.95898V1.95312C13.8694 1.5752 13.5852 1.30566 13.178 1.30566C12.7092 1.30566 12.3811 1.61914 12.3723 2.02637V2.04688H11.6633V2.02637C11.6633 1.25293 12.3137 0.699219 13.1721 0.699219C14.0188 0.699219 14.6106 1.21191 14.6106 1.90918V1.91504C14.6106 2.41309 14.3791 2.75 13.635 3.46484L12.7034 4.34961V4.38184H14.675V5H11.7043Z"
                fill="black"
              />
            </svg>
            <svg
              className="h-[1.195vb] w-[5vb]"
              width="34"
              height="6"
              viewBox="0 0 34 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.231 1.24608C16.4364 1.24613 17.5956 1.71201 18.4692 2.54742C18.535 2.61192 18.6402 2.61111 18.7049 2.5456L19.3338 1.90724C19.3666 1.87401 19.3849 1.82901 19.3846 1.78218C19.3843 1.73535 19.3655 1.69057 19.3323 1.65773C17.0394 -0.552577 13.4222 -0.552577 11.1293 1.65773C11.0961 1.69054 11.0772 1.73532 11.0769 1.78214C11.0766 1.82897 11.0949 1.87399 11.1276 1.90724L11.7567 2.5456C11.8214 2.61121 11.9266 2.61202 11.9924 2.54742C12.8661 1.71196 14.0255 1.24608 15.231 1.24608ZM15.231 3.32294C15.8933 3.3229 16.5319 3.57051 17.0228 4.01766C17.0892 4.08112 17.1938 4.07975 17.2585 4.01456L17.8866 3.3762C17.9197 3.34272 17.9381 3.29729 17.9376 3.25009C17.9371 3.20289 17.9178 3.15785 17.8841 3.12505C16.3892 1.72628 14.0741 1.72628 12.5791 3.12505C12.5454 3.15785 12.5261 3.20291 12.5257 3.25013C12.5252 3.29735 12.5436 3.34276 12.5768 3.3762L13.2047 4.01456C13.2694 4.07975 13.374 4.08112 13.4404 4.01766C13.931 3.57081 14.5691 3.32322 15.231 3.32294ZM16.438 4.84644C16.4716 4.81328 16.4901 4.76764 16.4892 4.72031C16.4882 4.67297 16.4679 4.62814 16.433 4.59638C15.7391 4.00605 14.7229 4.00605 14.029 4.59638C13.9941 4.62811 13.9737 4.67294 13.9727 4.72027C13.9717 4.7676 13.9902 4.81325 14.0237 4.84644L15.1104 5.94935C15.1422 5.98176 15.1857 6 15.231 6C15.2763 6 15.3197 5.98176 15.3516 5.94935L16.438 4.84644Z"
                fill="black"
              />
              <path
                d="M22.5801 1.47929C22.5801 1.15249 22.845 0.887573 23.1718 0.887573H31.3079C31.6347 0.887573 31.8996 1.15249 31.8996 1.47929V4.28994C31.8996 4.61674 31.6347 4.88166 31.3079 4.88166H23.1718C22.845 4.88166 22.5801 4.61674 22.5801 4.28994V1.47929Z"
                fill="black"
              />
              <path
                opacity="0.4"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M23.1717 0.443787H31.3078C31.8797 0.443787 32.3433 0.907398 32.3433 1.47929V4.28994C32.3433 4.86183 31.8797 5.32544 31.3078 5.32544H23.1717C22.5998 5.32544 22.1362 4.86183 22.1362 4.28994V1.47929C22.1362 0.907398 22.5998 0.443787 23.1717 0.443787ZM21.6924 1.47929C21.6924 0.662301 22.3547 0 23.1717 0H31.3078C32.1248 0 32.7871 0.662301 32.7871 1.47929V4.28994C32.7871 5.10693 32.1248 5.76923 31.3078 5.76923H23.1717C22.3547 5.76923 21.6924 5.10693 21.6924 4.28994V1.47929ZM33.9705 2.88461C33.9705 3.33929 33.6549 3.72025 33.2308 3.82042V1.94881C33.6549 2.04898 33.9705 2.42994 33.9705 2.88461Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.61532 0.461548C7.19473 0.461548 6.85378 0.802501 6.85378 1.22309V4.77693C6.85378 5.19752 7.19473 5.53847 7.61532 5.53847C8.0359 5.53847 8.37685 5.19752 8.37685 4.77693V1.22309C8.37685 0.8025 8.0359 0.461548 7.61532 0.461548ZM4.5693 2.23845C4.5693 1.81786 4.91025 1.47691 5.33084 1.47691C5.75142 1.47691 6.09238 1.81786 6.09238 2.23845V4.77691C6.09238 5.1975 5.75142 5.53845 5.33084 5.53845C4.91025 5.53845 4.5693 5.1975 4.5693 4.77691V2.23845ZM3.04613 2.49233C2.62555 2.49233 2.28459 2.83328 2.28459 3.25387V4.77694C2.28459 5.19753 2.62555 5.53848 3.04613 5.53848C3.46672 5.53848 3.80767 5.19753 3.80767 4.77694V3.25387C3.80767 2.83328 3.46672 2.49233 3.04613 2.49233ZM0.507692 5.53847C0.227302 5.53847 0 5.31117 0 5.03078V3.76155C0 3.48116 0.227302 3.25386 0.507692 3.25386H1.01538C1.29578 3.25386 1.52308 3.48116 1.52308 3.76155V5.03078C1.52308 5.31117 1.29578 5.53847 1.01538 5.53847H0.507692Z"
                fill="black"
              />
            </svg>
          </header>
          <BaseLayout
            className="bg-gray-gray50"
            header={{
              className: 'bg-gray-gray50 h-[3vb]',
              leftIcon: null,
              rightIcon: false,
              center: (
                <p className="text-[1.195vb] font-bold text-text-main-black11">
                  내 정원
                </p>
              ),
            }}
          >
            <div className="flex items-center justify-between space-x-6 px-[1.2vb] py-[1.6vb]">
              <div className="flex flex-1 flex-col space-y-[0.1vb] text-start">
                <p className="text-[0.9vb] text-text-sub-gray4f">
                  내 정원에 심어진 나무는
                </p>
                <h3 className="text-[1.8vb] font-bold text-black">총 6그루</h3>
              </div>

              <Button className="!h-fit !w-fit rounded-[0.4vb] px-[1vb] py-[0.7vb] text-[0.9vb]">
                <span className="text-[1.4vb] leading-normal ">
                  내 결과 보기
                </span>
              </Button>
            </div>
            <section className="bg-white">
              <div className=" w-full px-[0.6vb] py-[1.2vb]">
                <p className="text-left text-[1.2vb] font-bold text-text-sub-gray4f">
                  받은 친구
                </p>
              </div>
              <div className="flex w-full flex-col items-center justify-center space-y-2 pb-10">
                <div className="grid w-full grid-cols-3 gap-2 ">
                  {surveys?.pages.map((page, pageNo) =>
                    pageNo === 0 && page.data.content.length < 20 ? (
                      [
                        ...page.data.content,
                        ...Array.from(
                          { length: 20 - page.data.content.length },
                          (_) => null,
                        ),
                      ].map((item, index) =>
                        item ? (
                          <TreeCard
                            senderName={item.senderName}
                            senderWikiId=""
                            key={`${item.surveyId}-${(pageNo + 1) * (index + 1)}`}
                            id={item.surveyId}
                            period={item.period}
                            relation={item.relation}
                            isFlipped={false}
                            onClick={() => {}}
                          />
                        ) : (
                          <div key={`empty-${(pageNo + 1) * (index + 1)}`}>
                            <div className="bg-gray-gray50 flex aspect-[80/90] w-full items-center justify-center rounded border border-dashed ">
                              <svg
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
                                <circle
                                  cx="17"
                                  cy="17"
                                  r="16.5"
                                  stroke="#D9D9D9"
                                />
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
                            </div>
                          </div>
                        ),
                      )
                    ) : (
                      <div
                        key={`empty-${pageNo + 1}-container`}
                        className="grid w-full grid-cols-3 gap-2 "
                      >
                        {page.data.content.map((item, index) => (
                          <TreeCard
                            senderWikiId=""
                            senderName={item.senderName}
                            key={`${item.surveyId}-${(pageNo + 1) * (index + 1)}`}
                            id={item.surveyId}
                            period={item.period}
                            relation={item.relation}
                            isFlipped={index === 0}
                            onClick={() => {}}
                          />
                        ))}
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="sticky bottom-0 bg-gradient-to-t from-white from-85% to-transparent to-100%">
                <Confetti className="pointer-events-none fixed left-full top-0 h-full w-full">
                  <Button className="h-fit self-end rounded-sm py-[0.8vb] text-xs">
                    <span className="text-[1.4vb] leading-normal ">
                      친구에게 내 소개 부탁하기
                    </span>
                  </Button>
                </Confetti>
              </div>
            </section>
          </BaseLayout>
        </div>
        <footer className="flex h-[2vb] w-full items-end justify-center">
          <div className="h-[0.3vb] w-1/3 rounded-full bg-black" />
        </footer>
      </section>
    </div>
  )
}

export default OnboardStep2
