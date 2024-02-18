import { useFunnelContext } from '@/contexts/useFunnelContext'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import Inputbox from '../inputbox'
import InputLabel from '../inputLabel'
import Button from '../button'
import { FormValues } from '@/pages/surveys/hooks/useSurveyForm'

const InputName = () => {
  const { toNextStep } = useFunnelContext()

  const { setValue, control } = useFormContext<FormValues>()
  const { name } = useWatch({ control })

  return (
    <div className="flex flex-col space-y-4 p-4">
      <InputLabel label="이름">
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Inputbox
              {...field}
              placeholder="이름을 입력해주세요"
              onChange={(e) => {
                setValue('name', e.target.value)
              }}
            />
          )}
        />
      </InputLabel>

      <Button onClick={toNextStep} disabled={!name}>
        다음
      </Button>
    </div>
  )
}

export default InputName
