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
        'whitespace-pre-wrap rounded-md bg-bg-gray1 px-2 py-4 text-body3-medium text-text-sub-gray76',
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
