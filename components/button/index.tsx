import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        className={cn(
          'flex w-full bg-green-400 text-white items-center justify-center rounded-md font-bold text-sm h-12 disabled:cursor-not-allowed disabled:opacity-50 disabled:text-disabled disabled:placeholder-text-disabled disabled:bg-gray-200 disabled:border-gray-200 disabled:ring-gray-200 disabled:ring-opacity-50 disabled:ring-1 disabled:shadow-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400 focus-visible:ring-opacity-50 focus-visible:ring-offset-1 focus-visible:ring-offset-white border-[1px] border-transparent shadow-sm duration-150',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  },
)

export default Button
