import { ReactNode, useState } from 'react'
import { forwardRef } from 'react'
import { cn } from '@/lib/client/utils'

import { cva, VariantProps } from 'class-variance-authority'
import { motion, AnimatePresence } from 'framer-motion'

const comboBoxVariants = cva(
  'round-md flex w-full items-center rounded-md border border-[#E5E5EC] bg-white px-4 py-[14px] text-left shadow-sm text-b2-kr-m focus:border-brand-main-green400 focus:outline-none',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const variants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

interface Option {
  label: string | ReactNode
  value: string
}

interface ComboxDropdownProps extends VariantProps<typeof comboBoxVariants> {
  options: Option[]
  placeholder: string
  name: string
  disabled?: boolean
  value: string
  onChange: (value: Option) => void
  variant?: 'default'
  prefix?: ReactNode
  suffix?: ReactNode
  controlled?: boolean
}

export const ComboboxDropdown = forwardRef<HTMLDivElement, ComboxDropdownProps>(
  (
    {
      options,
      placeholder,
      disabled,
      value,
      onChange,
      prefix,
      suffix,
      variant = 'default',
      controlled = false,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<Option | null>(
      options.find((option) => option.value === value) ?? null,
    )

    const handleOptionClick = (option: Option) => {
      setIsOpen(false)
      if (!controlled) {
        setSelectedOption(option)
      }
      onChange(option)
    }

    return (
      <div
        ref={ref}
        className="relative w-full"
        onBlur={() => setIsOpen(false)}
      >
        <div
          className={cn(
            comboBoxVariants({ variant }),

            disabled &&
              'bg-gray-gray50 cursor-not-allowed  text-text-sub-gray99',
            !disabled && 'hover:bg-gray-gray50',
            isOpen && 'border-brand-600 text-b2-kr-m',
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {prefix}

          <span className={cn(selectedOption && 'font-bold')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {suffix}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              'ml-auto h-5 w-5 text-text-sub-gray76 duration-300 ease-in-out',
              isOpen && 'rotate-180',
            )}
          >
            <path
              d="M13.3334 5.33317L8.00008 10.6665L2.66675 5.33317"
              stroke="#111111"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute z-10 mt-1 w-full rounded-md border border-[#E5E5EC] bg-white shadow-lg"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {options.map((option, index) => (
                <motion.div
                  key={option.value}
                  className={cn(
                    'cursor-pointer select-none px-4 py-2 text-left',
                    index === options.length - 1 ? 'rounded-b-md' : '',
                    selectedOption?.value === option.value && 'font-bold',
                    !disabled && 'hover:bg-gray-gray50',
                  )}
                  onClick={() => handleOptionClick(option)}
                  variants={variants}
                >
                  {option.label}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  },
)

ComboboxDropdown.displayName = 'ComboboxDropdown'
