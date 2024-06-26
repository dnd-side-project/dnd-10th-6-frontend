import { Logo } from '@/components/ui'
import useFilter, { KnowFilterType } from '@/hooks/use-filter'
import { cn } from '@/lib/client/utils'
import { fadeInProps } from '@/variants'
import { motion, AnimatePresence, useAnimate } from 'framer-motion'
import React, { HTMLAttributes, PropsWithChildren, useEffect } from 'react'
import Step3TreeInfo from './step3-tree-info'
import Step3BestWorth from './step3-best-worth'
import Step3Character from './step3-character'
import Step3Money from './step3-money'
import Step3Happy from './step3-happy'
import Step3Sad from './step3-sad'

const filters: {
  type: KnowFilterType
  text: string
  default: string
  items: { label: string; value: string }[]
}[] = [
  {
    type: 'total',
    text: '전체 보기',
    default: 'total',
    items: [],
  },
  {
    type: 'relation',
    text: '알게 된 경로',
    default: 'ELEMENTARY_SCHOOL',
    items: [
      {
        label: '초등학교',
        value: 'ELEMENTARY_SCHOOL',
      },
      {
        label: '중·고등학교',
        value: 'MIDDLE_AND_HIGH_SCHOOL',
      },
      {
        label: '대학교',
        value: 'UNIVERSITY',
      },
      {
        label: '직장',
        value: 'WORK',
      },
      {
        label: '모임',
        value: 'SOCIAL',
      },
      {
        label: '기타',
        value: 'ETC',
      },
    ],
  },
  {
    type: 'period',
    text: '알게 된 기간',
    default: '',
    items: [
      {
        label: '6개월 미만',
        value: 'SIX_MONTHS',
      },
      {
        label: '6개월-1년',
        value: 'ONE_YEAR',
      },
      {
        label: '1년-4년',
        value: 'FOUR_YEARS',
      },
      {
        label: '4년 이상',
        value: 'INFINITE',
      },
    ],
  },
]
const OnboardStep3 = () => {
  const { filterIndex, selectedFilter, setFilterIndex } = useFilter()
  return (
    <div
      key="step3"
      className="space-y- flex h-full flex-col items-center justify-center space-y-[2vb] px-5 text-center"
    >
      <h2 className="text-[2.3vb]">
        내 결과 보기 페이지에서 그룹별로
        <br />
        <b>상세 데이터를 확인</b>할 수 있어요
      </h2>
      <section className="flex aspect-[1/2.1653] w-[25vb] flex-col overflow-hidden rounded-[3vb] py-[0.75vb] shadow-onboard">
        <div className="relative flex grow flex-col overflow-y-scroll pb-[0.5vb] scrollbar-hide">
          <header className="flex h-[4vb] w-full items-center justify-between rounded-t-[2.2vb] p-[1vb]">
            <svg
              className="h-[1.195vb] w-[2.4vb]"
              width="15"
              height="6"
              viewBox="0 0 15 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.44996 5V1.49316H1.43238L0.339609 2.24316V1.54883L1.4441 0.772461H2.19117V5H1.44996ZM4.62 0.699219C5.55164 0.699219 6.32801 1.35254 6.32801 2.83496V2.84082C6.32801 4.23828 5.68055 5.07324 4.60242 5.07324C3.8202 5.07324 3.23426 4.62207 3.10242 3.9834L3.09656 3.95117H3.84656L3.85535 3.97754C3.96961 4.26758 4.22742 4.45508 4.60535 4.45508C5.28504 4.45508 5.56922 3.80469 5.59852 3.00488C5.60145 2.96094 5.60437 2.91699 5.60437 2.87012H5.5868C5.4198 3.25684 4.99793 3.5498 4.42664 3.5498C3.61219 3.5498 3.03797 2.96387 3.03797 2.16992V2.16406C3.03797 1.31152 3.70887 0.699219 4.62 0.699219ZM4.62 2.9668C5.1034 2.9668 5.47254 2.62695 5.47254 2.15527V2.15234C5.47254 1.68359 5.1034 1.31738 4.62879 1.31738C4.16004 1.31738 3.78211 1.68066 3.78211 2.1377V2.14355C3.78211 2.62402 4.13953 2.9668 4.62 2.9668ZM7.15137 2.23438C6.91406 2.23438 6.72656 2.04688 6.72656 1.80957C6.72656 1.57227 6.91406 1.3877 7.15137 1.3877C7.38867 1.3877 7.57324 1.57227 7.57324 1.80957C7.57324 2.04688 7.38867 2.23438 7.15137 2.23438ZM7.15137 4.38477C6.91406 4.38477 6.72656 4.19727 6.72656 3.95996C6.72656 3.72266 6.91406 3.53809 7.15137 3.53809C7.38867 3.53809 7.57324 3.72266 7.57324 3.95996C7.57324 4.19727 7.38867 4.38477 7.15137 4.38477ZM9.63879 5.07324C8.60168 5.07324 7.97766 4.23242 7.97766 2.8877V2.88184C7.97766 1.53711 8.60168 0.699219 9.63879 0.699219C10.673 0.699219 11.2999 1.53711 11.2999 2.88184V2.8877C11.2999 4.23242 10.673 5.07324 9.63879 5.07324ZM9.63879 4.45508C10.2071 4.45508 10.5382 3.86328 10.5382 2.8877V2.88184C10.5382 1.90625 10.2071 1.32031 9.63879 1.32031C9.0675 1.32031 8.73937 1.90625 8.73937 2.88184V2.8877C8.73937 3.86328 9.0675 4.45508 9.63879 4.45508ZM11.7043 5V4.48438L13.1985 3.02832C13.7522 2.48633 13.8723 2.27246 13.8723 1.95898V1.95312C13.8694 1.5752 13.5852 1.30566 13.178 1.30566C12.7092 1.30566 12.3811 1.61914 12.3723 2.02637V2.04688H11.6633V2.02637C11.6633 1.25293 12.3137 0.699219 13.1721 0.699219C14.0188 0.699219 14.6106 1.21191 14.6106 1.90918V1.91504C14.6106 2.41309 14.3791 2.75 13.635 3.46484L12.7034 4.34961V4.38184H14.675V5H11.7043Z"
                fill="black"
              />
            </svg>
            <svg
              className="h-[1.195vb] w-[5vb]"
              width="34"
              height="6"
              viewBox="0 0 34 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.231 1.24608C16.4364 1.24613 17.5956 1.71201 18.4692 2.54742C18.535 2.61192 18.6402 2.61111 18.7049 2.5456L19.3338 1.90724C19.3666 1.87401 19.3849 1.82901 19.3846 1.78218C19.3843 1.73535 19.3655 1.69057 19.3323 1.65773C17.0394 -0.552577 13.4222 -0.552577 11.1293 1.65773C11.0961 1.69054 11.0772 1.73532 11.0769 1.78214C11.0766 1.82897 11.0949 1.87399 11.1276 1.90724L11.7567 2.5456C11.8214 2.61121 11.9266 2.61202 11.9924 2.54742C12.8661 1.71196 14.0255 1.24608 15.231 1.24608ZM15.231 3.32294C15.8933 3.3229 16.5319 3.57051 17.0228 4.01766C17.0892 4.08112 17.1938 4.07975 17.2585 4.01456L17.8866 3.3762C17.9197 3.34272 17.9381 3.29729 17.9376 3.25009C17.9371 3.20289 17.9178 3.15785 17.8841 3.12505C16.3892 1.72628 14.0741 1.72628 12.5791 3.12505C12.5454 3.15785 12.5261 3.20291 12.5257 3.25013C12.5252 3.29735 12.5436 3.34276 12.5768 3.3762L13.2047 4.01456C13.2694 4.07975 13.374 4.08112 13.4404 4.01766C13.931 3.57081 14.5691 3.32322 15.231 3.32294ZM16.438 4.84644C16.4716 4.81328 16.4901 4.76764 16.4892 4.72031C16.4882 4.67297 16.4679 4.62814 16.433 4.59638C15.7391 4.00605 14.7229 4.00605 14.029 4.59638C13.9941 4.62811 13.9737 4.67294 13.9727 4.72027C13.9717 4.7676 13.9902 4.81325 14.0237 4.84644L15.1104 5.94935C15.1422 5.98176 15.1857 6 15.231 6C15.2763 6 15.3197 5.98176 15.3516 5.94935L16.438 4.84644Z"
                fill="black"
              />
              <path
                d="M22.5801 1.47929C22.5801 1.15249 22.845 0.887573 23.1718 0.887573H31.3079C31.6347 0.887573 31.8996 1.15249 31.8996 1.47929V4.28994C31.8996 4.61674 31.6347 4.88166 31.3079 4.88166H23.1718C22.845 4.88166 22.5801 4.61674 22.5801 4.28994V1.47929Z"
                fill="black"
              />
              <path
                opacity="0.4"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M23.1717 0.443787H31.3078C31.8797 0.443787 32.3433 0.907398 32.3433 1.47929V4.28994C32.3433 4.86183 31.8797 5.32544 31.3078 5.32544H23.1717C22.5998 5.32544 22.1362 4.86183 22.1362 4.28994V1.47929C22.1362 0.907398 22.5998 0.443787 23.1717 0.443787ZM21.6924 1.47929C21.6924 0.662301 22.3547 0 23.1717 0H31.3078C32.1248 0 32.7871 0.662301 32.7871 1.47929V4.28994C32.7871 5.10693 32.1248 5.76923 31.3078 5.76923H23.1717C22.3547 5.76923 21.6924 5.10693 21.6924 4.28994V1.47929ZM33.9705 2.88461C33.9705 3.33929 33.6549 3.72025 33.2308 3.82042V1.94881C33.6549 2.04898 33.9705 2.42994 33.9705 2.88461Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.61532 0.461548C7.19473 0.461548 6.85378 0.802501 6.85378 1.22309V4.77693C6.85378 5.19752 7.19473 5.53847 7.61532 5.53847C8.0359 5.53847 8.37685 5.19752 8.37685 4.77693V1.22309C8.37685 0.8025 8.0359 0.461548 7.61532 0.461548ZM4.5693 2.23845C4.5693 1.81786 4.91025 1.47691 5.33084 1.47691C5.75142 1.47691 6.09238 1.81786 6.09238 2.23845V4.77691C6.09238 5.1975 5.75142 5.53845 5.33084 5.53845C4.91025 5.53845 4.5693 5.1975 4.5693 4.77691V2.23845ZM3.04613 2.49233C2.62555 2.49233 2.28459 2.83328 2.28459 3.25387V4.77694C2.28459 5.19753 2.62555 5.53848 3.04613 5.53848C3.46672 5.53848 3.80767 5.19753 3.80767 4.77694V3.25387C3.80767 2.83328 3.46672 2.49233 3.04613 2.49233ZM0.507692 5.53847C0.227302 5.53847 0 5.31117 0 5.03078V3.76155C0 3.48116 0.227302 3.25386 0.507692 3.25386H1.01538C1.29578 3.25386 1.52308 3.48116 1.52308 3.76155V5.03078C1.52308 5.31117 1.29578 5.53847 1.01538 5.53847H0.507692Z"
                fill="black"
              />
            </svg>
          </header>
          <main>
            <header
              className={cn(
                'sticky z-10 grid h-[4vb] w-full shrink-0 grid-cols-3 items-center bg-white px-[1vb] text-body1-bold duration-300',
              )}
            >
              <svg
                className="aspect-square  h-[1.2vb] w-fit"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.6187 23.6187C18.277 23.9604 17.723 23.9604 17.3813 23.6187L8.38128 14.6187C8.21719 14.4546 8.125 14.2321 8.125 14C8.125 13.7679 8.21719 13.5454 8.38128 13.3813L17.3813 4.38128C17.723 4.03957 18.277 4.03957 18.6187 4.38128C18.9604 4.72299 18.9604 5.27701 18.6187 5.61872L10.2374 14L18.6187 22.3813C18.9604 22.723 18.9604 23.277 18.6187 23.6187Z"
                  fill="#111111"
                />
              </svg>

              <div className="flex justify-center">
                <Logo />
              </div>

              <div className="flex justify-end gap-x-[0.4vb]">
                <svg
                  className="aspect-square  h-[1.2vb] w-fit"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22.862 20.4163L21.428 17.4859C20.9161 16.4395 20.6499 15.2901 20.6499 14.1252V10.733C20.6499 7.06032 17.6726 4.08301 13.9999 4.08301C10.3272 4.08301 7.34991 7.06032 7.34991 10.733V14.1252C7.34991 15.2901 7.08376 16.4395 6.57178 17.4858L5.13783 20.4163H22.862ZM13.9999 2.33301C9.36072 2.33301 5.59991 6.09382 5.59991 10.733V14.1252C5.59991 15.0235 5.39468 15.9098 4.99988 16.7167L3.49743 19.7872C2.96014 20.8852 3.75955 22.1663 4.98199 22.1663H23.0178C24.2403 22.1663 25.0397 20.8852 24.5024 19.7872L23 16.7167C22.6052 15.9098 22.3999 15.0235 22.3999 14.1252V10.733C22.3999 6.09382 18.6391 2.33301 13.9999 2.33301Z"
                    fill="#111111"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.5 20.417V22.167C17.5 24.1 15.933 25.667 14 25.667C12.067 25.667 10.5 24.1 10.5 22.167V20.417H17.5ZM12.25 22.167H15.75C15.75 23.1335 14.9665 23.917 14 23.917C13.0335 23.917 12.25 23.1335 12.25 22.167Z"
                    fill="#111111"
                  />
                </svg>
                <svg
                  className="aspect-square  h-[1.2vb] w-fit"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.8274 4.08301L12.4093 6.31315C12.2312 7.26267 11.6143 7.98325 10.8912 8.38471C10.8137 8.42772 10.7372 8.47229 10.6617 8.5184C9.94929 8.95348 9.00829 9.13331 8.08875 8.80984L6.18523 8.14024L5.0126 10.1713L6.55066 11.4905C7.28734 12.1223 7.60323 13.0228 7.58495 13.8554C7.5839 13.9033 7.58337 13.9514 7.58337 13.9997C7.58337 14.0988 7.5856 14.1972 7.59001 14.295C7.62851 15.1489 7.31639 16.0811 6.55885 16.7308L5.0126 18.0571L6.18523 20.0881L8.33045 19.3335C9.21743 19.0215 10.1256 19.1783 10.8259 19.5779C10.8476 19.5903 10.8693 19.6025 10.8912 19.6146C11.6143 20.0161 12.2312 20.7367 12.4093 21.6862L12.8274 23.9163H15.1727L15.5908 21.6862C15.7689 20.7367 16.3858 20.0161 17.1089 19.6146C17.1307 19.6025 17.1525 19.5903 17.1742 19.5779C17.8745 19.1783 18.7826 19.0215 19.6696 19.3335L21.8148 20.0881L22.9875 18.0571L21.4412 16.7308C20.6837 16.0811 20.3716 15.1489 20.4101 14.295C20.4145 14.1972 20.4167 14.0988 20.4167 13.9997C20.4167 13.9514 20.4162 13.9033 20.4151 13.8554C20.3968 13.0228 20.7127 12.1223 21.4494 11.4905L22.9875 10.1713L21.8148 8.14024L19.9113 8.80984C18.9918 9.13331 18.0508 8.95348 17.3383 8.5184C17.2629 8.47229 17.1864 8.42772 17.1089 8.38471C16.3858 7.98325 15.7689 7.26266 15.5908 6.31315L15.1727 4.08301H12.8274ZM18.0834 13.9997C18.0834 16.2548 16.2552 18.083 14 18.083C11.7449 18.083 9.9167 16.2548 9.9167 13.9997C9.9167 11.7445 11.7449 9.91634 14 9.91634C16.2552 9.91634 18.0834 11.7445 18.0834 13.9997ZM15.6568 2.33301C16.2182 2.33301 16.7 2.73287 16.8035 3.28467L17.3108 5.99065C17.3804 6.3618 17.6282 6.6714 17.9583 6.85469C18.057 6.90945 18.1544 6.9662 18.2504 7.02488C18.5756 7.22346 18.9712 7.28543 19.3306 7.159L21.6908 6.32875C22.2204 6.14245 22.8076 6.35977 23.0883 6.84597L24.7451 9.71555C25.0258 10.2018 24.9204 10.8189 24.4943 11.1844L22.5887 12.8188C22.3007 13.0659 22.1564 13.4376 22.1647 13.817C22.166 13.8777 22.1667 13.9386 22.1667 13.9997C22.1667 14.1251 22.1639 14.2498 22.1583 14.3738C22.1407 14.7635 22.2844 15.1485 22.5805 15.4025L24.4943 17.0439C24.9204 17.4094 25.0258 18.0266 24.7451 18.5128L23.0883 21.3824C22.8076 21.8686 22.2204 22.0859 21.6908 21.8996L19.0889 20.9843C18.7421 20.8623 18.3608 20.9157 18.0415 21.0979C18.0139 21.1136 17.9861 21.1292 17.9583 21.1447C17.6282 21.328 17.3804 21.6376 17.3108 22.0087L16.8035 24.7147C16.7 25.2665 16.2182 25.6663 15.6568 25.6663H12.3433C11.7819 25.6663 11.3001 25.2665 11.1966 24.7147L10.6892 22.0087C10.6196 21.6376 10.3719 21.328 10.0418 21.1447C10.0139 21.1292 9.98621 21.1136 9.9586 21.0979C9.6393 20.9157 9.25795 20.8623 8.91116 20.9843L6.30925 21.8996C5.77964 22.0859 5.19245 21.8686 4.91174 21.3824L3.25499 18.5128C2.97428 18.0266 3.07967 17.4094 3.50581 17.0439L5.41954 15.4025C5.71566 15.1485 5.85936 14.7635 5.84179 14.3738C5.83619 14.2498 5.83337 14.1251 5.83337 13.9997C5.83337 13.9386 5.83404 13.8777 5.83537 13.817C5.8437 13.4376 5.69941 13.0659 5.41135 12.8188L3.50581 11.1844C3.07967 10.8189 2.97428 10.2018 3.25499 9.71555L4.91174 6.84597C5.19245 6.35977 5.77965 6.14245 6.30925 6.32875L8.66946 7.159C9.02889 7.28543 9.42446 7.22346 9.74964 7.02488C9.84572 6.9662 9.94311 6.90945 10.0417 6.85469C10.3719 6.6714 10.6196 6.3618 10.6892 5.99065L11.1966 3.28467C11.3001 2.73287 11.7819 2.33301 12.3433 2.33301H15.6568ZM16.3334 13.9997C16.3334 15.2883 15.2887 16.333 14 16.333C12.7114 16.333 11.6667 15.2883 11.6667 13.9997C11.6667 12.711 12.7114 11.6663 14 11.6663C15.2887 11.6663 16.3334 12.711 16.3334 13.9997Z"
                    fill="black"
                  />
                </svg>
              </div>
            </header>
            <div
              className={cn(
                'sticky -top-[0.4vb] z-10 mb-[0.6vb] space-y-[0.6vb] bg-white px-[0.75vb] duration-300',
              )}
            >
              <div className="z-10 flex h-[2vb] items-center gap-x-[0.6vb] bg-white px-[0.4vb]">
                {filters.map((filter, index) => (
                  <button
                    key={filter.text}
                    onContextMenu={(event) => {
                      event.preventDefault()
                    }}
                    draggable={false}
                    onClick={() =>
                      setFilterIndex({ typeIdx: index, valueIdx: 0 })
                    }
                    className={cn(
                      'whitespace-nowrap text-[1vb] font-bold text-text-sub-gray76 transition-colors',
                      'origin-center select-none transition-transform active:scale-95',

                      index === filterIndex.typeIdx && 'text-text-main-black11',
                    )}
                  >
                    {filter.text}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                {filters[filterIndex.typeIdx].items.length && (
                  <motion.div
                    key={filterIndex.typeIdx ?? 'defaultKnowState'}
                    {...fadeInProps}
                    variants={{
                      ...fadeInProps.variants,
                      animate: {
                        ...(fadeInProps.variants?.animate ?? {}),
                        transition: {
                          staggerChildren: 0.05,
                        },
                      },
                    }}
                    className={cn(
                      '-z-[1] flex w-screen items-center space-x-2 overflow-y-hidden overflow-x-scroll bg-white px-[0.4vb] pb-[0.4vb] scrollbar-hide',
                    )}
                  >
                    {filters[filterIndex.typeIdx].items.map((item, idx) => (
                      <FilterButton
                        selected={filterIndex.valueIdx === idx}
                        onClick={() =>
                          setFilterIndex((prev) => ({ ...prev, valueIdx: idx }))
                        }
                        key={item.value}
                        label={item.label}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex flex-col divide-y-[0.6vb] divide-line-soft">
              <Section className="pt-[0.5vb]">
                <Step3TreeInfo filter={selectedFilter} />
              </Section>
              {/* 가장 중요한 것 - 파이차트 */}
              <Section>
                <Step3BestWorth filter={selectedFilter} />
              </Section>
              {/* 이런사람이에요 - 박스 */}
              <Section>
                <Step3Character filter={selectedFilter} />
              </Section>
              <Section>
                <Step3Money filter={selectedFilter} />
              </Section>
              {/* 기쁠 떄 */}
              <Section>
                <Step3Happy filter={selectedFilter} />
              </Section>
              <Section>
                <Step3Sad filter={selectedFilter} />
              </Section>
            </div>
          </main>
        </div>
        <footer className="flex h-[2vb] w-full items-end justify-center">
          <div className="h-[0.3vb] w-1/3 rounded-full bg-black" />
        </footer>
      </section>
    </div>
  )
}

export default OnboardStep3

function Section({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <section
      {...props}
      className={cn(
        'flex flex-col overflow-x-hidden bg-text-main-whiteFF px-[1.4vb] pb-[1.2vb] pt-[1vb]',
        props.className,
      )}
    >
      {children}
    </section>
  )
}

interface FilterButtonProps {
  selected?: boolean
  label: string
  onClick?: () => void
}

const FilterButton = ({
  label,
  onClick,
  selected = false,
}: FilterButtonProps) => {
  const [ref, animate] = useAnimate<HTMLButtonElement>()

  useEffect(() => {
    animate(
      ref.current,
      selected
        ? {
            backgroundColor: '#111111',
            color: '#FFFFFF',
          }
        : {
            backgroundColor: '#FAFAFA',
            color: '#000000',
          },
      {
        duration: 0.2,
        type: 'tween',
        ease: 'backInOut',
      },
    )
  }, [animate, ref, selected])

  return (
    <motion.button
      ref={ref}
      onContextMenu={(event) => {
        event.preventDefault()
      }}
      onClick={onClick}
      draggable={false}
      variants={fadeInProps.variants}
      className={cn(
        'avoid-min-w  h-[2vb] whitespace-nowrap rounded-full px-[0.4vb] text-[0.8vb]',
        'origin-center select-none',
        selected && 'text-text-main-whiteFF',
      )}
    >
      {label}
    </motion.button>
  )
}
