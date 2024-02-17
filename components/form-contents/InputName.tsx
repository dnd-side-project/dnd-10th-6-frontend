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
        <InputLabel label="이름을 입력해주세요">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Inputbox {...field} placeholder="이름을 입력해주세요" />
            )}
          />
          <p className="text-body3-medium text-text-sub-gray99 mt-1">
            2-6자로 입력해주세요
          </p>
        </InputLabel>

        <button onClick={toNextStep} type="button">
          Next
        </button>
      </div>
    </>
  )
}

export default InputName
