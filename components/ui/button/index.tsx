import { cn } from '@/lib/client/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { forwardRef } from 'react'
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'
import { fadeInOutProps } from '@/constants/variants'

const buttonVariants = cva(
  'font-pretendard duration-300 text-but1-sb disabled:cursor-not-allowed disabled:bg-bg-regular disabled:text-font-gray-05 origin-center active:scale-[0.985] hover:scale-[1.01] py-4',
  {
    variants: {
      variant: {
        'BG-brand':
          'hover:bg-brand-500 active:bg-brand-400 text-font-white bg-brand-600',
        'BG-accent':
          'bg-black text-font-white hover:bg-black-800 active:bg-black-700',
        'BG-neutral':
          'hover:bg-gray-300 active:bg-gray-200 bg-bg-regular text-font-black',
        'Line-brand':
          'border-[1px] border-brand-600 text-brand-600 hover:bg-[#EEFFEF] active:bg-[#F5FFF6] disabled:border-bg-regular',
        'Line-accent':
          'border-[1px] border-line-regular text-brand-600 hover:bg-[#F4F4F5] active:bg-[#F5F5F9] disabled:border-bg-regular [&_svg]:text-black',
        'Line-neutral':
          'text-black border-[1px] border-line-regular hover:bg-[#F4F4F5] activer:bg-[#F5F5F9] disabled:border-bg-regular [&_svg]:text-black',
      },
      rounded: {
        normal: 'rounded-md',
        hard: 'rounded-3xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'BG-brand',
      rounded: 'normal',
    },
  },
)

interface ButtonProps
  extends VariantProps<typeof buttonVariants>,
    HTMLMotionProps<'button'> {
  /**
   * 색상을 기준으로 나뉘는 속성
   */
  variant?:
    | 'BG-brand'
    | 'BG-accent'
    | 'BG-neutral'
    | 'Line-brand'
    | 'Line-accent'
    | 'Line-neutral'

  /**
   * 라운딩 사이즈 조절 속성
   */
  rounded?: 'normal' | 'hard' | 'full'

  /**
   * 로딩상태
   */
  isPending?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, buttonRef) => {
    const { variant, rounded, isPending, children, className, ...rest } = props

    return (
      <motion.button
        ref={buttonRef}
        className={cn(
          buttonVariants({ variant, rounded }),
          className,
          'w-full',
          isPending && 'cursor-progress p-3',
        )}
        {...rest}
        style={{
          ...rest.style,
        }}
      >
        <div className="mx-auto w-fit whitespace-nowrap">
          <AnimatePresence mode="wait">
            {isPending ? (
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin"
                {...fadeInOutProps}
              >
                <circle
                  cx="12"
                  cy="12"
                  r="11"
                  stroke="url(#paint0_linear_258_42497)"
                  strokeWidth="2"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_258_42497"
                    x1="12"
                    y1="12"
                    x2="12"
                    y2="24"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="currentColor" />
                    <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </motion.svg>
            ) : (
              <motion.div
                className="flex items-center gap-x-3 text-but1-sb"
                {...fadeInOutProps}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    )
  },
)

Button.displayName = 'Button'
