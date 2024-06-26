import React, { useEffect } from 'react'
import { motion, useAnimate } from 'framer-motion'
import { fadeInProps } from '@/variants'
import { cn } from '@/lib/client/utils'

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
            color: '#000000',
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
        'avoid-min-w h-9 whitespace-nowrap rounded-full px-3 text-caption2-medium',
        'origin-center select-none',
        selected && 'text-text-main-whiteFF ',
      )}
      style={{ fontSize: '12px' }}
    >
      {label}
    </motion.button>
  )
}

export default FilterButton
