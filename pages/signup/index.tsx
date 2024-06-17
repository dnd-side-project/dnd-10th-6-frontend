import Button from '@/components/button'
import {Inputbox} from '@/components/ui'
import FormLayout from '@/layout/form-layout'
import { useSession } from '@/provider/session-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { ReactNode, useId } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { cn } from '@/lib/client/utils'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'

const scheme = z.object({
  nickname: z
    .string()
    .min(2, { message: '2-6자로 입력해주세요' })
    .max(6, { message: '2-6자로 입력해주세요' }),
})

type SchemeType = z.infer<typeof scheme>
const SignUp = () => {
  const id = useId()
  const { data, signup } = useSession()
  const { mutate, isPending } = useMutation({
    mutationKey: ['signup'],
    mutationFn: signup,
    onSuccess() {
      const callbackURL = sessionStorage.getItem('callbackUrl')
      let endpoint = '/welcome'
      if (callbackURL) {
        sessionStorage.removeItem('callbackUrl')
        endpoint = decodeURIComponent(callbackURL)
      }
      router.replace(endpoint)
    },
  })
  const router = useRouter()
  const form = useForm<SchemeType>({
    defaultValues: {
      nickname: data?.user?.name ?? '',
    },
    resolver: zodResolver(scheme),
  })

  const onValid = async (values: SchemeType) => {
    mutate(values.nickname)
  }

  return (
    <form onSubmit={form.handleSubmit(onValid)}>
      <FormLayout
        title={<p className="text-body1-bold">회원가입</p>}
        content={
          <>
            <label htmlFor={id} className="space-y-2">
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
                  'text-body3-medium duration-150 pl-2',
                  form.formState.errors.nickname &&
                    '!text-inputbox-color-alert',
                  'text-sub-gray76 text-body3-medium',
                )}
                style={{ color: '#767676' }}
              >
                2~6자로 입력해주세요.
              </p>
            </label>
            <div className="py-4 px-5 bg-gray-gray50 rounded-md flex space-x-3 mt-5">
              <svg
                className="shrink-0 my-[2px]"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="8" cy="8" r="8" fill="#4F4F4F" />
                <path d="M9 3H7V9H9V3Z" fill="#F7F7F7" />
                <path d="M9 11H7V13H9V11Z" fill="#F7F7F7" />
              </svg>
              <p className="text-body3-medium text-text-sub-gray76">
                친구들이 원활하게 작성할 수 있도록, 나를 가장 잘 나타내는
                이름으로 입력해주세요
              </p>
            </div>
          </>
        }
        button={
          <Button disabled={isPending} type="submit">
            다음
          </Button>
        }
      />
    </form>
  )
}

export default SignUp

SignUp.getLayout = (page: ReactNode) => page
