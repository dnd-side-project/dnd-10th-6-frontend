import { VariantProps, cva } from 'class-variance-authority'
import { ButtonHTMLAttributes, forwardRef } from 'react'

const buttonVariants = cva(
  'flex w-full h-11 items-center justify-center font-semibold disabled:cursor-not-allowed disabled:opacity-50 disabled:text-disabled disabled:placeholder-text-disabled disabled:bg-gray-200 disabled:border-gray-200 disabled:ring-gray-200 disabled:ring-opacity-50 disabled:ring-1 disabled:shadow-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400 focus-visible:ring-opacity-50 focus-visible:ring-offset-1 duration-150',
  {
    variants: {
      variant: {
        primary:
          'text-white bg-green-500 hover:bg-green-600 active:bg-green-800 focus-visible:ring-green-400 focus-visible:ring-offset-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white border-[1px] border-transparent shadow-sm',
        secondary:
          'text-white-500 bg-gray-gray100  hover:bg-gray-200 active:bg-gray-200 focus-visible:ring-gray-200 focus-visible:ring-offset-gray-200 focus-visible:ring-offset-2',
        muted:
          'bg-gray-gray100 text-text-sub-gray4f hover:bg-text-main-whiteFF hover:border-gray-300 hover:text-text-main-black11 active:border-line-medium active:bg-gray-gray100 active:text-text-main-black11 disabled:bg-text-main-whiteFF disabled:border-line-soft ',
        kakao:
          'bg-brand-sub1-yellow500 h-[52px] hover:bg-main-sub1-yellow-yellow600 active:bg-main-sub1-yellow-yellow800',
        confirm:
          'bg-text-main-whiteFF border-line-medium text-brand-sub1-blue600 border-line-medium text-body3-medium',
        default:
          'bg-gray-gray50 !font-medium text-body1-medium text-text-sub-gray4f hover:bg-gray-gray100 active:bg-gray-gray200 focus-visible:bg-gray-gray200 disabled:text-text-sub-gray99',
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
