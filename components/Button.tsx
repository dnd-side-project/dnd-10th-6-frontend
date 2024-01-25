import React, { PropsWithChildren } from 'react'

const Button = ({ children }: PropsWithChildren) => {
  return <button className="bg-blue-300">{children}</button>
}

export default Button
