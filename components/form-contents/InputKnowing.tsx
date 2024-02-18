import ComboboxDropdown from '../combobox'
import Button from '../button'
import InputLabel from '../inputLabel'
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
  useWatch,
} from 'react-hook-form'
import { FormValues } from '@/pages/surveys/hooks/useSurveyForm'

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
      <div className="min-h-[100dvh] flex flex-col pb-[50px] px-5">
        <div className="flex-1 flex flex-col mt-4 space-y-4">
          <InputLabel label="알게 된 기간">
            <Controller
              control={control}
              name="knowingPeriod"
              render={({ field }) => (
                <ComboboxDropdown
                  placeholder="알게 된 기간을 선택해주세요"
                  options={[
                    { label: '6개월미만', value: 'six_months' },
                    { label: '6개월 - 1년미만', value: 'one_year' },
                    { label: '1년 - 4년미만', value: 'four_years' },
                    { label: '4년이상', value: 'infinite' },
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
          <InputLabel label="알게 된 경로">
            <Controller
              control={control}
              name="knowingRoute"
              render={({ field }) => (
                <ComboboxDropdown
                  placeholder="알게 된 경로를 선택해주세요"
                  options={[
                    { label: '초등학교', value: 'elementary_school' },
                    { label: '중·고등학교', value: 'middle_and_high_school' },
                    { label: '대학교', value: 'university' },
                    { label: '직장', value: 'work' },
                    { label: '친목모임', value: 'social' },
                    { label: '기타', value: 'etc' },
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
        <div className="fixed bottom-0 left-0 right-0 p-5 mb-4 bg-white flex justify-center">
          <Button
            onClick={handleSubmit(onSubmit, onError)}
            disabled={!knowingPeriod || !knowingRoute}
          >
            시작하기
          </Button>
        </div>
      </div>
    </>
  )
}

export default InputKnowing
