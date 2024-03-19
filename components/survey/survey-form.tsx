import { Option } from '@/model/option.entity'
import { QuestionType } from '@/model/question.entity'
import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { fadeInProps } from '@/variants'
import { cn } from '@/lib/client/utils'
import InputLabel from '../inputLabel'
import Inputbox from '../inputbox'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '../button'
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
      className="text-left grow flex flex-col space-y-6 overflow-y-hidden"
    >
      <div
        className="text-subTitle1-medium"
        dangerouslySetInnerHTML={{ __html: title }}
      ></div>
      {type === 'OX' ? (
        <div className="flex flex-col space-y-2 overflow-y-scroll">
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
                      'flex items-center justify-start w-full p-4 rounded-sm border border-[#E5E5EC] transition-all duration-200',
                      'focus-within:border-brand-main-green400',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      field.value === option.id + '' &&
                        'border-brand-main-green400 border bg-main-green-green50',
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
                          'w-4 h-4 rounded-full bg-text-main-whiteFF border border-[#E5E5EC] transition-all duration-200 ',
                          'hover:border-brand-main-green400',
                          field.value === option.id + '' &&
                            'border-brand-main-green400 border-4',
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
        <div className="flex flex-col space-y-2 overflow-y-scroll">
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
                      'flex items-center justify-start w-full p-4 rounded-sm border border-[#E5E5EC] transition-all duration-200',
                      'focus-within:border-brand-main-green400',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      field.value === option.id + '' &&
                        'border-brand-main-green400 border bg-main-green-green50',
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
                          'w-4 h-4 rounded-full bg-text-main-whiteFF border border-[#E5E5EC] transition-all duration-200 ',
                          'hover:border-brand-main-green400',
                          field.value === option.id + '' &&
                            'border-brand-main-green400 border-4',
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
        <div className="flex flex-col space-y-2 overflow-y-scroll">
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
                      'flex items-center justify-start w-full p-4 rounded-sm border border-[#E5E5EC] transition-all duration-200',
                      'focus-within:border-brand-main-green400',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      field.value === option.id + '' &&
                        'border-brand-main-green400 border bg-main-green-green50',
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
                          'w-4 h-4 rounded-full bg-text-main-whiteFF border border-[#E5E5EC] transition-all duration-200 ',
                          'hover:border-brand-main-green400',
                          field.value === option.id + '' &&
                            'border-brand-main-green400 border-4',
                        )}
                      ></div>

                      {[option.value, selectedType].every(
                        (item) => item === 'MANUAL',
                      ) ? (
                        <AutoFocusedInput
                          className="ml-4 bg-transparent outline-none"
                          placeholder="직접입력 (숫자만 입력)"
                          maxLength={15}
                          type="text"
                          inputMode="numeric"
                          value={numericString}
                          onChange={(e) => {
                            const newValue = inputPriceFormat(e.target.value)
                            if (!newValue) return
                            form.setValue('answer', +localeToNum(newValue))
                            form.trigger('answer')
                            return newValue
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
      ) : (
        <div className="flex flex-col space-y-2 overflow-y-scroll">
          <Controller
            name={`answer`}
            defaultValue=""
            control={form.control}
            render={({ field }) => (
              <div className="relative py-[14px] px-4">
                <textarea
                  {...field}
                  id={field.name}
                  className={cn(
                    'flex resize-none w-full peer placeholder:text-muted border-none placeholder:text-text-sub-gray4f disabled:cursor-not-allowed  text-body3-medium  outline-none disabled:text-disabled disabled:placeholder:text-disabled bg-transparent ',
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
                    field.onChange(e)
                  }}
                />
                <label
                  htmlFor={field.name}
                  className={cn(
                    'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[1px] border-brand-main-green400 peer-focus-visible:border-brand-main-green400 peer-placeholder-shown:border-line-medium block rounded-md duration-100',
                  )}
                />
                <span className="absolute right-4 bottom-[14px] text-text-sub-gray99 text-body3-medium">
                  {(field.value + '').length}/
                  {name === 'FIVE_LETTER_WORD' ? 5 : 50}
                </span>
              </div>
            )}
          />
        </div>
      )}
      <div className="flex grow flex-col justify-end items-end w-full">
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
                <div className="relative py-[14px] px-4">
                  <textarea
                    {...field}
                    id={field.name}
                    className={cn(
                      'flex resize-none w-full peer placeholder:text-muted border-none placeholder:text-text-sub-gray4f disabled:cursor-not-allowed  text-body3-medium  outline-none disabled:text-disabled disabled:placeholder:text-disabled bg-transparent ',
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
                      'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[1px] border-brand-main-green400 peer-focus-visible:border-brand-main-green400 peer-placeholder-shown:border-line-medium block rounded-md duration-100',
                    )}
                  />
                  <span className="absolute right-4 bottom-[14px] text-text-sub-gray99 text-body3-medium">
                    {field.value?.length}/50
                  </span>
                </div>
              )}
            />
          </InputLabel>
        )}

        {Tree && Tree}
        <div className="pt-5 mb-4 bg-white flex justify-center w-full">
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
