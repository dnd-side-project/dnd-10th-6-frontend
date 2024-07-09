import React, { ReactNode } from 'react'
import { ComboboxDropdown, Inputbox } from '@/components/ui'

const Pages = () => {
  return (
    <div className="flex h-screen w-full items-center  px-3">
      <ComboboxDropdown
        placeholder="알게 된 기간을 선택해주세요"
        options={[
          {
            label: '6개월미만',
            value: 'six_months'.toUpperCase(),
          },
          {
            label: '6개월 - 1년미만',
            value: 'one_year'.toUpperCase(),
          },
          {
            label: '1년 - 4년미만',
            value: 'four_years'.toUpperCase(),
          },
          {
            label: '4년이상',
            value: 'infinite'.toUpperCase(),
          },
        ]}
      />

      <Inputbox type="text" placeholder="알게 된 기간을 선택해주세요" />
    </div>
  )
}

Pages.getLayout = (page: ReactNode) => page

export default Pages
