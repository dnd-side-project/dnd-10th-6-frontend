import { useFunnelContext } from '@/contexts/useFunnelContext'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import Inputbox from '../../inputbox'
import InputLabel from '../../inputLabel'
import Button from '../../button'
import { FormValues } from '@/hooks/useSurveyForm'
import FormLayout from '@/layout/form-layout'
import { cn } from '@/lib/client/utils'

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
            <p
              className={cn(
                'text-body3-medium duration-150 pl-2',
                errors.name && '!text-inputbox-color-alert',
                'text-sub-gray76 text-body3-medium',
              )}
              style={{ color: '#767676' }}
            >
              2~6자로 입력해주세요.
            </p>
          </InputLabel>
          <div className="py-4 px-5 bg-gray-gray50 rounded-md flex space-x-3">
            <svg
              className="shrink-0 my-[2px]"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="8" cy="8" r="8" fill="#4F4F4F" />
              <path d="M9 3H7V9H9V3Z" fill="#F7F7F7" />
              <path d="M9 11H7V13H9V11Z" fill="#F7F7F7" />
            </svg>
            <p className="text-body3-medium text-text-sub-gray76">
              친구들이 원활하게 작성할 수 있도록, 나를 가장 잘 나타내는 이름으로
              입력해주세요
            </p>
          </div>
        </>
      }
    />
  )
}

export default InputName
