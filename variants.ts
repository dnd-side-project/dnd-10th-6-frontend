import { MotionProps, Variants } from 'framer-motion'

type AnimationProps = Pick<
  MotionProps,
  'initial' | 'animate' | 'variants' | 'exit' | 'transition'
>

const fadeInVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
}

const drawerVariants: Variants = {
  initial: {
    opacity: 0,
    x: '100dvw',
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: '100dvw',
  },
}

export const fadeInProps: AnimationProps = {
  variants: fadeInVariants,
  animate: 'animate',
  initial: 'initial',
}
export const drawerInOutProps: AnimationProps = {
  variants: drawerVariants,
  animate: 'animate',
  initial: 'initial',
  exit: 'exit',
  transition: {
    type: 'tween',
    ease: 'circInOut',
  },
}
