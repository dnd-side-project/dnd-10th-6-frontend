import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Controller, FormProvider, useFieldArray } from 'react-hook-form'
import { FunnelProvider } from '@/contexts/useFunnelContext'
import createFunnel from '@/components/funnel/createFunnel'
import ProgressBar from '@/components/progressbar'
import Button from '@/components/button'
import FormLayout from '@/layout/form-layout'
import {
  QueryClient,
  dehydrate,
  useMutation,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { getQuestionQuery, submitQuestionMutaion } from '@/queries/question'
import useQuestionForm, { QsSchemaType } from '@/hooks/use-questions-form'
import InputLabel from '@/components/inputLabel'

import { Inputbox } from '@/components/ui'
import { GetServerSideProps } from 'next'
import { serverURL } from '@/lib/server/utils'

import { cn } from '@/lib/client/utils'
import ComboboxDropdown from '@/components/combobox'
import { fadeInProps } from '@/variants'
import { useSession } from '@/provider/session-provider'
import { useRouter } from 'next/router'
import SurveyForm from '@/components/survey/survey-form'
import { toastError } from '@/lib/client/alert'
import Image from 'next/image'
import caution from '@/assets/icons/caution.svg'

const MotionLabel = motion(InputLabel)

const Question = ({ nickname }: { nickname: string }) => {
  const { data } = useSession()
  const { data: qs } = useSuspenseQuery(getQuestionQuery(nickname))
  const { mutate: submit, isPending } = useMutation(
    submitQuestionMutaion({
      onSuccess(data, variables, context) {
        goNext()

        // 애니메이션과 함께 제출화면으로 이동하기 위해 추가
        router.replace('/submit')
      },
      onError() {
        toastError()
      },
    }),
  )
  const fieldList = useMemo(
    () => ['senderName', 'knowing', ...qs.map((item) => item.id)],

    [qs],
  )

  const { Funnel, Step, useFunnel } = createFunnel(fieldList)

  const { step, toPrevStep, toNextStep, hasPrevStep } = useFunnel()
  const router = useRouter()

  const stepRef = useRef<HTMLParagraphElement>(null)

  const [progress, setProgress] = useState<{ current: number; max: number }>({
    current: 0,
    max: fieldList.length,
  })

  const questionForm = useQuestionForm({
    defaultValues: {
      owner: router.query.wikiId! as string,
      senderName: '',
      answers: qs.map((item) => ({
        id: '',
        answer: '',
        questionId: item.id,
        reason: '',
        type: 'OPTION',
      })),
    },
  })

  const { fields } = useFieldArray({
    name: 'answers',
    control: questionForm.control,
  })

  const { handleSubmit, setFocus, setError, trigger } = questionForm
  const onSubmit = async (data: QsSchemaType) => {
    data.answers.forEach((an) => {
      if (!an.reason) {
        delete an.reason
      }
    })
    submit(data)
  }

  const countAnimation = ({
    index,
  }: {
    direction: 'UP' | 'DOWN'
    index: number
  }) => {
    if (stepRef.current) {
      const startValue = txt[progress.current] ?? 0

      const DURATION = 1500
      const easeOutQuint = (x: number): number => {
        return 1 - Math.pow(1 - x, 5)
      }

      const target = txt[index]

      let animationId: number
      // 최초 시작 시간
      let start: number

      const animate = () => {
        if (!start) start = new Date().getTime()
        // 현재시간 - 최초시작시간
        const timestamp = new Date().getTime()
        const progress = timestamp - start
        if (progress >= DURATION) {
          if (stepRef.current) {
            stepRef.current.innerText = `${isNaN(target) ? 100 : target}%`
          }
          cancelAnimationFrame(animationId)
          if (target === 100) router.replace('/submit')
          return
        }

        const p = progress / DURATION
        const value = easeOutQuint(p)
        if (stepRef.current) {
          const dest = target - startValue
          stepRef.current.innerText = `${(isNaN(startValue) ? 0 : startValue ?? 0) + Math.round(dest * value) ?? 0}%`
        }
        if (p < DURATION) {
          animationId = requestAnimationFrame(animate)
        }
      }

      animationId = requestAnimationFrame(animate)
    }
  }

  const goPrev = async () => {
    toPrevStep()
    setProgress((prev) => ({ ...prev, current: prev.current - 1 }))
    countAnimation({ direction: 'DOWN', index: progress.current - 1 })
  }

  const goNext = () => {
    if (step === 'knowing') {
      const { period, relation } = questionForm.getValues()
      if (!period || !relation) {
        questionForm.setFocus('period')
        return
      }
    }

    toNextStep()
    setProgress((prev) => ({ ...prev, current: prev.current + 1 }))
    countAnimation({ direction: 'UP', index: progress.current + 1 })
  }

  const txt = useMemo(() => {
    const 상수들 = [0, 0, 0, 30]
    if (fieldList.length <= 상수들.length) return []
    let result: number[] = []
    for (let i = 0; i < 5; i++) {
      const 상수 = fieldList.length - 상수들.length
      const makeRandomeArr = Array(상수)
        .fill(0)
        .map((_) => Math.random() * 70 + 30)
        .sort((a, b) => a - b)
        .map((item, idx) =>
          Math.round(((result?.[idx + 상수들.length] ?? 0) + item) / 2),
        )

      result = [...상수들, ...makeRandomeArr, 100].sort((a, b) => a - b)
    }
    return result
  }, [fieldList])

  const isLastQs = useMemo(
    () => progress.current + 1 === progress.max,
    [progress.current],
  )

  useEffect(() => {
    if (data?.user?.name) {
      questionForm.setValue('senderName', data.user.name)
    }
  }, [data?.user?.name])

  const senderNameWatch = questionForm.watch().senderName
  const periodWatch = questionForm.watch().period
  const relationWatch = questionForm.watch().relation

  return (
    <FormLayout
      header={{
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
            hasPrevStep ? goPrev() : router.back()
          },
        },
      }}
      contentProps={{
        className: 'overflow-y-scroll',
      }}
      title={
        !['senderName', 'knowing'].includes(step) ? (
          <div className="flex items-center overflow-hidden text-brand-main-green400 ">
            <p className="flex justify-center items-center" ref={stepRef}>
              0%
            </p>
          </div>
        ) : (
          <div className="flex items-center text-body1-bold">정보 입력</div>
        )
      }
      button={
        ['senderName', 'knowing'].includes(step) ? (
          <Button
            disabled={
              step === 'senderName'
                ? senderNameWatch.length < 2 || senderNameWatch.length > 6
                : !periodWatch || !relationWatch
            }
            onClick={() => {
              if (step === 'senderName') {
                const value = questionForm.getValues().senderName
                if (value.length < 2 || value.length > 6) {
                  questionForm.setFocus('senderName')
                  return
                }
              } else {
                const value = questionForm.getValues()
                if (!value.period || !value.relation) {
                  questionForm.setFocus('period')
                  return
                }
              }
              goNext()
            }}
            className="w-full"
          >
            다음
          </Button>
        ) : (
          false
        )
      }
      content={
        <FunnelProvider
          value={{
            toPrevStep: goPrev,
            toNextStep: () => goNext(),
          }}
        >
          <AnimatePresence mode="wait">
            {!['senderName', 'knowing'].includes(step) && (
              <ProgressBar current={txt[progress.current]} />
            )}
          </AnimatePresence>

          <FormProvider {...questionForm}>
            <Funnel step={step}>
              <Step name="senderName" key="senderName">
                <motion.div
                  {...fadeInProps}
                  key="senderWrap"
                  className="text-left grow flex flex-col overflow-y-hidden"
                >
                  <Controller
                    control={questionForm.control}
                    name="senderName"
                    render={({ field }) => (
                      <>
                        <div className="space-y-2">
                          <InputLabel className="text-body1-bold" label="이름">
                            <Inputbox
                              {...field}
                              placeholder="이름을 입력해주세요"
                              minLength={2}
                              maxLength={6}
                            />
                          </InputLabel>
                          <p
                            className={cn(
                              'text-body3-medium duration-150 pl-2',
                              questionForm.formState.errors.senderName &&
                                '!text-inputbox-color-alert',
                              'text-sub-gray76 text-body3-medium',
                            )}
                            style={{ color: '#767676' }}
                          >
                            2~6자로 입력해주세요.
                          </p>
                        </div>
                        <div className="py-4 px-5 bg-gray-gray50 rounded-md flex space-x-3 mt-5">
                          <Image
                            src={caution}
                            alt="caution"
                            className="w-4 h-4 shrink-0 my-[2px]"
                          />
                          <p className="text-body3-medium text-text-sub-gray76">
                            누가 작성했는지 알 수 있도록, 나를 가장 잘 나타내는
                            이름으로 입력해주세요
                          </p>
                        </div>
                      </>
                    )}
                  />
                </motion.div>
              </Step>
              <Step name="knowing" key="knowing">
                <MotionLabel
                  {...fadeInProps}
                  transition={{
                    delay: 0.2,
                    duration: 0.3,
                  }}
                  className="text-body1-bold"
                  label="알게 된 기간"
                >
                  <Controller
                    control={questionForm.control}
                    name="period"
                    render={({ field }) => (
                      <ComboboxDropdown
                        placeholder="알게 된 기간을 선택해주세요"
                        options={[
                          {
                            label: '6개월미만',
                            value: 'six_months'.toUpperCase(),
                          },
                          {
                            label: '6개월 - 1년미만',
                            value: 'one_year'.toUpperCase(),
                          },
                          {
                            label: '1년 - 4년미만',
                            value: 'four_years'.toUpperCase(),
                          },
                          {
                            label: '4년이상',
                            value: 'infinite'.toUpperCase(),
                          },
                        ]}
                        {...field}
                        onChange={(option) => {
                          field.onChange(option.value)
                        }}
                      />
                    )}
                  />
                </MotionLabel>
                <div className="mt-4">
                  <MotionLabel
                    {...fadeInProps}
                    transition={{
                      delay: 0.2,
                      duration: 0.3,
                    }}
                    className="text-body1-bold"
                    label="알게 된 경로"
                  >
                    <Controller
                      control={questionForm.control}
                      name="relation"
                      render={({ field }) => (
                        <ComboboxDropdown
                          placeholder="알게 된 경로를 선택해주세요"
                          options={[
                            {
                              label: '초등학교',
                              value: 'elementary_school'.toUpperCase(),
                            },
                            {
                              label: '중·고등학교',
                              value: 'middle_and_high_school'.toUpperCase(),
                            },
                            {
                              label: '대학교',
                              value: 'university'.toUpperCase(),
                            },
                            { label: '직장', value: 'work'.toUpperCase() },
                            {
                              label: '친목모임',
                              value: 'social'.toUpperCase(),
                            },
                            { label: '기타', value: 'etc'.toUpperCase() },
                          ]}
                          {...field}
                          onChange={(option) => {
                            field.onChange(option.value)
                          }}
                        />
                      )}
                    />
                  </MotionLabel>
                </div>
              </Step>
              {fields.map((field, idx) => {
                const { title, options, type, name, id } = qs[idx]

                return (
                  <Step name={field.questionId} key={step}>
                    <SurveyForm
                      disabled={isPending}
                      index={progress.current}
                      isLast={isLastQs}
                      initialValue={questionForm.getValues().answers[idx]}
                      onConfirm={(values) => {
                        questionForm.setValue(`answers.${idx}`, {
                          ...values,
                          questionId: id,
                        })
                        isLastQs ? handleSubmit(onSubmit)() : goNext()
                      }}
                      options={options}
                      title={title}
                      type={type}
                      name={name}
                    />
                  </Step>
                )
              })}
            </Funnel>
          </FormProvider>
        </FunnelProvider>
      }
    />
  )
}

export default Question
Question.getLayout = (page: ReactNode) => page

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { wikiId } = ctx.query
  if (!wikiId || typeof wikiId === 'object') return { notFound: true }
  serverURL.pathname = '/api/v1/users'
  serverURL.searchParams.append('wikiId', wikiId)
  const queryClient = new QueryClient()

  try {
    const response = await fetch(serverURL).then(
      (res) =>
        res.json() as Promise<{
          data?: { nickname: string }
          errorCode?: string
          reason?: string
        }>,
    )
    serverURL.searchParams.delete('wikiId')
    if (!response.data?.nickname) return { notFound: true }
    const {
      data: { nickname },
    } = response
    await queryClient.prefetchQuery(getQuestionQuery(nickname))

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        nickname,
      },
    }
  } catch (e) {
    return {
      props: {},
    }
  } finally {
    queryClient.clear()
  }
}
