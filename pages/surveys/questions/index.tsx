import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { Variants, motion, useAnimate } from 'framer-motion'
import { Controller, FormProvider, useFieldArray } from 'react-hook-form'

import { FunnelProvider } from '@/contexts/useFunnelContext'
import createFunnel from '@/components/funnel/createFunnel'

import { QUESTION_MAX } from '@/constants'
import ProgressBar from '@/components/progressbar'
import Button from '@/components/button'
import FormLayout from '@/layout/form-layout'
import { QueryClient, dehydrate, useSuspenseQuery } from '@tanstack/react-query'
import { getQuestionQuery } from '@/queries/question'
import useQuestionForm, { QsSchemaType } from '@/hooks/useQuestionsForm'
import RadioButton from '@/components/radioButton'
import InputLabel from '@/components/inputLabel'
import Inputbox from '@/components/inputbox'
import { GetServerSideProps } from 'next'
import { serverURL } from '@/lib/server/utils'

const stepTextVariants: Variants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 20,
  },
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { wikiId } = ctx.query
  if (!wikiId || typeof wikiId === 'object') return { notFound: true }
  serverURL.pathname = '/api/v1/users'
  serverURL.searchParams.append('wikiId', wikiId)

  const response = await fetch(serverURL).then(
    (res) =>
      res.json() as Promise<{
        data?: { nickname: string }
        errorCode?: string
        reason?: string
      }>,
  )
  if (!response.data?.nickname) return { notFound: true }
  const {
    data: { nickname },
  } = response
  const queryClient = new QueryClient()
  try {
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

const Question = ({ nickname }: { nickname: string }) => {
  const { data: qs } = useSuspenseQuery(getQuestionQuery(nickname))
  const { Funnel, Step, useFunnel } = useRef(
    createFunnel(qs.map((item) => item.id)),
  ).current

  const { step, toPrevStep, toNextStep } = useFunnel()

  const stepRef = useRef<HTMLParagraphElement>(null)

  const [progress, setProgress] = useState<{ current: number; max: number }>({
    current: 0,
    max: QUESTION_MAX,
  })

  const questionForm = useQuestionForm({
    defaultValues: {
      answers: qs.map((item) => ({
        answer: '',
        questionId: item.id,
        reason: '',
        type: '',
      })),
    },
  })

  const { fields } = useFieldArray({
    name: 'answers',
    control: questionForm.control,
  })

  const { handleSubmit, setFocus } = questionForm
  const onSubmit = (data: QsSchemaType) => {
    console.log(data)
  }

  const countAnimation = ({
    direction,
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
            stepRef.current.innerText = `${target}%`
          }
          return cancelAnimationFrame(animationId)
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
    setProgress((prev) => ({ current: prev.current - 1, max: qs.length }))
    countAnimation({ direction: 'DOWN', index: progress.current - 1 })
  }
  const goNext = async () => {
    const formValues = questionForm.getValues().answers[progress.current]
    if (!formValues.answer) {
      setFocus(`answers.${progress.current}.answer`)
      return
    }
    if (!formValues.reason) {
      setFocus(`answers.${progress.current}.reason`)
      return
    }
    toNextStep()
    setProgress((prev) => ({ current: prev.current + 1, max: qs.length }))
    countAnimation({ direction: 'UP', index: progress.current + 1 })
  }

  const txt = useMemo(() => {
    const 상수들 = [0, 30]
    let result: number[] = []
    for (let i = 0; i < 5; i++) {
      const 상수 = qs.length - 상수들.length
      const makeRandomeArr = Array(상수)
        .fill(0)
        .map((item) => Math.random() * 70 + 30)
        .sort((a, b) => a - b)
        .map((item, idx) =>
          Math.round(((result?.[idx + 상수들.length] ?? 0) + item) / 2),
        )

      result = [...상수들, ...makeRandomeArr, 100].sort((a, b) => a - b)
    }
    return result
  }, [qs])

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
            goPrev()
          },
        },
      }}
      contentProps={{
        className: 'overflow-y-scroll',
      }}
      title={
        <div className="flex items-center overflow-hidden text-brand-main-green400 ">
          <p className="flex justify-center items-center" ref={stepRef}>
            0%
          </p>
          {/* <p className="px-1">/ {QUESTION_MAX}</p> */}
        </div>
      }
      button={
        <Button
          disabled={false}
          onClick={step === '14번' ? handleSubmit(onSubmit) : goNext}
          className="w-full"
        >
          {step === '14번' ? '제출하기' : '다음'}
        </Button>
      }
      content={
        <FunnelProvider
          value={{
            toPrevStep: goPrev,
            toNextStep: goNext,
          }}
        >
          <ProgressBar current={txt[progress.current]} />

          <FormProvider {...questionForm}>
            <Funnel step={step}>
              {fields.map((field, idx) => {
                const { title, options } = qs[idx]
                return (
                  <Step name={field.questionId} key={step}>
                    <div className="text-left grow flex flex-col space-y-8 overflow-y-hidden">
                      <div dangerouslySetInnerHTML={{ __html: title }}></div>
                      <div className="flex flex-col space-y-2 overflow-y-scroll">
                        {options.map((option) => (
                          <Controller
                            key={option.id}
                            name={`answers.${idx}.answer`}
                            defaultValue=""
                            control={questionForm.control}
                            render={({ field }) => (
                              <RadioButton
                                {...field}
                                id={option.id}
                                value={option.value + ''}
                                label={option.text}
                                selected={field.value === option.value + ''}
                                onChange={(e) => {
                                  field.onChange(e.target.value)
                                }}
                              />
                            )}
                          />
                        ))}
                      </div>
                      <div className="flex grow flex-col justify-end">
                        <InputLabel
                          className="text-sub2-medium"
                          label="이유를 말해주세요"
                          required
                        >
                          <Controller
                            control={questionForm.control}
                            defaultValue=""
                            name={`answers.${idx}.reason`}
                            render={({ field }) => (
                              <Inputbox
                                {...field}
                                placeholder="15글자 이내로 입력해주세요"
                                maxLength={15}
                                value={field.value + ''}
                              />
                            )}
                          />
                        </InputLabel>
                      </div>
                    </div>
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
