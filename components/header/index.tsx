import { useRouter } from 'next/router'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { Variants, motion, useAnimation } from 'framer-motion'

import Drawer from '@/components/ui/drawer'
import { fadeInProps } from '@/variants'
import { useSettingStore } from '@/stores/setting.store'
import useScrollDirection from '@/hooks/use-scroll-direction'
import { cn } from '@/lib/client/utils'

const logoVariants: Variants = {
  initial: {},
  animate: {},
  fill: {},
}

const pathVariants: Variants = {
  initial: { fill: '#ffffff', pathLength: 0 },
  animate: {
    fill: '#ffffff',
    pathLength: 1,
  },
  fill: (color: string) => ({
    fill: color,
    strokeWidth: 0,
  }),
}

const Logo = () => {
  const isInitialAnimationEnd = useRef(false)
  const control = useAnimation()
  useEffect(() => {
    control.start('animate')
  }, [])
  return (
    <motion.svg
      initial="initial"
      animate={control}
      variants={logoVariants}
      transition={{
        duration: 1.5,
        staggerChildren: 0.1,
      }}
      onAnimationComplete={() => {
        if (!isInitialAnimationEnd.current) {
          control.start('fill')
          isInitialAnimationEnd.current = true
        }
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

interface HeaderProps {
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
  const [openAlert, setOpenAlert] = useState(false)
  const [openSetting, setOpenSetting] = useState(false)

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
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setIntersecting(entry.isIntersecting)
        })
      })

      const element = headerRef.current
      observer.observe(element)
      element.addEventListener('resize', handleResize)
      handleResize()
      return () => {
        element.removeEventListener('resize', handleResize)
        observer.disconnect()
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
                <Drawer
                  open={openAlert}
                  onChangeOpen={setOpenAlert}
                  trigger={
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
                        d="M22.862 20.4163L21.428 17.4859C20.9161 16.4395 20.6499 15.2901 20.6499 14.1252V10.733C20.6499 7.06032 17.6726 4.08301 13.9999 4.08301C10.3272 4.08301 7.34991 7.06032 7.34991 10.733V14.1252C7.34991 15.2901 7.08376 16.4395 6.57178 17.4858L5.13783 20.4163H22.862ZM13.9999 2.33301C9.36072 2.33301 5.59991 6.09382 5.59991 10.733V14.1252C5.59991 15.0235 5.39468 15.9098 4.99988 16.7167L3.49743 19.7872C2.96014 20.8852 3.75955 22.1663 4.98199 22.1663H23.0178C24.2403 22.1663 25.0397 20.8852 24.5024 19.7872L23 16.7167C22.6052 15.9098 22.3999 15.0235 22.3999 14.1252V10.733C22.3999 6.09382 18.6391 2.33301 13.9999 2.33301Z"
                        fill="#111111"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.5 20.417V22.167C17.5 24.1 15.933 25.667 14 25.667C12.067 25.667 10.5 24.1 10.5 22.167V20.417H17.5ZM12.25 22.167H15.75C15.75 23.1335 14.9665 23.917 14 23.917C13.0335 23.917 12.25 23.1335 12.25 22.167Z"
                        fill="#111111"
                      />
                    </svg>
                  }
                >
                  <Header
                    center={<p>작성목록</p>}
                    options={{
                      onBackClick() {
                        setOpenAlert(false)
                      },

                      showRight: false,
                    }}
                  />
                  <p>112</p>
                  <p>112</p>
                  <p>112</p>
                  <p>112</p>
                  <p>112</p>
                  <p>112</p>
                  <p>112</p>
                  <p>112</p>
                  <p>112</p>
                  <p>112</p>
                  <p>112</p>
                </Drawer>
                <Drawer
                  open={openSetting}
                  onChangeOpen={setOpenSetting}
                  trigger={
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
                        d="M12.8274 4.08301L12.4093 6.31315C12.2312 7.26267 11.6143 7.98325 10.8912 8.38471C10.8137 8.42772 10.7372 8.47229 10.6617 8.5184C9.94929 8.95348 9.00829 9.13331 8.08875 8.80984L6.18523 8.14024L5.0126 10.1713L6.55066 11.4905C7.28734 12.1223 7.60323 13.0228 7.58495 13.8554C7.5839 13.9033 7.58337 13.9514 7.58337 13.9997C7.58337 14.0988 7.5856 14.1972 7.59001 14.295C7.62851 15.1489 7.31639 16.0811 6.55885 16.7308L5.0126 18.0571L6.18523 20.0881L8.33045 19.3335C9.21743 19.0215 10.1256 19.1783 10.8259 19.5779C10.8476 19.5903 10.8693 19.6025 10.8912 19.6146C11.6143 20.0161 12.2312 20.7367 12.4093 21.6862L12.8274 23.9163H15.1727L15.5908 21.6862C15.7689 20.7367 16.3858 20.0161 17.1089 19.6146C17.1307 19.6025 17.1525 19.5903 17.1742 19.5779C17.8745 19.1783 18.7826 19.0215 19.6696 19.3335L21.8148 20.0881L22.9875 18.0571L21.4412 16.7308C20.6837 16.0811 20.3716 15.1489 20.4101 14.295C20.4145 14.1972 20.4167 14.0988 20.4167 13.9997C20.4167 13.9514 20.4162 13.9033 20.4151 13.8554C20.3968 13.0228 20.7127 12.1223 21.4494 11.4905L22.9875 10.1713L21.8148 8.14024L19.9113 8.80984C18.9918 9.13331 18.0508 8.95348 17.3383 8.5184C17.2629 8.47229 17.1864 8.42772 17.1089 8.38471C16.3858 7.98325 15.7689 7.26266 15.5908 6.31315L15.1727 4.08301H12.8274ZM18.0834 13.9997C18.0834 16.2548 16.2552 18.083 14 18.083C11.7449 18.083 9.9167 16.2548 9.9167 13.9997C9.9167 11.7445 11.7449 9.91634 14 9.91634C16.2552 9.91634 18.0834 11.7445 18.0834 13.9997ZM15.6568 2.33301C16.2182 2.33301 16.7 2.73287 16.8035 3.28467L17.3108 5.99065C17.3804 6.3618 17.6282 6.6714 17.9583 6.85469C18.057 6.90945 18.1544 6.9662 18.2504 7.02488C18.5756 7.22346 18.9712 7.28543 19.3306 7.159L21.6908 6.32875C22.2204 6.14245 22.8076 6.35977 23.0883 6.84597L24.7451 9.71555C25.0258 10.2018 24.9204 10.8189 24.4943 11.1844L22.5887 12.8188C22.3007 13.0659 22.1564 13.4376 22.1647 13.817C22.166 13.8777 22.1667 13.9386 22.1667 13.9997C22.1667 14.1251 22.1639 14.2498 22.1583 14.3738C22.1407 14.7635 22.2844 15.1485 22.5805 15.4025L24.4943 17.0439C24.9204 17.4094 25.0258 18.0266 24.7451 18.5128L23.0883 21.3824C22.8076 21.8686 22.2204 22.0859 21.6908 21.8996L19.0889 20.9843C18.7421 20.8623 18.3608 20.9157 18.0415 21.0979C18.0139 21.1136 17.9861 21.1292 17.9583 21.1447C17.6282 21.328 17.3804 21.6376 17.3108 22.0087L16.8035 24.7147C16.7 25.2665 16.2182 25.6663 15.6568 25.6663H12.3433C11.7819 25.6663 11.3001 25.2665 11.1966 24.7147L10.6892 22.0087C10.6196 21.6376 10.3719 21.328 10.0418 21.1447C10.0139 21.1292 9.98621 21.1136 9.9586 21.0979C9.6393 20.9157 9.25795 20.8623 8.91116 20.9843L6.30925 21.8996C5.77964 22.0859 5.19245 21.8686 4.91174 21.3824L3.25499 18.5128C2.97428 18.0266 3.07967 17.4094 3.50581 17.0439L5.41954 15.4025C5.71566 15.1485 5.85936 14.7635 5.84179 14.3738C5.83619 14.2498 5.83337 14.1251 5.83337 13.9997C5.83337 13.9386 5.83404 13.8777 5.83537 13.817C5.8437 13.4376 5.69941 13.0659 5.41135 12.8188L3.50581 11.1844C3.07967 10.8189 2.97428 10.2018 3.25499 9.71555L4.91174 6.84597C5.19245 6.35977 5.77965 6.14245 6.30925 6.32875L8.66946 7.159C9.02889 7.28543 9.42446 7.22346 9.74964 7.02488C9.84572 6.9662 9.94311 6.90945 10.0417 6.85469C10.3719 6.6714 10.6196 6.3618 10.6892 5.99065L11.1966 3.28467C11.3001 2.73287 11.7819 2.33301 12.3433 2.33301H15.6568ZM16.3334 13.9997C16.3334 15.2883 15.2887 16.333 14 16.333C12.7114 16.333 11.6667 15.2883 11.6667 13.9997C11.6667 12.711 12.7114 11.6663 14 11.6663C15.2887 11.6663 16.3334 12.711 16.3334 13.9997Z"
                        fill="black"
                      />
                    </svg>
                  }
                >
                  <Header
                    center={<p>설정</p>}
                    options={{
                      onBackClick() {
                        setOpenSetting(false)
                      },
                      showRight: false,
                    }}
                  />
                  <p>112</p>
                  <p>112</p>
                  <p>112</p>
                  <p>112</p>
                  <p>112</p>
                  <p>112</p>
                  <p>112</p>
                  <p>112</p>
                  <p>112</p>
                  <p>112</p>
                  <p>112</p>
                </Drawer>
              </>
            )
          : null}
      </motion.div>
    </motion.header>
  )
}

export default Header
