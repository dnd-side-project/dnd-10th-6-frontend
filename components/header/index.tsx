import { useRouter } from 'next/router'
import {
  ReactNode,
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { fadeInProps } from '@/variants'
import { useSettingStore } from '@/stores/setting.store'
import useScrollDirection from '@/hooks/use-scroll-direction'
import { cn } from '@/lib/client/utils'

import { Logo } from '../ui/logo'
import { Setting } from './setting'
import Image from 'next/image'
import back from '@/assets/icons/back.svg'
export interface HeaderProps {
  center?: ReactNode
  rightIcon?: ReactNode
  leftIcon?: ReactNode
  bodyRef?: Ref<HTMLElement>
  className?: string
  options?: {
    onCenterClick?: () => void
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
  className,
}: HeaderProps) => {
  const { showRight, onBackClick } = options ?? { showRight: true }
  const { onCenterClick } = options ?? { onCenterClick: () => {} }
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

  const shoudFixedHeader = useMemo(
    () => scrollTop > headerHeight && direction === 'UP',
    [direction, headerHeight, scrollTop],
  )
  return (
    <motion.header
      ref={headerRef}
      {...fadeInProps}
      className={cn(
        'sticky z-10 grid h-14 w-full shrink-0 grid-cols-3 items-center bg-white px-5 text-t4-kr-b duration-300',
        className,
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
          <Image src={back} alt="back" />
        )}
      </motion.button>
      <AnimatePresence mode="sync">
        <motion.div
          {...fadeInProps}
          onClick={() =>
            onCenterClick
              ? onCenterClick()
              : typeof center === 'undefined'
                ? router.push('/garden')
                : () => {}
          }
          className="flex justify-center"
        >
          {center}
        </motion.div>
      </AnimatePresence>
      <motion.div {...fadeInProps} className="flex justify-end gap-x-4">
        {showRight
          ? rightIcon ?? (
              <div>
                <Setting />
              </div>
            )
          : null}
      </motion.div>
    </motion.header>
  )
}

export default Header

{
  /* <Alert /> */
}
