import { cn } from '@/lib/client/utils'
import { InputHTMLAttributes, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { fadeInProps } from '@/variants'
interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  selected: boolean
  disabled?: boolean
  className?: string
  name: string
  value: string
  children?: React.ReactNode
}

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      label,
      id,
      className,
      children,
      name,
      value,
      selected,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <motion.div
        {...fadeInProps}
        transition={{
          delay: 0.2,
          duration: 0.3,
        }}
        className={cn(
          'flex w-full items-center justify-start rounded-md border border-[#E5E5EC] p-4 transition-all duration-200 ',
          'focus-within:border-brand-main',
          'disabled:cursor-not-allowed disabled:opacity-50',
          selected && 'border border-brand-main bg-main-green-green50',
        )}
      >
        <input
          id={id}
          name={name}
          value={value}
          type="radio"
          ref={ref}
          disabled={disabled}
          className="hidden"
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            'flex items-center',
            'cursor-pointer',
            'text-sm font-medium text-gray-700 transition-all duration-200',
            'w-full pl-2',
            disabled && 'cursor-not-allowed opacity-50',
            selected && 'font-bold',
            className,
          )}
        >
          <div
            className={cn(
              'h-4 w-4 rounded-full border border-[#E5E5EC] bg-white transition-all duration-200 ',
              'hover:border-brand-400',
              selected && 'border-4 border-brand-400',
            )}
          ></div>
          <span className="ml-2">{label}</span>
          {children}
        </label>
      </motion.div>
    )
  },
)

RadioButton.displayName = 'RadioButton'
export default RadioButton
