import { useFunnelContext } from '@/contexts/useFunnelContext'
import { useFormContext, useWatch } from 'react-hook-form'
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
          placeholder="알게 된 경로를 선택해주세요"
          options={[
            { label: '친구 추천', value: '친구 추천' },
            { label: '인터넷 검색', value: '인터넷 검색' },
            { label: '기타', value: '기타' },
          ]}
          onSelect={(value) => {
            console.log(value)
          }}
        />

        <span>언제 알게 되셨나요?</span>
        <ComboboxDropdown
          placeholder="언제 알게 되셨나요?"
          options={[
            { label: '1주일 전', value: '1주일 전' },
            { label: '1개월 전', value: '1개월 전' },
            { label: '3개월 전', value: '3개월 전' },
            { label: '6개월 전', value: '6개월 전' },
            { label: '1년 전', value: '1년 전' },
            { label: '기타', value: '기타' },
          ]}
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
