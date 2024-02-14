import { useState } from 'react'
import { cn } from '@/lib/utils'

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
        <span className="font-bold">
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
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={cn(
                'px-4 py-2 cursor-pointer select-none',
                index === options.length - 1 ? 'rounded-b-md' : '',
                selectedOption === option && 'font-bold',
                !disabled && 'hover:bg-gray-gray50',
              )}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ComboboxDropdown
