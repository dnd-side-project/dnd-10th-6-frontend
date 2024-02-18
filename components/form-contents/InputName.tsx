import { useFunnelContext } from '@/contexts/useFunnelContext'
import { Controller, useFormContext } from 'react-hook-form'
import Inputbox from '../inputbox'
import InputLabel from '../inputLabel'

const InputName = () => {
  const { toNextStep } = useFunnelContext()
  const { control } = useFormContext()

  return (
    <>
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
    </>
  )
}

export default InputName
