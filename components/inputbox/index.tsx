import { cn } from '@/lib/client/utils'
import React, { forwardRef } from 'react'

interface InputboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Inputbox = forwardRef<HTMLInputElement, InputboxProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        placeholder="디폴트"
        className={cn(
          'flex w-full font-base text-sm placeholder:text-muted focus-visible:outline-none disabled:cursor-not-allowed p-4 border-line-muted focus-visible:ring-1 focus-visible:ring-line border-[1px] disabled:text-disabled disabled:placeholder:text-disabled bg-transparent rounded-md duration-150',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

Inputbox.displayName = 'Inputbox'

export default Inputbox
