import { MotionProps, Variants } from 'framer-motion'

type AnimationProps = Pick<MotionProps, 'initial' | 'animate' | 'variants'>

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

export const fadeInProps: AnimationProps = {
  variants: fadeInVariants,
  animate: 'animate',
  initial: 'initial',
}
