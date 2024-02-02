import { VariantProps, cva } from 'class-variance-authority'
import { HTMLAttributes, forwardRef } from 'react'

const typographyVariants = cva('font-normal ', {
  variants: {
    hierarchy: {
      mainTitle1: 'text-[28px] leading-[135.714%]',
      mainTitle2: 'text-[24px] leading-[141.667%%]',
      subTitle1: 'text-[20px] leading-[140%]',
      subTitle2: 'text-[16px] leading-[144.444%]',
      body1: 'text-[16px] leading-[150%]',
      body2: 'text-[15px] leading-[146.667%]',
      body3: 'text-[14px] leading-[142.857%]',
      caption1: 'text-[12px] leading-[150%]',
    },
  },
})

interface TypographyProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType | string
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ className, hierarchy, as: Component = 'p', ...props }, ref) => {
    return (
      <Component
        className={typographyVariants({ hierarchy, className })}
        ref={ref}
        {...props}
      />
    )
  },
)
Typography.displayName = 'Typography'
