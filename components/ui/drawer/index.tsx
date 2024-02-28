import { HeaderProps } from '@/components/header'
import BaseLayout from '@/layout/base-layout'
import { isMobile, useBrowserLayoutEffect } from '@/lib/client/utils'
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

  const toggleOpen = useCallback(
    (state?: boolean) => {
      const newState = !state ?? isMounted
      if (ref.current) {
        if (!newState) {
          css(ref.current, {
            position: 'fixed',
            left: '0px',
            top: '0px',
            width: '100dvw',
            height: 'calc(var(--vh,1vh)*100)',
          })
          document.body.style.overflowY = 'hidden'
        } else {
          css(ref.current, {
            position: 'fixed',
            left: '0px',
            top: '0px',
            width: '0px',
            height: 'calc(var(--vh,1vh)*100)',
          })
          document.body.style.overflowY = ''
        }
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

      document.body.appendChild(ref.current)
      return () => {
        document.body.removeChild(ref.current!)
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
    <div className="flex items-center">
      <button onClick={() => toggleOpen(true)}>{trigger}</button>
      {ref.current
        ? createPortal(
            <LazyMotion features={domAnimation}>
              {isMobile() ? (
                <>
                  {isMounted ? (
                    <BaseLayout
                      className="w-screen bg-white h-calc-h"
                      framer={drawerInOutProps}
                      showHeader={header?.showHeader}
                      header={header}
                    >
                      <section className="flex flex-col grow overflow-y-scroll h-full">
                        {children}
                      </section>
                    </BaseLayout>
                  ) : null}
                </>
              ) : (
                <AnimatePresence presenceAffectsLayout>
                  {isMounted ? (
                    <BaseLayout
                      className="w-screen bg-white h-calc-h"
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
              )}
            </LazyMotion>,
            ref.current,
          )
        : null}
    </div>
  )
}

export default Drawer
