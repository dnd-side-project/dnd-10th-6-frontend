import { useRouter } from 'next/router'
import { ReactNode, useCallback, useEffect, useRef } from 'react'
import { Variants, motion, useAnimation } from 'framer-motion'

import { fadeInProps } from '@/variants'
import { useSettingStore } from '@/stores/setting.store'
import useScrollDirection from '@/hooks/use-scroll-direction'
import { cn } from '@/lib/client/utils'
import Setting from '@/components/compositions/header/setting'
import Alert from '@/components/compositions/header/alert'

const logoVariants: Variants = {
  initial: {},
  animate: {},
  fill: {},
}

const pathVariants: Variants = {
  initial: { fill: '#ffffff', pathLength: 0 },
  animate: (color: string) => ({
    fill: color,
    strokeWidth: 0,
  }),
}

const Logo = () => {
  const control = useAnimation()
  useEffect(() => {
    control.start('animate')
  }, [control])
  return (
    <motion.svg
      initial="initial"
      animate={control}
      variants={logoVariants}
      transition={{
        duration: 1.5,
        staggerChildren: 0.1,
      }}
      width="74"
      height="20"
      viewBox="0 0 74 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="z-10"
    >
      <motion.path
        variants={pathVariants}
        transition={{
          duration: 0.75,
        }}
        d="M0 6.40988H4.03172V7.76888C4.86222 6.65148 6.10042 6.09277 7.74633 6.09277C8.77314 6.09277 9.67914 6.33437 10.4643 6.81758C11.2495 7.28568 11.8535 7.96518 12.2764 8.85609C12.7143 9.74699 12.9332 10.7964 12.9332 12.0044V19.6828H8.90149V12.684C8.90149 11.6722 8.69764 10.9021 8.28993 10.3736C7.89733 9.83004 7.32353 9.55824 6.56853 9.55824C5.78332 9.55824 5.16422 9.85269 4.71122 10.4416C4.25822 11.0305 4.03172 11.8383 4.03172 12.8652V19.6828H0V6.40988Z"
        stroke="#111111"
        custom={'#111111'}
      />
      <motion.path
        variants={pathVariants}
        transition={{
          duration: 0.75,
        }}
        d="M20.8693 19.9999C19.616 19.9999 18.4986 19.6979 17.5171 19.0939C16.5356 18.505 15.7731 17.6821 15.2295 16.6251C14.6859 15.5681 14.4141 14.3752 14.4141 13.0464C14.4141 11.7175 14.6859 10.5246 15.2295 9.46764C15.7731 8.41063 16.5356 7.58768 17.5171 6.99878C18.4986 6.39477 19.616 6.09277 20.8693 6.09277C22.5756 6.09277 23.8441 6.65148 24.6746 7.76888V6.40988H28.7063V19.6828H24.6746V18.3238C23.8441 19.4412 22.5756 19.9999 20.8693 19.9999ZM21.5035 16.5571C22.485 16.5571 23.2702 16.2325 23.8592 15.5832C24.4481 14.9188 24.7425 14.0732 24.7425 13.0464C24.7425 12.0195 24.4481 11.1815 23.8592 10.5322C23.2702 9.86779 22.485 9.53559 21.5035 9.53559C20.5522 9.53559 19.7897 9.86779 19.2159 10.5322C18.6421 11.1815 18.3552 12.0195 18.3552 13.0464C18.3552 14.0732 18.6421 14.9188 19.2159 15.5832C19.7897 16.2325 20.5522 16.5571 21.5035 16.5571Z"
        stroke="#00BC68"
        custom={'#00BC68'}
      />

      <motion.path
        variants={pathVariants}
        transition={{
          duration: 0.75,
        }}
        d="M31.1836 6.40988H35.2153V7.67828C35.623 7.13468 36.0836 6.73453 36.597 6.47783C37.1255 6.22112 37.7521 6.09277 38.4769 6.09277C39.3074 6.09277 40.0624 6.25887 40.7419 6.59108C41.4214 6.90818 41.9801 7.37628 42.418 7.99538C42.9163 7.36118 43.5279 6.88553 44.2527 6.56843C44.9775 6.25132 45.8382 6.09277 46.8348 6.09277C47.8465 6.09277 48.7374 6.33437 49.5075 6.81758C50.2776 7.28568 50.8741 7.96518 51.2969 8.85609C51.7197 9.74699 51.9311 10.7964 51.9311 12.0044V19.6828H47.8994V12.684C47.8994 11.6722 47.7106 10.9021 47.3331 10.3736C46.9556 9.83004 46.3969 9.55824 45.657 9.55824C45.0077 9.55824 44.5018 9.80739 44.1394 10.3057C43.7921 10.804 43.6034 11.5288 43.5732 12.4801V19.6828H39.5415V12.684C39.5415 11.6722 39.3527 10.9021 38.9752 10.3736C38.5977 9.83004 38.039 9.55824 37.2991 9.55824C36.6498 9.55824 36.144 9.80739 35.7816 10.3057C35.4343 10.804 35.2455 11.5288 35.2153 12.4801V19.6828H31.1836V6.40988Z"
        stroke="#00BC68"
        custom={'#00BC68'}
      />
      <motion.path
        variants={pathVariants}
        transition={{
          duration: 0.75,
        }}
        d="M59.0687 20.0002C58.0419 20.0002 57.1359 19.7586 56.3507 19.2754C55.5655 18.8073 54.9539 18.1278 54.516 17.2369C54.0932 16.346 53.8818 15.2965 53.8818 14.0885V6.41016H57.9136V13.409C57.9136 14.4207 58.1099 15.1984 58.5025 15.742C58.9102 16.2705 59.4915 16.5347 60.2465 16.5347C61.0317 16.5347 61.6508 16.2403 62.1038 15.6514C62.5568 15.0625 62.7833 14.2546 62.7833 13.2278V6.41016H66.815V19.6831H62.7833V18.3241C61.9528 19.4415 60.7146 20.0002 59.0687 20.0002Z"
        stroke="#111111"
        custom={'#111111'}
      />

      <motion.path
        variants={pathVariants}
        transition={{
          duration: 0.75,
        }}
        d="M73.0735 0.702153C72.6054 0.234051 72.0165 0 71.3068 0C70.597 0 70.0081 0.234051 69.54 0.702153C69.0719 1.17026 68.8379 1.75916 68.8379 2.46886C68.8379 3.17856 69.0719 3.76747 69.54 4.23557C70.0081 4.70367 70.597 4.93772 71.3068 4.93772C72.0165 4.93772 72.6054 4.70367 73.0735 4.23557C73.5416 3.76747 73.7756 3.17856 73.7756 2.46886C73.7756 1.75916 73.5416 1.17026 73.0735 0.702153Z"
        stroke="#00BC68"
        custom={'#00BC68'}
      />
      <motion.path
        d="M73.3227 19.7284H69.291V6.41016H73.3227V19.7284Z"
        variants={pathVariants}
        transition={{
          duration: 0.75,
        }}
        stroke="#00BC68"
        custom={'#00BC68'}
      />
    </motion.svg>
  )
}

export interface HeaderProps {
  center?: ReactNode
  rightIcon?: ReactNode
  options?: {
    onBackClick?: () => void
    showRight?: boolean
  }
}

const Header = ({ center = <Logo />, rightIcon, options }: HeaderProps) => {
  const { showRight, onBackClick } = options ?? { showRight: true }
  const headerRef = useRef<HTMLElement>(null)
  const router = useRouter()

  const { scrollTop, direction } = useScrollDirection()

  const { headerHeight, setIntersecting, setHeaderHeight } = useSettingStore(
    (state) => ({
      headerHeight: state.headerHeight,
      setIntersecting: state.setIsHide,
      setHeaderHeight: state.setHeaderHeight,
    }),
  )
  const handleResize = useCallback(() => {
    if (!headerRef.current || typeof window === 'undefined') return

    document.documentElement.style.setProperty(
      '--header-height',
      `${headerRef.current.clientHeight}px`,
    )
    setHeaderHeight(headerRef.current.clientHeight)
  }, [setHeaderHeight])

  useEffect(() => {
    if (typeof window !== 'undefined' && headerRef.current) {
      const element = headerRef.current
      element.addEventListener('resize', handleResize)
      handleResize()
      return () => {
        element.removeEventListener('resize', handleResize)
      }
    }
  }, [handleResize, setIntersecting])

  const shoudFixedHeader = scrollTop > headerHeight && direction === 'UP'

  return (
    <motion.header
      ref={headerRef}
      {...fadeInProps}
      className={cn(
        'w-full z-10 grid grid-cols-3 items-center px-5 h-14 bg-white sticky duration-300',
        shoudFixedHeader ? 'top-0' : '-top-header',
      )}
    >
      <motion.button
        {...fadeInProps}
        onClick={() => (onBackClick ? onBackClick() : router.back())}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.6187 23.6187C18.277 23.9604 17.723 23.9604 17.3813 23.6187L8.38128 14.6187C8.21719 14.4546 8.125 14.2321 8.125 14C8.125 13.7679 8.21719 13.5454 8.38128 13.3813L17.3813 4.38128C17.723 4.03957 18.277 4.03957 18.6187 4.38128C18.9604 4.72299 18.9604 5.27701 18.6187 5.61872L10.2374 14L18.6187 22.3813C18.9604 22.723 18.9604 23.277 18.6187 23.6187Z"
            fill="#111111"
          />
        </svg>
      </motion.button>
      <motion.div {...fadeInProps} className="flex justify-center">
        {center}
      </motion.div>
      <motion.div {...fadeInProps} className="flex gap-x-4 justify-end">
        {showRight
          ? rightIcon ?? (
              <>
                <Alert />
                <Setting />
              </>
            )
          : null}
      </motion.div>
    </motion.header>
  )
}

export default Header
