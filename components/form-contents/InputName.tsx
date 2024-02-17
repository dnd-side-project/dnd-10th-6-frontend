import { useFunnelContext } from '@/contexts/useFunnelContext'
import { Controller, useFormContext } from 'react-hook-form'
import Inputbox from '../inputbox'

const InputName = () => {
  const { toNextStep } = useFunnelContext()
  const { control } = useFormContext()

  return (
    <>
      <div>
        <span>이름을 입력해주세요</span>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Inputbox {...field} placeholder="이름을 입력해주세요" />
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
