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
        center: <p className="text-body1-bold">프로필 수정</p>,
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
        <p className="cursor-pointer py-[14px] text-body1-bold text-text-main-black11">
          프로필 편집
        </p>
      }
    >
      <form
        onSubmit={form.handleSubmit(onValid)}
        className="mb-4 mt-4 flex flex-1 flex-col px-5"
      >
        <label htmlFor={id} className=" grow space-y-2">
          <span className="text-body1-medium">이름</span>
          <Inputbox
            maxLength={6}
            className={cn(
              form.formState.errors.nickname && '!border-inputbox-color-alert',
            )}
            {...form.register('nickname', { required: true })}
            id={id}
            placeholder="이름을 입력해주세요"
          />
          <p
            className={cn(
              'ml-2 mt-2 text-body3-medium text-text-sub-gray76 duration-150',
              form.formState.errors.nickname && '!text-inputbox-color-alert',
            )}
          >
            2~6자로 입력해주세요.
          </p>
        </label>

        <Button type="submit">다음</Button>
      </form>
    </SideDrawer>
  )
}
