import ComboboxDropdown from '../../combobox'
import Button from '../../button'
import InputLabel from '../../inputLabel'
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
  useWatch,
} from 'react-hook-form'
import { FormValues } from '@/pages/surveys/hooks/useSurveyForm'
import FormLayout from '@/layout/form-layout'

const InputKnowing = () => {
  const { handleSubmit, trigger, control } = useFormContext<FormValues>()

  const { knowingPeriod, knowingRoute } = useWatch({ control })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
  }

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    console.log(errors)
  }

  return (
    <>
      <FormLayout
        title="정보입력"
        button={
          <Button
            onClick={handleSubmit(onSubmit, onError)}
            disabled={!knowingPeriod || !knowingRoute}
          >
            시작하기
          </Button>
        }
        content={
          <>
            <InputLabel className="text-body1-bold" label="알게 된 기간">
              <Controller
                control={control}
                name="knowingPeriod"
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
                      trigger('knowingPeriod')
                    }}
                  />
                )}
              />
            </InputLabel>
            <div className="mt-4">
              <InputLabel className="text-body1-bold" label="알게 된 경로">
                <Controller
                  control={control}
                  name="knowingRoute"
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
                        { label: '대학교', value: 'university'.toUpperCase() },
                        { label: '직장', value: 'work'.toUpperCase() },
                        { label: '친목모임', value: 'social'.toUpperCase() },
                        { label: '기타', value: 'etc'.toUpperCase() },
                      ]}
                      {...field}
                      onChange={(value) => {
                        field.onChange(value)
                        trigger('knowingRoute')
                      }}
                    />
                  )}
                />
              </InputLabel>
            </div>
          </>
        }
      />
    </>
  )
}

export default InputKnowing
