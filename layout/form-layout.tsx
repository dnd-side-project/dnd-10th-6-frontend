import React, { ReactNode } from 'react'
import BaseLayout from './base-layout'
import { HeaderProps } from '@/components/header'
import { cn } from '@/lib/client/utils'

interface FormLayoutProps {
  title?: ReactNode
  content: ReactNode
  button?: ReactNode
  showHeader?: boolean
  header?: HeaderProps
  contentProps?: {
    className?: string
  }
  className?: string
}

const FormLayout = ({
  title,
  button,
  content,
  className,
  contentProps,
  ...rest
}: FormLayoutProps) => {
  return (
    <BaseLayout
      className={cn('h-calc-h', className)}
      {...rest}
      header={{
        center: title,
        rightIcon: false,
        ...rest.header,
      }}
    >
      <div
        className={cn(
          'flex-1 flex flex-col mt-4 px-5',
          contentProps?.className,
        )}
      >
        {content}
      </div>

      <div className="p-5 pb-0 mb-4 bg-white flex justify-center">{button}</div>
    </BaseLayout>
  )
}

export default FormLayout
