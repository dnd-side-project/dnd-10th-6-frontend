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
    <div>
      <div>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <InputLabel label="이름을 입력해주세요">
              <Inputbox {...field} placeholder="이름을 입력해주세요" />
            </InputLabel>
          )}
        />

        <button onClick={toNextStep} type="button">
          Next
        </button>
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
