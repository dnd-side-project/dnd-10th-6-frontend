import { Option } from '@/model/option.entity'
import { QuestionType } from '@/model/question.entity'
import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { fadeInProps } from '@/variants'
import { cn } from '@/lib/client/utils'
import InputLabel from '../inputLabel'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui'
import { TreeSvg } from '../questionTrees'

const surveyScheme = z.object({
  answer: z.string().min(1).or(z.number()),
  id: z.string().min(1),
  reason: z.string().optional(),
  type: z.enum(['OPTION', 'MANUAL']),
})

type surveyFormType = z.infer<typeof surveyScheme>

interface SurveyFormProps {
  type: QuestionType
  title: string
  options: Option[]
  name: string
  initialValue: surveyFormType
  isLast: boolean
  index: number
  disabled: boolean
  onConfirm: (values: surveyFormType) => void
}

const SurveyForm = ({
  type,
  options,
  title,
  name,
  isLast,
  index,
  initialValue,
  disabled,
  onConfirm,
}: SurveyFormProps) => {
  const [numericString, setNumeric] = useState<string>(
    typeof initialValue.answer === 'number'
      ? initialValue.answer.toLocaleString()
      : '',
  )
  const form = useForm<surveyFormType>({
    resolver: zodResolver(surveyScheme),
    defaultValues: {
      ...initialValue,
    },
    mode: 'onChange',
  })

  const localeToNum = (num: string) =>
    num.split(',').reduce((curr, acc) => curr + acc, '')
  const inputPriceFormat = (str: string) => {
    const comma = (str: string) => {
      str = String(str)
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
    }
    const uncomma = (str: string) => {
      str = String(str)
      return str.replace(/[^\d]+/g, '')
    }
    const localeString = comma(uncomma(str))
    if (localeString.length >= 13) return
    setNumeric(localeString)
    return localeString
  }

  const onValid = (values: surveyFormType) => {
    if (type !== 'SHORT_ANSWER' && !values.reason) {
      form.setError('reason', { type: 'required' })
      form.setFocus('reason')
      return
    }
    if (values.type === 'MANUAL' && !values.answer) {
      form.setError('answer', { type: 'required' })
      form.setFocus('answer')
      return
    }
    onConfirm(values)
  }
  useEffect(() => {
    form.trigger()
  }, [])

  const selectedType = form.watch().type
  const answerWatch = form.watch().answer
  const reasonWatch = form.watch().reason
  const Tree = TreeSvg[(index - 1) as keyof typeof TreeSvg]
  return (
    <form
      onSubmit={form.handleSubmit(onValid)}
      className="relative flex h-full flex-col space-y-6 overflow-y-hidden text-left"
    >
      {type === 'OX' ? (
        <div className="!mb-[190px] flex grow flex-col space-y-2 overflow-y-scroll">
          <div
            className="text-subTitle1-medium"
            dangerouslySetInnerHTML={{ __html: title }}
          ></div>
          <Controller
            name={`id`}
            control={form.control}
            render={({ field }) => (
              <>
                {options.map((option) => (
                  <motion.div
                    key={option.id}
                    {...fadeInProps}
                    transition={{
                      delay: 0.2,
                      duration: 0.3,
                    }}
                    className={cn(
                      'flex w-full items-center justify-start rounded-sm border border-[#E5E5EC] p-4 transition-all duration-200',
                      'focus-within:border-brand-main-green400',
                      'disabled:cursor-not-allowed disabled:opacity-50',
                      field.value === option.id + '' &&
                        'border border-brand-main-green400 bg-main-green-green50',
                    )}
                  >
                    <input
                      id={option.id}
                      name={name}
                      value={option.id}
                      type="radio"
                      className="hidden"
                      onChange={({ target }) => {
                        if (option.value + '' === 'MANUAL') {
                          form.setValue('type', 'MANUAL')
                        } else {
                          form.setValue('type', 'OPTION')
                          form.setValue('answer', target.value)
                          form.trigger('answer')
                        }

                        field.onChange(target.value)
                      }}
                    />
                    <label
                      htmlFor={option.id}
                      className={cn(
                        'flex items-center',
                        'cursor-pointer',
                        'text-body1-medium font-medium text-gray-700 transition-all duration-200',
                        'w-full pl-2',

                        field.value === option.id + '' && 'font-bold',
                      )}
                    >
                      <div
                        className={cn(
                          'h-4 w-4 rounded-full border border-[#E5E5EC] bg-text-main-whiteFF transition-all duration-200 ',
                          'hover:border-brand-main-green400',
                          field.value === option.id + '' &&
                            'border-4 border-brand-main-green400',
                        )}
                      ></div>

                      <span className="ml-2">{option.text}</span>
                    </label>
                  </motion.div>
                ))}
              </>
            )}
          />
        </div>
      ) : type === 'MULTIPLE_CHOICE' ? (
        <div className="!mb-[190px] flex grow flex-col space-y-2 overflow-y-scroll">
          <div
            className="text-subTitle1-medium"
            dangerouslySetInnerHTML={{ __html: title }}
          ></div>
          <Controller
            name={`id`}
            defaultValue=""
            control={form.control}
            render={({ field }) => (
              <>
                {options.map((option) => (
                  <motion.div
                    key={option.id}
                    {...fadeInProps}
                    transition={{
                      delay: 0.2,
                      duration: 0.3,
                    }}
                    className={cn(
                      'flex w-full items-center justify-start rounded-sm border border-[#E5E5EC] p-4 transition-all duration-200',
                      'focus-within:border-brand-main-green400',
                      'disabled:cursor-not-allowed disabled:opacity-50',
                      field.value === option.id + '' &&
                        'border border-brand-main-green400 bg-main-green-green50',
                    )}
                  >
                    <input
                      id={option.id}
                      name={name}
                      value={option.id}
                      type="radio"
                      className="hidden"
                      onChange={({ target }) => {
                        if (option.value + '' === 'MANUAL') {
                          form.setError('answer', { type: 'required' })
                          form.setValue('type', 'MANUAL')
                          form.setValue('answer', '')
                        } else {
                          form.setValue('type', 'OPTION')
                          form.setValue('answer', target.value + '')
                          form.trigger('answer')
                        }

                        field.onChange(target.value)
                      }}
                    />
                    <label
                      htmlFor={option.id}
                      className={cn(
                        'flex items-center',
                        'cursor-pointer',
                        'text-body1-medium font-medium text-gray-700 transition-all duration-200',
                        'w-full pl-2',

                        field.value === option.id + '' && 'font-bold',
                      )}
                    >
                      <div
                        className={cn(
                          'h-4 w-4 rounded-full border border-[#E5E5EC] bg-text-main-whiteFF transition-all duration-200 ',
                          'hover:border-brand-main-green400',
                          field.value === option.id + '' &&
                            'border-4 border-brand-main-green400',
                        )}
                      ></div>

                      {[option.value, selectedType].every(
                        (item) => item === 'MANUAL',
                      ) ? (
                        <AutoFocusedInput
                          defaultValue={form.getValues().answer}
                          className="ml-4 bg-transparent outline-none"
                          placeholder="15글자 이내로 입력해주세요"
                          maxLength={15}
                          onChange={(e) => {
                            form.setValue('answer', e.target.value)
                            form.trigger('answer')
                          }}
                        />
                      ) : (
                        <span className="ml-2">{option.text}</span>
                      )}
                    </label>
                  </motion.div>
                ))}
              </>
            )}
          />
        </div>
      ) : type === 'NUMERIC_CHOICE' ? (
        <div className="!mb-[190px] flex grow flex-col space-y-2 overflow-y-scroll">
          <div
            className="text-subTitle1-medium"
            dangerouslySetInnerHTML={{ __html: title }}
          ></div>
          <Controller
            name={`id`}
            defaultValue=""
            control={form.control}
            render={({ field }) => (
              <>
                {options.map((option) => (
                  <motion.div
                    key={option.id}
                    {...fadeInProps}
                    transition={{
                      delay: 0.2,
                      duration: 0.3,
                    }}
                    className={cn(
                      'flex w-full items-center justify-start rounded-sm border border-[#E5E5EC] p-4 transition-all duration-200',
                      'focus-within:border-brand-main-green400',
                      'disabled:cursor-not-allowed disabled:opacity-50',
                      field.value === option.id + '' &&
                        'border border-brand-main-green400 bg-main-green-green50',
                    )}
                  >
                    <AutoFocusedInput
                      defaultValue={form.getValues().answer}
                      id={option.id}
                      name={name}
                      value={option.id}
                      type="radio"
                      className="hidden"
                      onChange={({ target }) => {
                        if (option.value + '' === 'MANUAL') {
                          form.setError('answer', { type: 'required' })
                          form.setValue('type', 'MANUAL')
                          form.setValue('answer', '')
                        } else {
                          form.setValue('type', 'OPTION')
                          form.setValue('answer', target.value)
                          form.trigger('answer')
                        }

                        field.onChange(target.value)
                      }}
                    />
                    <label
                      htmlFor={option.id}
                      className={cn(
                        'flex items-center',
                        'cursor-pointer',
                        'text-body1-medium font-medium text-gray-700 transition-all duration-200',
                        'w-full pl-2',

                        field.value === option.id + '' && 'font-bold',
                      )}
                    >
                      <div
                        className={cn(
                          'h-4 w-4 rounded-full border border-[#E5E5EC] bg-text-main-whiteFF transition-all duration-200 ',
                          'hover:border-brand-main-green400',
                          field.value === option.id + '' &&
                            'border-4 border-brand-main-green400',
                        )}
                      ></div>

                      {[option.value, selectedType].every(
                        (item) => item === 'MANUAL',
                      ) ? (
                        <>
                          <AutoFocusedInput
                            className="ml-4 grow bg-transparent outline-none"
                            placeholder="숫자만 입력해주세요"
                            maxLength={15}
                            type="text"
                            inputMode="numeric"
                            value={numericString}
                            onChange={(e) => {
                              const newValue = inputPriceFormat(e.target.value)
                              if (newValue === undefined) return
                              if (!newValue) {
                                form.setValue('answer', 0)
                                return
                              }
                              form.setValue('answer', +localeToNum(newValue))
                              form.trigger('answer')
                              return newValue
                            }}
                          />
                          {typeof form.getValues().answer === 'number' &&
                            (form.getValues().answer as number) > 0 && (
                              <span className="text-body1-medium text-text-sub-gray4f">
                                원
                              </span>
                            )}
                        </>
                      ) : (
                        <span className="ml-2">{option.text}</span>
                      )}
                    </label>
                  </motion.div>
                ))}
              </>
            )}
          />
        </div>
      ) : (
        <div className="!mb-[240px] flex grow flex-col space-y-2 overflow-y-scroll">
          <div
            className="text-subTitle1-medium"
            dangerouslySetInnerHTML={{ __html: title }}
          ></div>
          <Controller
            name={`answer`}
            defaultValue=""
            control={form.control}
            render={({ field }) => (
              <div className="relative px-4 py-[14px]">
                <textarea
                  {...field}
                  id={field.name}
                  className={cn(
                    'peer flex w-full resize-none border-none bg-transparent text-body3-medium outline-none  placeholder:text-muted  placeholder:text-text-sub-gray4f disabled:cursor-not-allowed disabled:text-disabled disabled:placeholder:text-disabled ',
                  )}
                  placeholder={
                    name === 'FIVE_LETTER_WORD'
                      ? '5글자로 입력해주세요'
                      : '50글자 이내로 입력해주세요'
                  }
                  {...(name === 'FIVE_LETTER_WORD' && { minLength: 5 })}
                  maxLength={name === 'FIVE_LETTER_WORD' ? 5 : 50}
                  rows={2}
                  value={field.value + ''}
                  onKeyDown={(e) => {
                    if (name === 'FIVE_LETTER_WORD') {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                      }
                    }
                  }}
                  onChange={(e) => {
                    form.setValue('type', 'MANUAL')
                    if (e.target.value) {
                      form.setValue('id', type)
                      form.trigger('id')
                    } else {
                      form.setError('id', { type: 'required' })
                    }
                    const MAX_LENGTH = name === 'FIVE_LETTER_WORD' ? 5 : 50
                    if (e.target.value.length <= MAX_LENGTH) {
                      field.onChange(e)
                    }
                  }}
                />
                <label
                  htmlFor={field.name}
                  className={cn(
                    'pointer-events-none absolute left-1/2 top-1/2 block h-full w-full -translate-x-1/2 -translate-y-1/2 touch-none select-none rounded-md border-[1px] border-brand-main-green400 duration-100 peer-placeholder-shown:border-line-medium peer-focus-visible:border-brand-main-green400',
                  )}
                />
                <span className="absolute bottom-[14px] right-4 text-body3-medium text-text-sub-gray99">
                  {(field.value + '').length}/
                  {name === 'FIVE_LETTER_WORD' ? 5 : 50}
                </span>
              </div>
            )}
          />
        </div>
      )}
      <div className="absolute bottom-0 flex w-full flex-col items-end justify-end">
        {type !== 'SHORT_ANSWER' && (
          <InputLabel
            className="text-sub2-medium"
            label="이유를 말해주세요"
            required
          >
            <Controller
              control={form.control}
              defaultValue=""
              name={'reason'}
              render={({ field }) => (
                <div className="relative px-4 py-[14px]">
                  <textarea
                    {...field}
                    id={field.name}
                    className={cn(
                      'peer flex w-full resize-none border-none bg-transparent text-body3-medium outline-none  placeholder:text-muted  placeholder:text-text-sub-gray4f disabled:cursor-not-allowed disabled:text-disabled disabled:placeholder:text-disabled ',
                    )}
                    placeholder="50글자 이내로 입력해주세요"
                    maxLength={50}
                    rows={2}
                    value={field.value + ''}
                    onChange={(e) => {
                      if (e.target.value) {
                        form.trigger('answer')
                      } else {
                        form.setError('answer', { type: 'required' })
                      }
                      field.onChange(e)
                    }}
                  />
                  <label
                    htmlFor={field.name}
                    className={cn(
                      'pointer-events-none absolute left-1/2 top-1/2 block h-full w-full -translate-x-1/2 -translate-y-1/2 touch-none select-none rounded-md border-[1px] border-brand-main-green400 duration-100 peer-placeholder-shown:border-line-medium peer-focus-visible:border-brand-main-green400',
                    )}
                  />
                  <span className="absolute bottom-[14px] right-4 text-body3-medium text-text-sub-gray99">
                    {field.value?.length}/50
                  </span>
                </div>
              )}
            />
          </InputLabel>
        )}

        {Tree && Tree}
        <div className="mb-4 flex w-full justify-center bg-white pt-5">
          <Button
            disabled={
              disabled ||
              (name === 'FIVE_LETTER_WORD'
                ? answerWatch.toString().length !== 5
                : Object.keys(form.formState.errors).length !== 0 ||
                  (type !== 'SHORT_ANSWER' && !reasonWatch))
            }
            type="submit"
            className="w-full"
          >
            {isLast ? '제출하기' : '다음'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default SurveyForm

interface AutoFocusedInputProps extends InputHTMLAttributes<HTMLInputElement> {}
function AutoFocusedInput(props: AutoFocusedInputProps) {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])
  return <input ref={ref} {...props} />
}
