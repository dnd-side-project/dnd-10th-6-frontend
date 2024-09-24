import { Variants } from 'framer-motion'

const fadeInOutVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}
const fadeInOutWithScaleVariants: Variants = {
  initial: {
    ...fadeInOutVariants.initial,
    scale: 0,
  },
  animate: {
    ...fadeInOutVariants.animate,
    scale: 1,
  },
  exit: {
    ...fadeInOutVariants.exit,
    opacity: 0,
  },
}

export const fadeInOutProps = {
  variants: fadeInOutVariants,
  ...fadeInOutVariants,
}
export const fadeInOutWithScaleProps = {
  variants: fadeInOutWithScaleVariants,
  ...fadeInOutWithScaleVariants,
  transition: {
    damping: 2,
  },
}
