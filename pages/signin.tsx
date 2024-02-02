<<<<<<< HEAD
import { Button } from '@/components/button'
import { signIn } from 'next-auth/react'
=======
import Button from '@/components/button'
import { signIn } from '@/lib/client/auth'
>>>>>>> origin
import React from 'react'

const Signin = () => {
  return (
    <div>
      커스텀 로그인 화면
      <Button onClick={() => signIn('kakao')}>Login with Kakao</Button>
    </div>
  )
}

export default Signin
