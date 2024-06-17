import ComboboxDropdown from '../../combobox'
import Button from '../../button'
import InputLabel from '../../inputLabel'
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
  useWatch,
} from 'react-hook-form'
import { FormValues } from '@/hooks/use-survey-form'
import FormLayout from '@/layout/form-layout'

const InputKnowing = () => {
  const { handleSubmit, trigger, control } = useFormContext<FormValues>()

  const { knowingPeriod, knowingRoute } = useWatch({ control })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
  }

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    console.log(errors)
  }

  return (
    <>
      <FormLayout
        title="정보입력"
        button={
          <Button
            onClick={handleSubmit(onSubmit, onError)}
            disabled={!knowingPeriod || !knowingRoute}
          >
            시작하기
          </Button>
        }
        content={<></>}
      />
    </>
  )
}

export default InputKnowing
