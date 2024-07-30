import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Controller, FormProvider, useFieldArray } from 'react-hook-form'
import { FunnelProvider } from '@/contexts/useFunnelContext'
import createFunnel from '@/components/funnel/createFunnel'
import ProgressBar from '@/components/progressbar'
import { Button } from '@/components/ui'
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
import { ComboboxDropdown } from '@/components/ui'
import { Inputbox } from '@/components/ui'
import { GetServerSideProps } from 'next'
import { serverURL } from '@/lib/server/utils'

import { cn } from '@/lib/client/utils'

import { fadeInProps } from '@/variants'
import { useSession } from '@/provider/session-provider'
import { useRouter } from 'next/router'
import SurveyForm from '@/components/survey/survey-form'
import { toastError } from '@/lib/client/alert'
import Image from 'next/image'
import caution from '@/assets/icons/caution.svg'
import { useToggleTheme } from '@/hooks/use-toggle-theme'
import { PropswithWikiType, WikiType } from '@/types'

const MotionLabel = motion(InputLabel)

const Question = ({
  nickname,
  wikiType,
}: PropswithWikiType<{
  nickname: string
}>) => {
  const { data } = useSession()
  const { data: qs } = useSuspenseQuery(getQuestionQuery(nickname, wikiType))
  const { mutate: submit, isPending } = useMutation(
    submitQuestionMutaion({
      onSuccess() {
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

  const [progress, setProgress] = useState<{ current: number; max: number }>({
    current: 0,
    max: fieldList.length,
  })

  useToggleTheme(wikiType)

  const questionForm = useQuestionForm({
    defaultValues: {
      owner: router.query.wikiId! as string,
      senderName: '',
      wikiType: wikiType,
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

  const { handleSubmit } = questionForm
  const onSubmit = async (data: QsSchemaType) => {
    data.answers.forEach((an) => {
      if (!an.reason) {
        delete an.reason
      }
    })
    submit(data)
  }

  const goPrev = async () => {
    toPrevStep()
    setProgress((prev) => ({ ...prev, current: prev.current - 1 }))
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
  }

  const txt = useMemo(() => {
    const nums = [0, 0, 0, 30]
    if (fieldList.length <= nums.length) return []
    let result: number[] = []
    for (let i = 0; i < 5; i++) {
      const num = fieldList.length - nums.length
      const makeRandomeArr = Array(num)
        .fill(0)
        .map((_) => Math.random() * 70 + 30)
        .sort((a, b) => a - b)
        .map((item, idx) =>
          Math.round(((result?.[idx + nums.length] ?? 0) + item) / 2),
        )

      result = [...nums, ...makeRandomeArr, 100].sort((a, b) => a - b)
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
            hasPrevStep ? goPrev() : router.back()
          },
        },
      }}
      contentProps={{
        className: 'overflow-y-scroll',
      }}
      title={
        !['senderName', 'knowing'].includes(step) ? (
          <div className="text-brand-main-green400 flex items-center overflow-hidden ">
            <p className="flex items-center justify-center">남의위키</p>
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
                  className="flex grow flex-col overflow-y-hidden text-left"
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
                              'pl-2 text-body3-medium duration-150',
                              questionForm.formState.errors.senderName &&
                                '!text-inputbox-color-alert',
                              'text-sub-gray76 text-body3-medium',
                            )}
                            style={{ color: '#767676' }}
                          >
                            2~6자로 입력해주세요.
                          </p>
                        </div>
                        <div className="bg-gray-gray50 mt-5 flex space-x-3 rounded-md px-5 py-4">
                          <Image
                            src={caution}
                            alt="caution"
                            className="my-[2px] h-4 w-4 shrink-0"
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
                      id={id}
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
  const { wikiId, wikiType } = ctx.query
  if (!wikiId || typeof wikiType !== 'string' || typeof wikiId === 'object')
    return { notFound: true }
  if (!['NAMUI', 'ROMANCE'].includes(wikiType.toUpperCase())) {
    return { notFound: true }
  }
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
    await queryClient.prefetchQuery(
      getQuestionQuery(nickname, wikiType as WikiType),
    )

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        nickname,
        wikiType,
      },
    }
  } catch (_) {
    return {
      props: { wikiType },
    }
  } finally {
    queryClient.clear()
  }
}
