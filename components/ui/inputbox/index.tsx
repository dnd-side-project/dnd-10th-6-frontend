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
          'flex w-full rounded-md border-[1px] border-brand-main-green400 bg-transparent px-4 py-[14px] text-body1-medium outline-none duration-100 placeholder:text-muted placeholder:text-text-sub-gray4f placeholder-shown:border-line-medium focus-visible:border-brand-main-green400 disabled:cursor-not-allowed disabled:text-disabled disabled:placeholder:text-disabled',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

Inputbox.displayName = 'Inputbox'

export { Inputbox }
