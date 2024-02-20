import Button from '@/components/button'
import InputLabel from '@/components/inputLabel'
import Inputbox from '@/components/inputbox'
import RadioButton from '@/components/radioButton'
import FormLayout from '@/layout/form-layout'
import { QsSchemaType } from '@/pages/surveys/hooks/useQuestionsForm'

import { Controller, useFormContext, useWatch } from 'react-hook-form'

const Third = ({ data }) => {
  const { toNextStep } = useFunnelContext()
  const { trigger, control } = useFormContext<QsSchemaType>()

  const { thirdQuestion, thirdReason } = useWatch({ control })

  const isDisabled = !thirdQuestion || !thirdReason

  return (
    <>
      <FormLayout
        title="1/2" //프로그래스바
        button={
          <Button disabled={isDisabled} onClick={toNextStep} className="w-full">
            다음
          </Button>
        }
        content={
          <>
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
                    name="thirdQuestion"
                    control={control}
                    render={({ field }) => (
                      <RadioButton
                        {...field}
                        id={option.id}
                        value={option.value}
                        label={option.text}
                        selected={thirdQuestion === option.value || false}
                        onChange={(e) => {
                          field.onChange(e.target.value)
                          trigger('thirdReason')
                        }}
                      />
                    )}
                  />
                ))}
              </div>
              <div className="mt-60">
                <InputLabel
                  className="text-sub2-medium"
                  label="이유를 말해주세요"
                  required
                >
                  <Controller
                    control={control}
                    name="thirdReason"
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

export default Third
