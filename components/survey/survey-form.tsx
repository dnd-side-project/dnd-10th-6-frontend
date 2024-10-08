import { Option } from '@/model/option.entity'
import { QuestionType } from '@/model/question.entity'
import React, {
  InputHTMLAttributes,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form'
import { Reorder, motion, useMotionValue } from 'framer-motion'
import { fadeInProps } from '@/variants'
import { cn, useBrowserLayoutEffect } from '@/lib/client/utils'
import InputLabel from '../inputLabel'
import * as z from 'zod'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Inputbox } from '@/components/ui'
import { useRaisedShadow } from '@/hooks/use-raised-shadow'
import { ANSWER_TYPE } from '@/constants/enum'
import UpDownSheet from '../ui/updownSheet'
import questionTree from '@/assets/characters/question-tree.svg'
import questionFlower from '@/assets/characters/question-flower.svg'
import rankingIcon from '@/assets/icons/ranking.svg'
import { useSearchParams } from 'next/navigation'
import { WikiType } from '@/types'

const surveyScheme = z.object({
  answer: z.string().min(1).or(z.number()).or(z.array(z.string())),
  id: z.string().min(1),
  reason: z.string().optional(),
  type: z.enum([
    ANSWER_TYPE.MANUAL,
    ANSWER_TYPE.OPTION,
    ANSWER_TYPE.OPTION_LIST,
  ]),
})

type surveyFormType = z.infer<typeof surveyScheme>

interface SurveyFormProps {
  id: string
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

interface ReorderOptionsProps {
  id: string
  options: Option[]
  name: string
}

const ReorderOptionItem = ({
  id,
  value,
  children,
  index,
  totalItems,
  moveItem,
  selectedId,
  setSelectedId,
}: PropsWithChildren<{
  value: unknown
  id: string
  index: number
  totalItems: number
  moveItem: (from: number, to: number) => void
  selectedId: string | null
  setSelectedId: (id: string | null) => void
}>) => {
  const y = useMotionValue(0)
  const boxShadow = useRaisedShadow(y)
  const [isUpDownSheetOpen, setUpDownSheetOpen] = useState(false)

  return (
    <>
      <Reorder.Item
        style={{ boxShadow, y }}
        value={value}
        id={id}
        key={id}
        className={cn(
          'flex w-full items-center justify-start rounded-md border bg-white p-4',
          selectedId === id
            ? 'border-brand-main bg-pink-300'
            : 'border-[#E5E5EC]',
          'hover:border-brand-main hover:bg-pink-200',
          'focus-within:border-brand-main',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
        onClick={() => {
          setUpDownSheetOpen(true)
          setSelectedId(id)
        }}
      >
        {children}
      </Reorder.Item>
      <UpDownSheet
        isOpen={isUpDownSheetOpen}
        onClose={() => setUpDownSheetOpen(false)}
        onMoveUp={() => {
          if (index > 0) moveItem(index, index - 1)
        }}
        onMoveDown={() => {
          if (index < totalItems - 1) moveItem(index, index + 1)
        }}
        isFirst={index === 0}
        isLast={index === totalItems - 1}
      />
    </>
  )
}

function checkArray(value: unknown): value is Array<string> {
  return Array.isArray(value) && value.every((v) => typeof v === 'string')
}
const ReorderOptions = ({ options, id }: ReorderOptionsProps) => {
  const form = useFormContext<surveyFormType>()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const [optionsState, setOptionsState] = useState(() => {
    const initialValues = form.getValues('answer')
    return checkArray(initialValues) && initialValues.length
      ? initialValues
      : options.map((option) => option.id)
  })

  const optionMap = useRef(
    new Map(options.map((option) => [option.id, option.text])),
  )

  useBrowserLayoutEffect(() => {
    form.setValue('type', ANSWER_TYPE.OPTION_LIST)
    form.setValue('answer', optionsState)
    form.setValue('id', id)
  }, [])

  const moveItem = (from: number, to: number) => {
    const updatedOptions = [...optionsState]
    const [movedItem] = updatedOptions.splice(from, 1)
    updatedOptions.splice(to, 0, movedItem)
    setOptionsState(updatedOptions)
    form.setValue('answer', updatedOptions)
  }

  return (
    <>
      <div className="mb-7 mt-1 flex items-center justify-center space-x-2">
        <span className="rounded-full bg-pink-200 px-4 py-[7px] text-but4-sb text-pink-600">
          순서대로
        </span>
        <span className="rounded-full bg-bg-regular px-4 py-[7px] text-but4-sb text-font-gray-04">
          옮겨주세요
        </span>
      </div>
      <Reorder.Group
        axis="y"
        onReorder={(state) => {
          form.setValue('answer', state)
          setOptionsState(state)
        }}
        values={optionsState}
        className="w-full flex-1 space-y-2 px-1"
      >
        {optionsState.map((option, index) => (
          <div className="flex w-full items-center" key={option}>
            <span
              className={cn(
                'mr-3 whitespace-nowrap p-4 text-but3-sb ',
                index === 0 ? 'text-pink-600' : 'text-gray-500', // Apply pink color for the first item
              )}
            >
              {index + 1}위
            </span>
            <ReorderOptionItem
              key={option}
              value={option}
              id={option}
              index={index}
              totalItems={optionsState.length}
              moveItem={moveItem}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            >
              <label
                className={cn(
                  'flex w-full cursor-pointer items-center justify-between',
                  'pl-2 text-b1-kr-m text-gray-700 transition-all duration-200',
                )}
              >
                <span className="ml-2">{optionMap?.current?.get(option)}</span>
                <Image
                  src={rankingIcon}
                  alt="rankingIcon"
                  className="pointer-events-none"
                />
              </label>
            </ReorderOptionItem>
          </div>
        ))}
      </Reorder.Group>
    </>
  )
}

const SurveyForm = ({
  id,
  type,
  options,
  title,
  name,
  isLast,
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

  const searchParams = useSearchParams()
  const wikiType = searchParams.get('wikiType') as WikiType
  const imgSrc = (() => {
    switch (wikiType) {
      case 'NAMUI':
        return questionTree
      case 'ROMANCE':
        return questionFlower
      default:
        return questionTree
    }
  })()

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onValid)}
        className="relative flex h-full flex-col space-y-6 overflow-y-hidden text-left"
      >
        {type === 'OX' ? (
          // OX
          <div className="!mb-[190px] flex grow flex-col  items-center gap-1.5 overflow-y-scroll pb-7 text-center">
            <Image src={imgSrc} alt="questionAssets" />
            <div
              className="mb-4 mt-1 text-t2-kr-m"
              dangerouslySetInnerHTML={{ __html: title }}
            ></div>
            <Controller
              name={`id`}
              control={form.control}
              render={({ field }) => (
                <>
                  {options.map((option) => (
                    <motion.label
                      htmlFor={option.id}
                      key={option.id}
                      {...fadeInProps}
                      transition={{
                        delay: 0.2,
                        duration: 0.3,
                      }}
                      className={cn(
                        'flex w-full items-center justify-start rounded-md border border-[#E5E5EC] p-4 transition-all duration-200',
                        'focus-within:border-brand-main',
                        'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
                        field.value === option.id + '' &&
                          'border border-brand-main bg-brand-hover',
                      )}
                    >
                      <Inputbox
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
                      <div
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
                            'hover:border-brand-main',
                            field.value === option.id + '' &&
                              'border-4 border-brand-main',
                          )}
                        ></div>

                        <span className="ml-2">{option.text}</span>
                      </div>
                    </motion.label>
                  ))}
                </>
              )}
            />
          </div>
        ) : type === 'MULTIPLE_CHOICE' ? (
          // 다중선택
          <div className="!mb-[190px] flex grow flex-col  items-center gap-1.5 overflow-y-scroll pb-7 text-center">
            <Image src={imgSrc} alt="questionAssets" />
            <div
              className="mb-4 mt-1 text-center text-t2-kr-m"
              dangerouslySetInnerHTML={{ __html: title }}
            ></div>
            <Controller
              name={`id`}
              defaultValue=""
              control={form.control}
              render={({ field }) => (
                <>
                  {options.map((option) => (
                    <motion.label
                      key={option.id}
                      htmlFor={option.id}
                      {...fadeInProps}
                      transition={{
                        delay: 0.2,
                        duration: 0.3,
                      }}
                      className={cn(
                        'flex w-full items-start justify-start rounded-md border border-[#E5E5EC] p-4 transition-all duration-200',
                        'focus-within:border-brand-main',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        'cursor-pointer flex-col',
                        field.value === option.id + '' &&
                          'border border-brand-main bg-brand-hover',
                      )}
                    >
                      <Inputbox
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
                      <div
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
                            'hover:border-brand-main',
                            field.value === option.id + '' &&
                              'border-4 border-brand-main',
                          )}
                        />

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
                          <span className="ml-2 text-left text-b1-kr-b">
                            {option.text}
                          </span>
                        )}
                      </div>
                      <span className="ml-8 text-left text-b2-kr-m text-font-gray-04">
                        {option.description}
                      </span>
                    </motion.label>
                  ))}
                </>
              )}
            />
          </div>
        ) : type === 'NUMERIC_CHOICE' ? (
          // 숫자 선택
          <div className="!mb-[190px] flex grow flex-col  items-center gap-1.5 overflow-y-scroll pb-7 text-center ">
            <Image src={imgSrc} alt="questionAssets" />
            <div
              className="mb-4 mt-1 text-center text-t2-kr-m"
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
                        'focus-within:border-brand-main',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        field.value === option.id + '' &&
                          'border border-brand-main bg-main-green-green50',
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
                            'hover:border-brand-main',
                            field.value === option.id + '' &&
                              'border-4 border-brand-main',
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
                                const newValue = inputPriceFormat(
                                  e.target.value,
                                )
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
        ) : type === 'RANK' ? (
          <div className="!mb-[190px] flex grow flex-col  items-center gap-1.5 overflow-y-scroll pb-7 text-center">
            <Image src={imgSrc} alt="questionAssets" />
            <div
              className="mt-1 text-t2-kr-m"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <ReorderOptions options={options} name={name} id={id} />
          </div>
        ) : (
          <div className="gap-1.5text-center !mb-[240px] flex grow  flex-col items-center pb-7 ">
            <Image src={imgSrc} alt="questionAssets" />
            <div
              className="mb-4 mt-1 text-center text-t2-kr-m"
              dangerouslySetInnerHTML={{ __html: title }}
            ></div>
            <Controller
              name={`answer`}
              defaultValue=""
              control={form.control}
              render={({ field }) => (
                <div className="relative w-full px-4 py-[14px] text-left">
                  <textarea
                    className="placeholder:text-muted peer flex w-full  resize-none border-none bg-transparent bg-white text-b2-kr-m text-black outline-none placeholder:text-font-gray-04 disabled:cursor-not-allowed disabled:text-disabled disabled:placeholder:text-disabled"
                    {...field}
                    id={field.name}
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
                      'pointer-events-none absolute left-1/2 top-1/2 block h-full w-full -translate-x-1/2 -translate-y-1/2 touch-none select-none rounded-md border-[1px] border-brand-main duration-100 peer-placeholder-shown:border-line-medium peer-focus-visible:border-brand-main',
                    )}
                  />
                  <span className="absolute bottom-[14px] right-4 text-b3-kr-m text-font-gray-04">
                    {(field.value + '').length}/
                    {name === 'FIVE_LETTER_WORD' ? 5 : 50}
                  </span>
                </div>
              )}
            />
          </div>
        )}
        <div className="absolute bottom-0 flex w-full flex-col items-end justify-end bg-white py-2">
          {type !== 'SHORT_ANSWER' && (
            <InputLabel
              className="py-1 text-t4-kr-m"
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
                        'placeholder:text-muted peer flex w-full resize-none border-none bg-white text-b3-kr-m  outline-none  placeholder:text-font-gray-04 disabled:cursor-not-allowed disabled:text-disabled disabled:placeholder:text-disabled peer-focus-visible:border-brand-main                        ',
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
                        'pointer-events-none absolute left-1/2 top-1/2 block h-full w-full -translate-x-1/2 -translate-y-1/2 touch-none select-none rounded-md border-[1px] duration-100 peer-placeholder-shown:border-line-regular peer-focus-visible:border-brand-main',
                      )}
                    />
                    <span className="absolute bottom-[14px] right-4 text-b3-kr-m text-font-gray-04">
                      {field.value?.length}/50
                    </span>
                  </div>
                )}
              />
            </InputLabel>
          )}

          <div className="mb-4 flex w-full justify-center bg-white pt-5">
            <Button
              disabled={
                disabled ||
                (name === 'FIVE_LETTER_WORD'
                  ? answerWatch.toString().length !== 5
                  : type === 'RANK'
                    ? !Array.isArray(answerWatch) ||
                      Object.keys(form.formState.errors).length !== 0
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
    </FormProvider>
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

  return (
    <Inputbox
      variant="transparent"
      ref={ref}
      {...props}
      className={cn('h-6', props.className)}
    />
  )
}
