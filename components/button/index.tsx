import { VariantProps, cva } from 'class-variance-authority'
import { ButtonHTMLAttributes, forwardRef } from 'react'

const buttonVariants = cva(
  'flex w-full h-12 items-center justify-center font-semibold disabled:cursor-not-allowed disabled:opacity-50 disabled:text-disabled disabled:placeholder-text-disabled disabled:bg-gray-200 disabled:border-gray-200 disabled:ring-gray-200 disabled:ring-opacity-50 disabled:ring-1 disabled:shadow-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400 focus-visible:ring-opacity-50 focus-visible:ring-offset-1 duration-150',
  {
    variants: {
      variant: {
        primary:
          'text-white bg-green-500 hover:bg-green-600 active:bg-green-800 focus-visible:ring-green-400 focus-visible:ring-offset-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white border-[1px] border-transparent shadow-sm',
        secondary:
          'text-white-500 bg-gray-300 hover:bg-gray-200 active:bg-gray-200 focus-visible:ring-gray-200 focus-visible:ring-offset-gray-200 focus-visible:ring-offset-2',
        muted:
          'bg-text-main-whiteFF border-line-medium border text-text-main-black11 hover:bg-text-main-whiteFF hover:border-gray-300 hover:text-text-main-black11 active:border-line-medium active:bg-gray-gray100 active:text-text-main-black11 disabled:bg-text-main-whiteFF disabled:border-line-soft',
      },

      rounded: {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      rounded: 'md',
    },
  },
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant, rounded, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({
          variant,
          rounded,
          className,
        })}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
export default Button
