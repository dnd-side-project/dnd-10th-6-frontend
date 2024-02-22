import { useRouter } from 'next/router'
import {
  ReactNode,
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { fadeInProps } from '@/variants'
import { useSettingStore } from '@/stores/setting.store'
import useScrollDirection from '@/hooks/use-scroll-direction'
import { cn } from '@/lib/client/utils'
import Setting from '@/components/compositions/header/setting'
import Alert from '@/components/compositions/header/alert'
import Logo from '../ui/logo'

export interface HeaderProps {
  center?: ReactNode
  rightIcon?: ReactNode
  leftIcon?: ReactNode
  bodyRef?: Ref<HTMLElement>
  options?: {
    onBackClick?: () => void
    showRight?: boolean
  }
}

const Header = ({
  leftIcon,
  bodyRef,
  center = (
    <div className="h-5">
      <Logo />
    </div>
  ),
  rightIcon,
  options,
}: HeaderProps) => {
  const { showRight, onBackClick } = options ?? { showRight: true }
  const headerRef = useRef<HTMLElement>(null)
  const router = useRouter()

  const { scrollTop, direction } = useScrollDirection({
    ref: (bodyRef as unknown as RefObject<HTMLElement>) ?? null,
  })

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
        'w-full z-10 grid grid-cols-3 items-center px-5 h-14 bg-white sticky duration-300 text-body1-bold shrink-0',
        shoudFixedHeader ? 'top-0' : '-top-header',
      )}
    >
      <motion.button
        {...fadeInProps}
        onClick={() =>
          onBackClick
            ? onBackClick()
            : typeof leftIcon === 'undefined'
              ? router.back()
              : () => {}
        }
      >
        {leftIcon === null ? null : leftIcon ? (
          leftIcon
        ) : (
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
        )}
      </motion.button>
      <AnimatePresence mode="sync">
        <motion.div {...fadeInProps} className="flex justify-center">
          {center}
        </motion.div>
      </AnimatePresence>
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
