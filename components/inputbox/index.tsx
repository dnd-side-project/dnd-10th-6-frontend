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
          'flex w-full placeholder:text-muted placeholder:text-text-sub-gray4f disabled:cursor-not-allowed py-[14px] px-4 text-body1-medium border-[1px] outline-none border-brand-main-green400 focus-visible:border-brand-main-green400 placeholder-shown:border-line-medium disabled:text-disabled disabled:placeholder:text-disabled bg-transparent rounded-md duration-100',
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
