import Button from '@/components/button'
import InputLabel from '@/components/inputLabel'
import Inputbox from '@/components/inputbox'
import ProgressBar, { ProgressBarProps } from '@/components/progressbar'

import RadioButton from '@/components/radioButton'
import { useFunnelContext } from '@/contexts/useFunnelContext'
import FormLayout from '@/layout/form-layout'
import { QsSchemaType } from '@/pages/surveys/hooks/useQuestionsForm'
import { QSMockDataType } from '@/pages/surveys/questions'

import { Controller, useFormContext, useWatch } from 'react-hook-form'

const First = ({
  data,
  progress,
}: {
  data: QSMockDataType
  progress: ProgressBarProps
}) => {
  const { toNextStep } = useFunnelContext()
  const { trigger, control } = useFormContext<QsSchemaType>()

  const { firstQuestion, firstReason } = useWatch({ control })

  const isDisabled = !firstQuestion || !firstReason

  return (
    <>
      <FormLayout
        title={
          <span className="text-body1-bold text-brand-main-green400">{`${progress.current}/${progress.max}`}</span>
        }
        button={
          <Button disabled={isDisabled} onClick={toNextStep} className="w-full">
            다음
          </Button>
        }
        content={
          <>
            <ProgressBar {...progress} />
            <div className="text-left">
              <div
                dangerouslySetInnerHTML={{
                  __html: data.title,
                }}
              ></div>
              <div className="flex flex-col mt-8 space-y-2">
                {data.options.map((option) => (
                  <Controller
                    key={option.id}
                    name="firstQuestion"
                    control={control}
                    render={({ field }) => (
                      <RadioButton
                        {...field}
                        id={option.id}
                        value={option.value + ''}
                        label={option.text}
                        selected={firstQuestion === option.value || false}
                        onChange={(e) => {
                          field.onChange(e.target.value)
                          trigger('firstQuestion')
                        }}
                      />
                    )}
                  />
                ))}
              </div>
              <div className="mt-44 py-2">
                <InputLabel
                  className="text-sub2-medium"
                  label="이유를 말해주세요"
                  required
                >
                  <Controller
                    control={control}
                    name="firstReason"
                    render={({ field }) => (
                      <Inputbox
                        {...field}
                        placeholder="15글자 이내로 입력해주세요"
                        maxLength={15}
                      />
                    )}
                  />
                </InputLabel>
              </div>
            </div>
          </>
        }
      />
    </>
  )
}

export default First
