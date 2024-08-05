import { ReactNode, RefObject, useRef, useState } from 'react'
import { useBrowserLayoutEffect } from '@/lib/client/utils'
import { clamp } from '@/lib/server/utils'


interface SafeSvgTextInnerProps {
  minWidth?: number
  maxWidth?: number
  children?: (ref: RefObject<SVGTextElement>, width: number) => ReactNode
}

export const SafeSvgTextInner = (props: SafeSvgTextInnerProps) => {
  const { children, maxWidth = 0, minWidth = 0 } = props
  const ref = useRef<SVGTextElement>(null)
  const [textWidth, setTextWidth] = useState(() => clamp(0, minWidth, maxWidth))

  useBrowserLayoutEffect(() => {
    if (!ref.current) return

    setTextWidth(
      clamp(
        ref.current.getBBox().width + 50,
        minWidth,
        maxWidth || ref.current.getBBox().width,
      ),
    )
  }, [ref.current])

  return children ? children(ref, textWidth) : null
}
