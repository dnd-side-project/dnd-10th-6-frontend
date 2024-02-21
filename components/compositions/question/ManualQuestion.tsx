import Inputbox from '@/components/inputbox'

import { QsSchemaType } from '@/pages/surveys/hooks/useQuestionsForm'
import { QSMockDataType } from '@/pages/surveys/questions'

import { Controller, useFormContext } from 'react-hook-form'

interface ManualProps {
  data: QSMockDataType
  questionKey: string
  img: React.ReactNode
}

const ManualQuestion = ({ data, questionKey, img }: ManualProps) => {
  const { control } = useFormContext<QsSchemaType>()

  return (
    <div className="text-left">
      <div dangerouslySetInnerHTML={{ __html: data.title }}></div>
      <div className="flex flex-col mt-8 space-y-2">
        <Controller
          name={`${questionKey}`}
          defaultValue=""
          control={control}
          render={({ field }) => (
            <Inputbox
              {...field}
              placeholder="15글자 이내로 입력해주세요"
              maxLength={15}
              value={field.value + ''}
            />
          )}
        />
      </div>
      <div className=" w-full flex justify-end mt-8">{img}</div>
    </div>
  )
}

export default ManualQuestion
