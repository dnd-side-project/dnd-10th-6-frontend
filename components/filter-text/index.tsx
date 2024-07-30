import { cn } from '@/lib/client/utils'
import { HTMLAttributes } from 'react'

interface FilterTextProps extends HTMLAttributes<HTMLButtonElement> {
  active?: boolean
  label: string
}
const FilterText = ({ label, active = false, ...props }: FilterTextProps) => {
  return (
    <button
      onContextMenu={(event) => {
        event.preventDefault()
      }}
      draggable={false}
      onClick={props.onClick}
      className={cn(
        'whitespace-nowrap text-b1-kr-m text-font-gray-04 transition-colors',
        'origin-center select-none transition-transform active:scale-95',
        props.className,
        active && 'text-b1-kr-b text-black',
      )}
    >
      {label}
    </button>
  )
}

export default FilterText
