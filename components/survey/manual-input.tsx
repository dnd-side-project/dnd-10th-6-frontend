import { QuestionType } from '@/model/question.entity'
import React, { HTMLAttributes, forwardRef, useState } from 'react'
interface ManualInputProps
  extends Omit<HTMLAttributes<HTMLInputElement>, 'ref'> {
  qsType: QuestionType
}
const ManualInput = forwardRef<HTMLInputElement, ManualInputProps>(
  ({ qsType, ...rest }, ref) => {
    const inputType = qsType === 'NUMERIC_CHOICE' ? 'number' : 'string'
    const [value, setValue] = useState('')
    return (
      <div>
        <input
          ref={ref}
          value={value}
          type={inputType}
          onChange={(e) => {
            console.log(rest)
            // setValue(e.target.value)
            rest?.onChange?.(e)
          }}
        />
        <input className="hidden" {...rest} />
      </div>
    )
  },
)

export default ManualInput
