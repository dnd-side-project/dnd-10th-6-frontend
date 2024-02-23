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
  onChange: (value: string) => void
}

const ComboboxDropdown = forwardRef<HTMLDivElement, CombocoxDropdownProps>(
  ({ options, placeholder, disabled, onChange }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<Option | null>(null)

    const handleOptionClick = (option: Option) => {
      setSelectedOption(option)
      setIsOpen(false)
      onChange(option.value)
    }

    return (
      <div ref={ref} className="relative" onBlur={() => setIsOpen(false)}>
        <div
          className={cn(
            'flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-[#E5E5EC] rounded-md shadow-sm ',
            'focus:outline-none focus:border-brand-main-green400 ',
            disabled &&
              'text-text-sub-gray99 bg-gray-gray50  cursor-not-allowed',
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
              'w-5 h-5 text-text-sub-gray76 duration-300 ease-in-out',
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
              className="absolute z-10 mt-1 w-full bg-white border border-[#E5E5EC] rounded-md shadow-lg"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {options.map((option, index) => (
                <motion.div
                  key={option.value}
                  className={cn(
                    'px-4 py-2 cursor-pointer select-none text-left',
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
