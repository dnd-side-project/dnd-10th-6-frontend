import React, { ReactNode } from 'react'
import BaseLayout from './base-layout'
import { HeaderProps } from '@/components/header'
import { cn } from '@/lib/client/utils'

interface FormLayoutProps {
  title?: ReactNode
  content: ReactNode
  button: ReactNode
  showHeader?: boolean
  header?: HeaderProps
  className?: string
}

const FormLayout = ({
  title,
  button,
  content,
  className,
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
      <div className="flex-1 flex flex-col mt-4 px-5">{content}</div>

      <div className="p-5 pb-0 mb-4 bg-white flex justify-center">{button}</div>
    </BaseLayout>
  )
}

export default FormLayout
