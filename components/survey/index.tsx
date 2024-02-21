import { useMemo, useRef, useState } from 'react'
import { Variants, motion, useAnimate } from 'framer-motion'
import { Controller, FormProvider, useFieldArray } from 'react-hook-form'

import { FunnelProvider } from '@/contexts/useFunnelContext'
import createFunnel from '@/components/funnel/createFunnel'

import { QUESTION_MAX } from '@/constants'
import ProgressBar from '@/components/progressbar'
import Button from '@/components/button'
import FormLayout from '@/layout/form-layout'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getQuestionQuery } from '@/queries/question'
import useQuestionForm, { QsSchemaType } from '@/hooks/useQuestionsForm'
import RadioButton from '../radioButton'
import InputLabel from '../inputLabel'
import Inputbox from '../inputbox'

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

const Question = () => {
  const { data: qs } = useSuspenseQuery(getQuestionQuery)
  const { Funnel, Step, useFunnel } = useRef(
    createFunnel(qs.map((item) => item.id)),
  ).current

  const { step, toPrevStep, toNextStep } = useFunnel()

  const [stepRef, animate] = useAnimate()

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

  const { handleSubmit, trigger } = questionForm
  const onSubmit = (data: QsSchemaType) => {
    console.log(data)
  }

  const goPrev = async () => {
    toPrevStep()
    setProgress((prev) => ({ current: prev.current - 1, max: qs.length }))
    await animate(stepRef.current, stepTextVariants.initial, {
      ease: 'easeInOut',
      type: 'tween',
    })
    await animate(stepRef.current, stepTextVariants.exit, { duration: 0 })
    await animate(stepRef.current, stepTextVariants.animate, {
      ease: 'easeInOut',
      type: 'tween',
    })
  }
  const goNext = async () => {
    toNextStep()
    setProgress((prev) => ({ current: prev.current + 1, max: qs.length }))
    await animate(stepRef.current, stepTextVariants.exit, {
      ease: 'easeInOut',
      type: 'tween',
    })
    await animate(stepRef.current, stepTextVariants.initial, { duration: 0 })
    await animate(stepRef.current, stepTextVariants.animate, {
      ease: 'easeInOut',
      type: 'tween',
    })
  }

  const stepText = useMemo(() => `${progress.current + 1}`, [step])

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
          <motion.p
            className="w-4 flex justify-center items-center"
            ref={stepRef}
          >
            {stepText}
          </motion.p>
          <p className="px-1">/ {QUESTION_MAX}</p>
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
          <ProgressBar {...progress} />

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
                            name={`answers.${idx}.questionId`}
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
