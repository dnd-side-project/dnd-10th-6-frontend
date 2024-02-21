import { useFunnelContext } from '@/contexts/useFunnelContext'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import Inputbox from '../../inputbox'
import InputLabel from '../../inputLabel'
import Button from '../../button'
import { FormValues } from '@/hooks/useSurveyForm'
import FormLayout from '@/layout/form-layout'

const InputName = () => {
  const { toNextStep } = useFunnelContext()

  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>()

  const { name } = useWatch({ control })
  const isNameValid = !errors.name && name
  return (
    <FormLayout
      title="정보입력"
      button={
        <Button disabled={!isNameValid} onClick={toNextStep} className="w-full">
          다음
        </Button>
      }
      content={
        <>
          <InputLabel className="text-body1-bold" label="이름">
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
        </>
      }
    />
  )
}

export default InputName
