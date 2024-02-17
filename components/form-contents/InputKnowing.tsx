import { useFunnelContext } from '@/contexts/useFunnelContext'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import ComboboxDropdown from '../combobox'

const InputKnowing = () => {
  const { toNextStep } = useFunnelContext()
  const { control } = useFormContext()
  const { name } = useWatch({ control })

  return (
    <>
      <div>
        <span>안녕하세요 {name}님</span>
        <span>어떻게 알게 되셨나요?</span>
        <ComboboxDropdown
          options={['친구/지인', '인터넷 검색', '기타']}
          onSelect={(value) => {
            console.log(value)
          }}
        />

        <span>언제 알게 되셨나요?</span>
        <ComboboxDropdown
          options={['1년 이내', '1년 이상']}
          onSelect={(value) => {
            console.log(value)
          }}
        />

        <button onClick={toNextStep} type="button">
          Next
        </button>
      </div>
    </>
  )
}

export default InputKnowing
