import Button from '@/components/button'
import Inputbox from '@/components/inputbox'
import FormLayout from '@/layout/form-layout'
import { useSession } from '@/provider/session-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { ReactNode, useId } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { cn } from '@/lib/client/utils'
import { NamuiApi } from '@/lib/namui-api'

const scheme = z.object({
  nickname: z
    .string()
    .min(2, { message: '2-6자로 입력해주세요' })
    .max(6, { message: '2-6자로 입력해주세요' }),
})

type SchemeType = z.infer<typeof scheme>
const SignUp = () => {
  const id = useId()
  const { data } = useSession()
  const form = useForm<SchemeType>({
    defaultValues: {
      nickname: data?.user?.nickname ?? '',
    },
    resolver: zodResolver(scheme),
  })

  const onValid = async (values: SchemeType) => {
    const response = await NamuiApi.updateNickname(values.nickname)
    console.log(response, '<<response')
  }

  
  return (
    <FormLayout
      onSubmit={form.handleSubmit(onValid)}
      title={<p className="text-body1-bold">회원가입</p>}
      content={
        <>
          <label htmlFor={id} className=" space-y-2">
            <span className="text-body1-medium">이름</span>
            <Inputbox
              className={cn(
                form.formState.errors.nickname &&
                  '!border-inputbox-color-alert',
              )}
              {...form.register('nickname', { required: true })}
              id={id}
              placeholder="이름을 입력해주세요"
            />
            <p
              className={cn(
                'text-text-main-black11 text-body3-medium duration-150',
                form.formState.errors.nickname && '!text-inputbox-color-alert',
              )}
            >
              2~6자로 입력해주세요.
            </p>
          </label>
        </>
      }
      button={<Button type="submit">다음</Button>}
    />
  )
}

export default SignUp

SignUp.getLayout = (page: ReactNode) => page
