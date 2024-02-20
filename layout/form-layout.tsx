import React, { HTMLAttributes, ReactNode } from 'react'
import BaseLayout from './base-layout'

interface FormLayoutProps
  extends Omit<HTMLAttributes<HTMLFormElement>, 'title' | 'content'> {
  title: ReactNode
  content: ReactNode
  button: ReactNode
}

const FormLayout = ({
  title,
  button,
  content,
  ...formProps
}: FormLayoutProps) => {
  return (
    <BaseLayout
      className="h-calc-h"
      header={{
        center: title,
        rightIcon: false,
      }}
    >
      <form {...formProps} className="grow flex flex-col">
        <div className="flex-1 flex flex-col mt-4 px-5">{content}</div>

        <div className="p-5 mb-4 bg-white flex justify-center">{button}</div>
      </form>
    </BaseLayout>
  )
}

export default FormLayout
