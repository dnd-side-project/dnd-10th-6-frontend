import React, { useEffect } from 'react'
import { motion, useAnimate } from 'framer-motion'
import { cn } from '@/lib/client/utils'
import { fadeInProps } from '@/variants'

interface FilterButtonProps {
  selected?: boolean
  label: string
  onClick?: () => void
}

const FilterButton = ({
  label,
  onClick,
  selected = false,
}: FilterButtonProps) => {
  const [ref, animate] = useAnimate<HTMLButtonElement>()

  useEffect(() => {
    animate(
      ref.current,
      selected
        ? {
            backgroundColor: '#111111',
            color: '#FFFFFF',
          }
        : {
            backgroundColor: '#FAFAFA',
            color: '#505050',
          },
      {
        duration: 0.2,
        type: 'tween',
        ease: 'backInOut',
      },
    )
  }, [animate, ref, selected])

  return (
    <motion.button
      ref={ref}
      onContextMenu={(event) => {
        event.preventDefault()
      }}
      onClick={onClick}
      draggable={false}
      variants={fadeInProps.variants}
      className={cn(
        'avoid-min-w h-9 whitespace-nowrap rounded-full px-3 text-but5-m ',
        'origin-center select-none',
        selected && 'text-white ',
      )}
      style={{ fontSize: '12px' }}
    >
      {label}
    </motion.button>
  )
}

export default FilterButton
