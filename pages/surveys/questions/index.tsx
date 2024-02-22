import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { Controller, FormProvider, useFieldArray } from 'react-hook-form'

import { FunnelProvider } from '@/contexts/useFunnelContext'
import createFunnel from '@/components/funnel/createFunnel'

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

import { cn } from '@/lib/client/utils'
import ComboboxDropdown from '@/components/combobox'
import { fadeInProps } from '@/variants'
import { useSession } from '@/provider/session-provider'
import { useRouter } from 'next/router'

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

const MotionLabel = motion(InputLabel)

const Question = ({ nickname }: { nickname: string }) => {
  const { data } = useSession()
  const { data: qs } = useSuspenseQuery(getQuestionQuery(nickname))
  const fieldList = useMemo(
    () => ['senderName', 'knowing', ...qs.map((item) => item.id)],
    [qs],
  )

  const { Funnel, Step, useFunnel } = useRef(createFunnel(fieldList)).current

  const { step, toPrevStep, toNextStep, hasNextStep, hasPrevStep } = useFunnel()
  const router = useRouter()

  const stepRef = useRef<HTMLParagraphElement>(null)

  const [progress, setProgress] = useState<{ current: number; max: number }>({
    current: 0,
    max: fieldList.length,
  })

  const questionForm = useQuestionForm({
    defaultValues: {
      owner: '',
      senderName: '',
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

  const { handleSubmit, setFocus, setError, trigger } = questionForm
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
    setProgress((prev) => ({ ...prev, current: prev.current - 1 }))
    countAnimation({ direction: 'DOWN', index: progress.current - 1 })
  }

  const checkValidate = (formKey: (keyof QsSchemaType)[] | number) => {
    const formValues = questionForm.getValues()

    if (typeof formKey === 'number') {
      if (!formValues.answers[formKey].answer) {
        const currentKey = `answers.${formKey}.answer` as const
        setFocus(currentKey)
        setError(currentKey, {})
        return false
      }
      if (!formValues.answers[formKey].reason) {
        const currentKey = `answers.${formKey}.reason` as const
        setFocus(currentKey)
        setError(currentKey, {})
        return false
      }
      return true
    } else {
      console.log(formKey)
      return formKey.every((key) => {
        if (!formValues[key]) {
          setFocus(key)
          setError(key, {})
          return false
        }
        return true
      })
    }
  }
  const goNext = async (keys: (keyof QsSchemaType)[] | number) => {
    if (!checkValidate(keys)) return
    toNextStep()
    setProgress((prev) => ({ ...prev, current: prev.current + 1 }))
    countAnimation({ direction: 'UP', index: progress.current + 1 })
  }

  const validList: ((keyof QsSchemaType)[] | number)[] = [
    ['senderName'] as const,
    ['period', 'relation'] as const,
    ...qs.map((_, i) => i),
  ]

  const txt = useMemo(() => {
    const 상수들 = [0, 0, 0, 30]
    let result: number[] = []
    for (let i = 0; i < 5; i++) {
      const 상수 = fieldList.length - 상수들.length
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
  }, [fieldList])

  useEffect(() => {
    if (data?.user?.name) {
      questionForm.setValue('senderName', data.user.name)
    }
  }, [data?.user?.name])

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
        <Button
          disabled={false}
          onClick={
            !hasNextStep
              ? handleSubmit(onSubmit)
              : () => goNext(validList[progress.current])
          }
          className="w-full"
        >
          {!hasNextStep ? '제출하기' : '다음'}
        </Button>
      }
      content={
        <FunnelProvider
          value={{
            toPrevStep: goPrev,
            toNextStep: () => goNext(validList[progress.current]),
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
                      <InputLabel className="text-body1-bold" label="이름">
                        <Inputbox
                          {...field}
                          placeholder="이름을 입력해주세요"
                          maxLength={6}
                        />
                        <p
                          className={cn(
                            'mt-3 text-body3-medium ml-2 text-text-sub-gray76',
                            questionForm.formState.errors.senderName &&
                              'text-inputbox-color-alert',
                          )}
                        >
                          2-6자로 입력해주세요
                        </p>
                      </InputLabel>
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
                          { label: '4년이상', value: 'infinite'.toUpperCase() },
                        ]}
                        {...field}
                        onChange={(value) => {
                          field.onChange(value)
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
                          onChange={(value) => {
                            field.onChange(value)
                          }}
                        />
                      )}
                    />
                  </MotionLabel>
                </div>
              </Step>
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
  serverURL.searchParams.delete('wikiId')
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
