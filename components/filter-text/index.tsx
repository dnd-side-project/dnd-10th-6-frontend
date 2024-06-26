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
        'text-body1 whitespace-nowrap font-bold text-text-sub-gray76 transition-colors',
        'origin-center select-none transition-transform active:scale-95',
        props.className,
        active && 'text-text-main-black11',
      )}
    >
      {label}
    </button>
  )
}

export default FilterText
