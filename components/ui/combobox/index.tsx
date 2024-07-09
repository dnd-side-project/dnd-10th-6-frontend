import { useState } from 'react'
import { cn } from '@/lib/client/utils'
import { forwardRef } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { motion, AnimatePresence } from 'framer-motion'

const comboBoxVariants = cva('round-md flex w-full items-center justify-between rounded-md border border-[#E5E5EC] bg-white px-4 py-[14px] text-left shadow-sm text-b2-kr-m focus:border-brand-main-green400 focus:outline-none', {
  variants: {
    variant: {
      default: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const variants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

interface Option {
  label: string
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
}

export const ComboboxDropdown = forwardRef<HTMLDivElement, ComboxDropdownProps>(
  (
    { options, placeholder, disabled, value, onChange, variant = 'default' },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<Option | null>(
      options.find((option) => option.value === value) ?? null,
    )

    const handleOptionClick = (option: Option) => {
      setSelectedOption(option)
      setIsOpen(false)
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
              'cursor-not-allowed bg-gray-gray50  text-text-sub-gray99',
            !disabled && 'hover:bg-gray-gray50',
            isOpen && 'text-b2-kr-sb border-brand-600',
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={cn(selectedOption && 'font-bold')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              'h-5 w-5 text-text-sub-gray76 duration-300 ease-in-out',
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
