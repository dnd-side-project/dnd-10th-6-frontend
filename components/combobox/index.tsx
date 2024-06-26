import { useState } from 'react'
import { cn } from '@/lib/client/utils'
import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

interface Option {
  label: string
  value: string
}

interface CombocoxDropdownProps {
  options: Option[]
  placeholder: string
  name: string
  disabled?: boolean
  value: string
  onChange: (value: Option) => void
}

const ComboboxDropdown = forwardRef<HTMLDivElement, CombocoxDropdownProps>(
  ({ options, placeholder, disabled, value, onChange }, ref) => {
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
      <div ref={ref} className="relative" onBlur={() => setIsOpen(false)}>
        <div
          className={cn(
            'flex w-full items-center justify-between rounded-md border border-[#E5E5EC] bg-white px-4 py-2 text-left shadow-sm ',
            'focus:border-brand-main-green400 focus:outline-none ',
            disabled &&
              'cursor-not-allowed bg-gray-gray50  text-text-sub-gray99',
            !disabled && 'hover:bg-gray-gray50',
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={cn(selectedOption && 'font-bold')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={cn(
              'h-5 w-5 text-text-sub-gray76 duration-300 ease-in-out',
              isOpen && 'rotate-180',
            )}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
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
export default ComboboxDropdown
