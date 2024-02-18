import Button from '@/components/button'
import Inputbox from '@/components/inputbox'
import FormLayout from '@/layout/form-layout'
import React, { ReactNode, useId } from 'react'

const SignUp = () => {
  const id = useId()
  return (
    <FormLayout
      title={<p className="text-body1-bold">회원가입</p>}
      content={
        <label htmlFor={id} className=" space-y-2">
          <span className="text-body1-medium">이름</span>
          <Inputbox id={id} placeholder="이름을 입력해주세요" />
        </label>
      }
      button={<Button>다음</Button>}
    />
  )
}

export default SignUp

SignUp.getLayout = (page: ReactNode) => page
