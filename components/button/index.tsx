import { VariantProps, cva } from 'class-variance-authority'
import { ButtonHTMLAttributes, forwardRef } from 'react'

const buttonVariants = cva(
  'flex w-full h-12 items-center justify-center font-semibold disabled:cursor-not-allowed disabled:opacity-50 disabled:text-disabled disabled:placeholder-text-disabled disabled:bg-gray-200 disabled:border-gray-200 disabled:ring-gray-200 disabled:ring-opacity-50 disabled:ring-1 disabled:shadow-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400 focus-visible:ring-opacity-50 focus-visible:ring-offset-1 focus-visible:ring-offset-white border-[1px] border-transparent shadow-sm duration-150',
  {
    variants: {
      variant: {
        primary: 'bg-green-400 text-white',
        secondary: 'bg-gray-200 text-gray-700',
      },

      rounded: {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
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

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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

export default Button
