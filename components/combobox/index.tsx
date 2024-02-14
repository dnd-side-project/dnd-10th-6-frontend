import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.05,
      type: 'spring',
      stiffness: 500,
      damping: 30,
    },
  },
  closed: {
    opacity: 0,
    y: -10,
    transition: {
      staggerChildren: 0.05,
      type: 'spring',
      stiffness: 500,
      damping: 30,
    },
  },
}

interface ComboboxDropdownProps {
  options: string[]
  onSelect: (selectedOption: string) => void
  disabled?: boolean
  className?: string
}

const ComboboxDropdown: React.FC<ComboboxDropdownProps> = ({
  options,
  onSelect,
  disabled = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
    onSelect(option)
    setIsOpen(false)
  }

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-[#E5E5EC] rounded-md shadow-sm ',
          'focus:outline-none focus:border-brand-main-green400',
          disabled && 'text-text-sub-gray99 bg-gray-gray50  cursor-not-allowed',
          !disabled && 'hover:bg-gray-gray50',
        )}
        disabled={disabled}
      >
        <span className={cn(selectedOption && 'font-bold')}>
          {selectedOption || 'Select an option'}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-text-sub-gray76"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            key="options"
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg"
          >
            {options.map((option, index) => (
              <motion.li
                key={index}
                onClick={() => handleOptionClick(option)}
                className={cn(
                  'px-4 py-2 cursor-pointer select-none',
                  index === options.length - 1 ? 'rounded-b-md' : '',
                  selectedOption === option && 'font-bold',
                  !disabled && 'hover:bg-gray-gray50',
                )}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.3,
                  ease: 'easeInOut',
                  type: 'spring',
                  stiffness: 500,
                  damping: 20,
                }}
              >
                {option}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ComboboxDropdown
