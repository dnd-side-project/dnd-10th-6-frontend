import { Button } from '@/components/ui'
import Confetti from '@/components/confetti'
import { FilterType } from '@/hooks/use-filter'
import { cn } from '@/lib/client/utils'
import { SHORT_TYPE_LIST } from '@/model/question.entity'
import { getQuestionByTypeQuery } from '@/queries/question'
import { useQuery } from '@tanstack/react-query'
import { HTMLAttributes } from 'react'

const SHORT_FILTER: { [key in SHORT_TYPE_LIST[number]]: string } = {
  FIRST_IMPRESSION: '👀 나의 첫인상은?',
  CHARACTER_CELEBRITY_ASSOCIATION: '🤔 나는 누구와 닮았나요?',
  FIVE_LETTER_WORD: '🧐 나를 5글자로 표현한다면?',
  LEARNING_ASPIRATION: '📚 나의 이런점은 꼭 배우고 싶어요!',
  SECRET_PLEASURE: '😍 내가 혼자 몰래 좋아하고 있는 것은?',
  MOST_USED_WORD: '💬 내가 가장 많이 사용하는 단어는?',
}

const Step3TreeInfo = ({}: { filter: FilterType }) => {
  const { data: short } = useQuery({
    ...getQuestionByTypeQuery('SHORT_ANSWER', 'NAMUI'),
    select(data) {
      return data.data
    },
  })

  return (
    <>
      <div className="bg-bg-gray1 flex flex-col gap-y-[0.6vb] rounded-[1vb] px-[1.2vb] py-[2vb]">
        <div className="flex items-center justify-between">
          <p className="text-start text-[1vb] text-text-sub-gray4f">
            내 정원에 심어진 나무는
            <br />
            <b className="mt-[0.4vb] text-[1.4vb] font-bold text-black">
              총 11그루
            </b>
          </p>
          <div className="flex h-[4vb] w-[4vb] items-center justify-center rounded-full bg-text-main-whiteFF p-[0.6vb]">
            <svg
              className="h-full"
              width="39"
              height="52"
              viewBox="0 0 39 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.3676 0.693745C17.4693 1.64148 16.0986 11.5137 15.9005 16.3314C15.8079 17.8714 14.5932 18.1084 9.12604 21.7809C4.75234 24.7189 6.90749 28.3756 8.53178 29.8367C5.40205 30.6264 -0.619717 33.2959 0.331088 37.6555C1.28189 42.015 5.71897 42.789 7.81866 42.6311C7.6602 42.868 8.00882 44.1711 10.6711 47.4882C13.3333 50.8053 17.9606 48.8703 19.9414 47.4882C28.9741 55.9231 31.5492 50.055 31.7076 46.0666C33.6489 46.8959 37.7928 47.1091 38.8387 41.3279C39.8845 35.5468 33.3319 29.0469 29.9249 26.5196C39.0764 28.8889 32.5396 19.4115 29.2118 15.739C25.884 12.0666 26.2405 -0.490924 21.3676 0.693745Z"
                fill="#00BC68"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.8191 1.29087C22.4157 1.08367 21.9531 1.02144 21.4019 1.15585C20.529 1.3687 19.7653 2.09216 19.1068 3.19404C18.451 4.29132 17.9215 5.72788 17.502 7.29755C16.6634 10.4354 16.2775 14.056 16.1801 16.4316L16.1799 16.436C16.1549 16.8532 16.0516 17.1986 15.8117 17.5342C15.5786 17.8604 15.225 18.1648 14.7268 18.5204C14.2593 18.8542 13.6461 19.2455 12.8556 19.75C12.8015 19.7845 12.7466 19.8196 12.6909 19.8551C11.8179 20.4124 10.7322 21.1081 9.38449 22.0162C8.33035 22.7264 7.68457 23.4699 7.32349 24.1975C6.96315 24.9236 6.8798 25.647 6.97057 26.3303C7.1535 27.707 8.04611 28.9276 8.82353 29.6291C8.88785 29.6871 8.91498 29.7758 8.89413 29.8598C8.87327 29.9439 8.80782 30.0097 8.72385 30.0309C7.19692 30.4174 4.96783 31.2639 3.24369 32.5392C1.51541 33.8176 0.354397 35.4763 0.794549 37.5006C1.2462 39.5777 2.52043 40.7961 3.94008 41.4826C5.36824 42.1733 6.93969 42.3221 7.94409 42.2463C8.03361 42.2396 8.11916 42.2844 8.16447 42.3619C8.20677 42.4342 8.2071 42.5232 8.16645 42.5954C8.16577 42.6001 8.16492 42.6085 8.16483 42.6214C8.16458 42.6596 8.17128 42.7216 8.19397 42.8123C8.23927 42.9935 8.34119 43.2617 8.53423 43.6343C8.91965 44.3782 9.6529 45.5092 10.9629 47.1463C12.2107 48.7057 13.9164 49.0386 15.5784 48.8065C17.2481 48.5733 18.8456 47.7705 19.8027 47.1007C19.8937 47.037 20.0168 47.0457 20.0979 47.1217C22.3174 49.2005 24.1236 50.3818 25.5793 50.935C27.0302 51.4864 28.1179 51.4094 28.9297 50.9955C29.7479 50.5784 30.3288 49.7973 30.7162 48.8575C31.1031 47.9188 31.2877 46.8429 31.326 45.8751C31.3291 45.7979 31.37 45.7272 31.4353 45.6859C31.5007 45.6447 31.5821 45.6382 31.6532 45.6686C32.5737 46.0631 34.0093 46.3056 35.3269 45.7752C36.6263 45.2521 37.868 43.9533 38.374 41.1476C38.8732 38.38 37.5606 35.4056 35.6617 32.7816C33.7686 30.1656 31.3272 27.9459 29.6594 26.705C29.5693 26.638 29.5393 26.5165 29.5878 26.4152C29.6364 26.3139 29.7499 26.2612 29.8586 26.2895C30.9762 26.5797 31.8378 26.6839 32.4862 26.6466C33.1344 26.6094 33.5479 26.4325 33.8007 26.1828C34.0512 25.9353 34.1767 25.5837 34.1815 25.1256C34.1864 24.6645 34.0681 24.1134 33.8491 23.4996C32.9697 21.0351 30.5589 17.8056 28.9209 15.9924C28.061 15.0407 27.4548 13.5356 26.9497 11.8739C26.6352 10.8391 26.3535 9.71921 26.0752 8.61285C25.9065 7.94228 25.7391 7.27668 25.5664 6.63797C25.1037 4.92726 24.6015 3.40227 23.9292 2.37902C23.5948 1.86999 23.2283 1.50104 22.8191 1.29087ZM27.3991 11.7374C27.903 13.3953 28.4855 14.81 29.2694 15.6777C30.9187 17.5033 33.3803 20.7884 34.2914 23.3419C34.5201 23.9827 34.6568 24.5925 34.6511 25.1305C34.6454 25.6716 34.4947 26.1572 34.1307 26.5168C33.769 26.8741 33.2294 27.0742 32.5132 27.1154C32.026 27.1434 31.447 27.0986 30.7668 26.9737C32.3811 28.2886 34.4096 30.2504 36.0422 32.5063C37.9629 35.1605 39.3702 38.2703 38.8362 41.2309C38.3091 44.1533 36.9874 45.6129 35.5023 46.2108C34.1791 46.7435 32.7721 46.5728 31.7772 46.2207C31.7118 47.1423 31.5192 48.1416 31.1504 49.0364C30.7379 50.037 30.0958 50.9281 29.1431 51.4138C28.184 51.9028 26.953 51.9594 25.4124 51.3739C23.9083 50.8022 22.0951 49.6144 19.9147 47.5928C18.9029 48.2687 17.3163 49.0379 15.6433 49.2715C13.8731 49.5187 11.9784 49.167 10.5962 47.4396C9.27625 45.7901 8.52234 44.6322 8.11722 43.8502C7.91498 43.4599 7.79578 43.1558 7.73836 42.9262C7.72086 42.8562 7.70843 42.7905 7.70153 42.7295C6.63569 42.7653 5.12657 42.578 3.73557 41.9053C2.21025 41.1676 0.823249 39.8428 0.335637 37.6003C-0.163471 35.3049 1.18021 33.4814 2.96437 32.1618C4.60448 30.9486 6.66751 30.1187 8.2053 29.6839C7.45833 28.9117 6.6832 27.733 6.50503 26.3921C6.40307 25.6247 6.49729 24.806 6.90279 23.9888C7.30755 23.1732 8.01588 22.3721 9.12204 21.6268C10.4747 20.7155 11.5643 20.0173 12.4381 19.4594C12.4919 19.4251 12.5448 19.3913 12.5969 19.3581C13.3937 18.8495 13.9968 18.4647 14.4539 18.1383C14.9423 17.7897 15.2433 17.5219 15.4297 17.2612C15.6089 17.0104 15.69 16.7547 15.7109 16.4101C15.8094 14.0122 16.1984 10.3565 17.0483 7.17636C17.4731 5.58655 18.0164 4.10327 18.7037 2.95321C19.3882 1.80775 20.238 0.956362 21.2906 0.699696C21.9428 0.540655 22.5222 0.610478 23.0337 0.873249C23.5395 1.13306 23.9609 1.57202 24.3217 2.12125C25.04 3.21451 25.5578 4.80742 26.0197 6.51542C26.1973 7.1722 26.3665 7.84518 26.5358 8.51827C26.8113 9.6142 27.087 10.7104 27.3991 11.7374Z"
                fill="#111111"
              />
              <path
                d="M19.7427 17.7745C21.2428 17.3364 20.6321 18.078 20.1393 18.5035C20.1694 19.6954 20.6317 22.3448 22.2398 23.4072C23.8479 24.4696 24.4104 20.7033 24.4906 18.6874C24.2655 18.6209 23.5715 18.2874 23.8357 18.0044C24.0147 17.8126 24.7105 17.5286 25.4191 17.6155C26.1289 17.7025 25.3296 18.6089 24.9408 18.8204C25.1626 19.8649 25.2772 22.3218 23.9614 23.7934C22.3167 25.6327 21.232 24.3333 20.5514 22.9085C20.007 21.7687 19.6081 19.6112 19.4767 18.6749C18.9404 18.5573 18.2427 18.2125 19.7427 17.7745Z"
                fill="#111111"
              />
              <path
                d="M17.3002 13.4257C17.3857 14.9592 18.4259 16.1482 19.6236 16.0814C20.8212 16.0147 21.7228 14.7174 21.6373 13.1839C21.5517 11.6504 20.5115 10.4614 19.3139 10.5281C18.1162 10.5949 17.2147 11.8922 17.3002 13.4257Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.5986 15.6341C18.7447 15.6817 17.8254 14.7965 17.7476 13.4008C17.6697 12.0051 18.4849 11.0231 19.3388 10.9755C20.1927 10.9279 21.112 11.8131 21.1899 13.2088C21.2677 14.6045 20.4525 15.5864 19.5986 15.6341ZM19.6236 16.0814C18.4259 16.1482 17.3857 14.9592 17.3002 13.4257C17.2147 11.8922 18.1162 10.5949 19.3139 10.5281C20.5115 10.4614 21.5517 11.6504 21.6373 13.1839C21.7228 14.7174 20.8212 16.0147 19.6236 16.0814Z"
                fill="#111111"
              />
              <path
                d="M17.8875 14.136C17.9388 15.2099 18.7266 16.0448 19.6471 16.0008C20.5676 15.9568 21.2722 15.0506 21.2209 13.9767C21.1695 12.9028 20.3817 12.0679 19.4613 12.1119C18.5408 12.1559 17.8362 13.0621 17.8875 14.136Z"
                fill="#111111"
              />
              <path
                d="M22.1317 13.1898C22.1194 14.7256 23.0225 15.9779 24.1488 15.9869C25.2751 15.9959 26.198 14.7581 26.2103 13.2223C26.2225 11.6864 25.3194 10.4341 24.1931 10.4252C23.0668 10.4162 22.1439 11.654 22.1317 13.1898Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.0767 14.8988C22.773 14.4777 22.5743 13.876 22.5797 13.1934C22.5852 12.5107 22.7935 11.9122 23.1038 11.496C23.4144 11.0795 23.8034 10.8701 24.1895 10.8732C24.5757 10.8763 24.9613 11.0919 25.2652 11.5132C25.5689 11.9343 25.7676 12.536 25.7622 13.2187C25.7568 13.9014 25.5485 14.4998 25.2381 14.9161C24.9275 15.3325 24.5385 15.5419 24.1524 15.5389C23.7663 15.5358 23.3806 15.3202 23.0767 14.8988ZM24.1488 15.9869C23.0225 15.9779 22.1194 14.7256 22.1317 13.1898C22.1439 11.654 23.0668 10.4162 24.1931 10.4252C25.3194 10.4341 26.2225 11.6864 26.2103 13.2223C26.198 14.7581 25.2751 15.9959 24.1488 15.9869Z"
                fill="#111111"
              />
              <path
                d="M22.5455 13.6345C22.4085 14.7009 23.0385 15.6605 23.9525 15.7779C24.8665 15.8953 25.7185 15.1261 25.8555 14.0597C25.9925 12.9934 25.3626 12.0337 24.4485 11.9163C23.5345 11.7989 22.6825 12.5682 22.5455 13.6345Z"
                fill="#111111"
              />
            </svg>
          </div>
        </div>
        <Confetti className="pointer-events-none fixed left-[200%] top-0 h-full w-full">
          <Button className="h-[3vb] rounded-[0.3vb] py-[0.8vb] text-[1vb]">
            <span className="text-[1.4vb] leading-normal ">링크 공유하기</span>
          </Button>
        </Confetti>
      </div>
      <h3 className="text-st mb-[1.4vb] mt-[2.2vb] text-start text-[1.6vb] font-bold tracking-tighter">
        김디엔님에 대해 알아보세요!
      </h3>
      {/* !DELETE */}
      {short?.length ? (
        <>
          <div className="avoid-min-w relative flex w-[22vb] space-x-[1vb] overflow-x-scroll px-[0.6vb] pl-[0.6vb] scrollbar-hide">
            {short.slice(0, short.length / 2).map((item) => (
              <Badge
                key={item.id}
                onClick={() => {}}
                title={SHORT_FILTER[item.name]}
              />
            ))}
          </div>
          <div className="avoid-min-w relative mt-[1vb] flex w-[22vb] space-x-[1vb] overflow-x-scroll px-[0.6vb] pl-[0.6vb] scrollbar-hide">
            {short.slice(short.length / 2, short.length).map((item) => (
              <Badge
                key={item.id}
                onClick={() => {}}
                title={SHORT_FILTER[item.name]}
              />
            ))}
          </div>
        </>
      ) : null}
    </>
  )
}

export default Step3TreeInfo

interface BadgeProps extends HTMLAttributes<HTMLButtonElement> {
  title: string
  scroll?: boolean
  replace?: boolean
  prefetch?: boolean
}

const Badge = ({ title, ...rest }: BadgeProps) => {
  return (
    <button
      {...rest}
      onContextMenu={(event) => {
        event.preventDefault()
      }}
      className={cn(
        'rounded-full border border-line-medium text-[1vb]',
        'avoid-min-w flex w-fit grow select-none items-center whitespace-nowrap px-[1vb] py-[0.8vb] duration-150 ease-easeOutQuint',
        'active:border-gray-gray800 active:bg-gray-gray100 active:scale-[0.98]',
        rest.className,
      )}
    >
      {title}
      <svg
        className="ml-[1vb] "
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="fill-text-sub-gray76"
          d="M3 7.5C2.72386 7.5 2.5 7.72386 2.5 8C2.5 8.27614 2.72386 8.5 3 8.5V7.5ZM13.3536 8.35355C13.5488 8.15829 13.5488 7.84171 13.3536 7.64645L10.1716 4.46447C9.97631 4.2692 9.65973 4.2692 9.46447 4.46447C9.2692 4.65973 9.2692 4.97631 9.46447 5.17157L12.2929 8L9.46447 10.8284C9.2692 11.0237 9.2692 11.3403 9.46447 11.5355C9.65973 11.7308 9.97631 11.7308 10.1716 11.5355L13.3536 8.35355ZM3 8.5H13V7.5H3V8.5Z"
          fill="currentColor"
        />
      </svg>
    </button>
  )
}
