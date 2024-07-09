import { cn } from '@/lib/client/utils'
import React, { HTMLAttributes } from 'react'

//!DELETE
interface BadgeProps extends HTMLAttributes<HTMLButtonElement> {
  title: string
  scroll?: boolean
  replace?: boolean
  prefetch?: boolean
}

export const Badge = ({ title, ...rest }: BadgeProps) => {
  return (
    <button
      {...rest}
      onContextMenu={(event) => {
        event.preventDefault()
      }}
      className={cn(
        'h-14 rounded-full border border-line-medium',
        'avoid-min-w flex w-fit grow select-none items-center whitespace-nowrap px-5 duration-150 ease-easeOutQuint',
        'active:border-gray-gray800 active:bg-gray-gray100 active:scale-[0.98]',
        rest.className,
      )}
    >
      {title}
      <svg
        className="ml-2 "
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="fill-text-sub-gray76"
          d="M3 7.5C2.72386 7.5 2.5 7.72386 2.5 8C2.5 8.27614 2.72386 8.5 3 8.5V7.5ZM13.3536 8.35355C13.5488 8.15829 13.5488 7.84171 13.3536 7.64645L10.1716 4.46447C9.97631 4.2692 9.65973 4.2692 9.46447 4.46447C9.2692 4.65973 9.2692 4.97631 9.46447 5.17157L12.2929 8L9.46447 10.8284C9.2692 11.0237 9.2692 11.3403 9.46447 11.5355C9.65973 11.7308 9.97631 11.7308 10.1716 11.5355L13.3536 8.35355ZM3 8.5H13V7.5H3V8.5Z"
          fill="currentColor"
        />
      </svg>
    </button>
  )
}
