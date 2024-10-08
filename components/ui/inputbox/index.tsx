import React, { ComponentPropsWithoutRef, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/client/utils'

const inputVariants = cva(
  'px-4 py-3 flex w-full border-[1px] bg-transparent px-4 py-[14px] text-b2-kr-m outline-none duration-100 placeholder-shown:border-line-medium focus-visible:border-brand-600 disabled:cursor-not-allowed disabled:text-disabled disabled:placeholder:text-font-gray-disabled hover:bg-bg-light disabled:bg-bg-light rounded-md',
  {
    variants: {
      variant: {
        default: '',
        transparent:
          'border-none bg-transparent py-0 focus-within:bg-transparent hover:bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface InputboxProps
  extends VariantProps<typeof inputVariants>,
    ComponentPropsWithoutRef<'input'> {
  variant?: 'default' | 'transparent'
}

const Inputbox = forwardRef<HTMLInputElement, InputboxProps>(
  ({ className, type, variant = 'default', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    )
  },
)

Inputbox.displayName = 'Inputbox'

export { Inputbox }
