import { Button } from '@/components/ui'

import { Inputbox } from '@/components/ui'
import SideDrawer from '@/components/side-drawer'

import { toastError } from '@/lib/client/alert'
import { cn } from '@/lib/client/utils'
import { NamuiApi } from '@/lib/namui-api'
import { useSession } from '@/provider/session-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import Image from 'next/image'
import caution from '@/assets/icons/caution.svg'

const scheme = z.object({
  nickname: z
    .string()
    .min(2, { message: '2-6자로 입력해주세요' })
    .max(6, { message: '2-6자로 입력해주세요' }),
})
type SchemeType = z.infer<typeof scheme>

export const EditProfile = () => {
  const [openAlert, setOpenAlert] = useState(false)
  const { data } = useSession()
  const id = useId()
  const form = useForm<SchemeType>({
    defaultValues: {
      nickname: data?.user?.name ?? '',
    },
    resolver: zodResolver(scheme),
  })
  const onValid = async (values: SchemeType) => {
    try {
      await NamuiApi.editProfile(values.nickname)
      setOpenAlert(false)
    } catch (_) {
      toastError()
    }
  }
  return (
    <SideDrawer
      header={{
        center: <p className="text-t4-kr-b">프로필 수정</p>,
        options: {
          onBackClick() {
            setOpenAlert(false)
          },
          showRight: false,
        },
      }}
      open={openAlert}
      onChangeOpen={setOpenAlert}
      trigger={
        <p className="cursor-pointer py-[14px] text-but2-sb text-black">
          프로필 수정
        </p>
      }
    >
      <form
        onSubmit={form.handleSubmit(onValid)}
        className="mb-4 mt-4 flex flex-1 flex-col px-5"
      >
        <label htmlFor={id} className=" grow space-y-2">
          <span className="text-t4-kr-b">이름</span>
          <Inputbox
            maxLength={6}
            className={cn(form.formState.errors.nickname && '!border-bg-red')}
            {...form.register('nickname', { required: true })}
            id={id}
            placeholder="이름을 입력해주세요"
          />
          <p
            className={cn(
              'pb-5 pt-1 text-b2-kr-m text-font-gray-04 duration-150',
              form.formState.errors.nickname && '!text-bg-red',
            )}
          >
            2~6자로 입력해주세요.
          </p>
          <div className="mt-5 flex space-x-3 rounded-md bg-bg-light px-5 py-4">
            <Image
              src={caution}
              alt="caution"
              className="my-[2px] h-4 w-4 shrink-0"
            />
            <p className="text-b2-kr-m text-font-gray-04">
              누가 작성했는지 알 수 있도록, 나를 가장 잘 나타내는 이름으로
              입력해주세요
            </p>
          </div>
        </label>

        <Button type="submit">다음</Button>
      </form>
    </SideDrawer>
  )
}
