import React, { ReactNode } from 'react'
import BaseLayout from './base-layout'
import { HeaderProps } from '@/components/header'

interface FormLayoutProps {
  title: ReactNode
  content: ReactNode
  button: ReactNode
  header?: HeaderProps
}

const FormLayout = ({ title, button, content, header }: FormLayoutProps) => {
  return (
    <BaseLayout
      className="h-calc-h"
      header={{
        center: title,
        rightIcon: false,
        ...header,
      }}
    >
      <div className="flex-1 flex flex-col mt-4 px-5">{content}</div>

      <div className="p-5 mb-4 bg-white flex justify-center">{button}</div>
    </BaseLayout>
  )
}

export default FormLayout
