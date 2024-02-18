import { useFunnelContext } from '@/contexts/useFunnelContext'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import Inputbox from '../inputbox'
import InputLabel from '../inputLabel'
import Button from '../button'
import { FormValues } from '@/pages/surveys/hooks/useSurveyForm'

const InputName = () => {
  const { toNextStep } = useFunnelContext()

  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>()

  const { name } = useWatch({ control })
  const isNameValid = !errors.name && name
  return (
    <div className="min-h-[100dvh] flex flex-col pb-[50px] px-5">
      <div className="flex-1 flex flex-col mt-4 ">
        <InputLabel label="이름">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Inputbox
                {...field}
                placeholder="이름을 입력해주세요"
                maxLength={6}
              />
            )}
          />
        </InputLabel>
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
        <p className="ml-2 mt-2 text-body3-medium text-text-sub-gray76">
          2-6자로 입력해주세요
        </p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-5 mb-4 bg-white flex justify-center">
        <Button onClick={toNextStep} disabled={!isNameValid}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default InputName
