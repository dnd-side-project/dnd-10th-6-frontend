import InputLabel from '@/components/inputLabel'
import Inputbox from '@/components/inputbox'
import RadioButton from '@/components/radioButton'

import { QsSchemaType } from '@/hooks/useQuestionsForm'
import { QSMockDataType } from '@/pages/surveys/questions'

import { Controller, useFormContext } from 'react-hook-form'

interface OXProps {
  data: QSMockDataType
  questionKey: string
}

const OXQuestion = ({ data, questionKey }: OXProps) => {
  const { control } = useFormContext<QsSchemaType>()

  return (
    <div className="text-left grow flex flex-col space-y-8">
      <div dangerouslySetInnerHTML={{ __html: data.title }}></div>
      <div className="flex flex-col space-y-2">
        {data.options.map((option) => (
          <Controller
            key={option.id}
            name={`${questionKey}`}
            defaultValue=""
            control={control}
            render={({ field }) => (
              <RadioButton
                {...field}
                id={option.id}
                value={option.value + ''}
                label={option.text}
                selected={field.value === option.value + ''}
                onChange={(e) => {
                  field.onChange(e.target.value)
                }}
              />
            )}
          />
        ))}
      </div>
      <div className="mt-8 flex grow flex-col justify-end">
        <InputLabel
          className="text-sub2-medium"
          label="이유를 말해주세요"
          required
        >
          <Controller
            control={control}
            defaultValue=""
            name={`${questionKey}Reason`}
            render={({ field }) => (
              <Inputbox
                {...field}
                placeholder="15글자 이내로 입력해주세요"
                maxLength={15}
                value={field.value + ''}
              />
            )}
          />
        </InputLabel>
      </div>
    </div>
  )
}

export default OXQuestion
