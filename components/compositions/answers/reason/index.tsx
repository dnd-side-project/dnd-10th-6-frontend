import { cn } from '@/lib/client/utils'
import React, { ComponentPropsWithoutRef, Fragment } from 'react'

interface ReasonProps extends ComponentPropsWithoutRef<'div'> {
  reason: string
}
const Reason = ({ reason, ...rest }: ReasonProps) => {
  return (
    <div
      {...rest}
      className={cn(
        'text-body3-medium bg-bg-gray1 text-text-sub-gray76 px-2 py-4 rounded-md whitespace-pre-wrap',
        rest.className,
      )}
    >
      {reason.split('\n').map((line, index, arr) => {
        return (
          <Fragment key={line + index + arr.length}>
            {line}
            {index !== arr.length - 1 && <br />}
          </Fragment>
        )
      })}
    </div>
  )
}

export default Reason
