import { HeaderProps } from '@/components/header'
import BaseLayout from '@/layout/base-layout'
import { useBrowserLayoutEffect } from '@/lib/client/utils'
import { drawerInOutProps } from '@/variants'
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

interface DrawerProps {
  open?: boolean
  onChangeOpen?: (state: boolean) => void
  trigger?: ReactNode
  header?: HeaderProps & { showHeader?: boolean }
}

function css(element: HTMLElement, style: Partial<CSSStyleDeclaration>) {
  for (const property in style) {
    if (style[property]) {
      element.style[property] = style[property]!
    }
  }
}

const Drawer = ({
  trigger,
  open = false,
  onChangeOpen,
  children,
  header,
}: PropsWithChildren<DrawerProps>) => {
  const id = useId()
  const [isMounted, setIsMounted] = useState(open)

  const ref = useRef(
    typeof window === 'undefined' ? null : document.createElement('div'),
  )

  const bodyRef = useRef(
    typeof window === 'undefined'
      ? null
      : document.getElementById('main-section'),
  ).current

  const toggleOpen = useCallback(
    (state?: boolean) => {
      const newState = !state ?? isMounted
      if (ref.current) {
        css(ref.current, {
          position: 'fixed',
          right: '-100%',
          top: '0px',
          width: '100%',
          height: 'calc(var(--vh,1vh)*100)',
          zIndex: '20',
        })
        document.body.style.overflowY = !newState ? 'hidden' : ''

        const newIsMountState = state ?? !isMounted
        setIsMounted(newIsMountState)
        onChangeOpen && onChangeOpen(newIsMountState)
      }
    },
    [isMounted, onChangeOpen],
  )

  useBrowserLayoutEffect(() => {
    if (ref.current) {
      ref.current.id = id

      bodyRef?.appendChild(ref.current)
      return () => {
        bodyRef?.removeChild(ref.current!)
      }
    }
  }, [id])

  useBrowserLayoutEffect(() => {
    if (ref.current) {
      if (isMounted) {
        css(ref.current, {
          display: 'block',
          zIndex: '10',
        })
      }
    }
  }, [isMounted])

  useEffect(() => {
    toggleOpen(open)
  }, [open, toggleOpen])

  return (
    <>
      <div className="grow" onClick={() => toggleOpen(true)}>
        {trigger}
      </div>
      <div className="flex items-center">
        {ref.current
          ? createPortal(
              <LazyMotion features={domAnimation}>
                <AnimatePresence mode="wait">
                  {isMounted ? (
                    <BaseLayout
                      className="w-full bg-white h-calc-h"
                      framer={{ ...drawerInOutProps }}
                      showHeader={header?.showHeader}
                      header={header}
                    >
                      <section className="flex flex-col grow overflow-y-scroll h-full">
                        {children}
                      </section>
                    </BaseLayout>
                  ) : null}
                </AnimatePresence>
              </LazyMotion>,
              ref.current,
            )
          : null}
      </div>
    </>
  )
}

export default Drawer
