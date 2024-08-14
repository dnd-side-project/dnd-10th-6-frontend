import React, { ReactNode } from 'react'
import BaseLayout from './base-layout'
import { cn } from '@/lib/client/utils'
import { HeaderProps } from '@/components/header'
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
          'mt-4 flex flex-1 flex-col px-5',
          contentProps?.className,
        )}
      >
        {content}
      </div>

      {button && (
        <div className="absolute bottom-0 mb-4 flex w-full justify-center bg-white p-5 pb-0">
          {button}
        </div>
      )}
    </BaseLayout>
  )
}

export default FormLayout
