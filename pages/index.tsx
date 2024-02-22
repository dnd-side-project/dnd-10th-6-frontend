import { GetServerSideProps } from 'next'
import Button from '@/components/button'
import Logo from '@/components/ui/logo'
import { useSession } from '@/provider/session-provider'
import { useRouter } from 'next/router'
import BaseLayout from '@/layout/base-layout'
import { ReactNode } from 'react'
import { useMount } from '@/hooks/use-mount'
import { useBrowserLayoutEffect } from '@/lib/client/utils'

const Page = () => {
  const { signin, data } = useSession()
  const router = useRouter()
  const mounted = useMount()
  useBrowserLayoutEffect(() => {
    if (data?.user) {
      if (data.user && !data.user.name) {
        router.replace('/signup', undefined, { shallow: true })
      }
    }
  }, [data, router])

  return !mounted ? (
    <>Loading...</>
  ) : (
    <div className="h-calc-h flex flex-col px-5 py-4">
      <section className="grow flex flex-col text-center justify-center items-center space-y-16">
        <div className="flex flex-col space-y-4">
          <div className="h-[38px]">
            <Logo />
          </div>
          <h2 className="text-subTitle1-medium">남이 써주는 나의 소개서</h2>
        </div>
        <svg
          width="189"
          height="270"
          viewBox="0 0 189 270"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M107.14 63.4301C108.377 66.0357 108.703 68.7267 108.277 70.9506C107.85 73.1753 106.693 74.86 105.013 75.6574C103.333 76.4548 101.296 76.2863 99.3023 75.2105C97.3095 74.1351 95.4312 72.1805 94.1944 69.5749C92.9576 66.9692 92.6308 64.2782 93.0575 62.0543C93.4843 59.8296 94.6416 58.1449 96.3215 57.3475C98.0015 56.5501 100.038 56.7186 102.032 57.7944C104.025 58.8699 105.903 60.8244 107.14 63.4301Z"
            fill="white"
            stroke="#111111"
            strokeWidth="2"
          />
          <ellipse
            cx="100.608"
            cy="63.6897"
            rx="6.68039"
            ry="7.79379"
            transform="rotate(-32.2559 100.608 63.6897)"
            fill="#111111"
          />
          <path
            d="M103.059 252.802C104.404 250.025 103.48 209 102.595 192.414L106.369 171.811L88.4689 177.103C88.4418 193.473 88.1434 230.032 87.1664 245.306C86.1893 260.58 86.8479 264.515 87.2993 264.573C91.9215 271.069 115.233 266.594 119.857 265.823C124.901 264.983 143.896 262.315 137.926 253.642C133.3 246.922 101.377 256.273 103.059 252.802Z"
            fill="#FFEB34"
            stroke="#111111"
            strokeWidth="2"
          />
          <path
            d="M70.7327 249.83C72.2892 247.24 74.5959 209.412 74.9342 192.772L80.2458 172.316L61.8777 175.241C60.6393 191.547 57.6347 227.932 55.5234 243.021C53.412 258.111 55.2615 259.693 55.2615 259.693C59.4229 266.771 78.3227 266.991 83.0278 266.9C88.5761 266.793 107.726 267.897 103.176 258.096C98.6249 248.295 68.7871 253.068 70.7327 249.83Z"
            fill="#FFEB34"
            stroke="#111111"
            strokeWidth="2"
          />
          <path
            d="M74.2816 26.3757C61.1868 31.8176 61.7911 67.1478 63.7302 84.1327C64.2477 89.5781 60.1355 91.0696 43.0504 106.911C29.3824 119.583 38.9046 131.22 45.3743 135.455C34.8769 139.925 15.3074 152.554 21.0081 167.309C26.7088 182.064 42.6251 182.36 49.8706 180.664C49.4467 181.58 51.3756 185.956 62.4832 196.127C73.5907 206.298 88.6918 197.001 94.8539 191.081C131.001 215.713 136.788 193.755 135.164 179.697C142.395 181.545 156.981 180.037 157.477 159.215C157.972 138.393 131.542 119.189 118.265 112.19C151.514 115.509 123.513 85.8664 109.888 74.8124C96.2622 63.7584 90.6501 19.5733 74.2816 26.3757Z"
            fill="#00BC68"
            stroke="#111111"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M94.9613 67.1881C95.8999 69.9154 95.9246 72.626 95.2525 74.7885C94.5803 76.9517 93.2424 78.4969 91.484 79.102C89.7256 79.7071 87.7202 79.3125 85.8591 78.0211C83.9986 76.7302 82.35 74.5784 81.4114 71.8511C80.4728 69.1237 80.4481 66.4131 81.1202 64.2506C81.7924 62.0874 83.1304 60.5422 84.8887 59.9371C86.6471 59.332 88.6526 59.7266 90.5136 61.018C92.3741 62.309 94.0228 64.4607 94.9613 67.1881Z"
            fill="white"
            stroke="#111111"
            strokeWidth="2"
          />
          <ellipse
            cx="88.4407"
            cy="66.7177"
            rx="6.68039"
            ry="7.79379"
            transform="rotate(-25.8537 88.4407 66.7177)"
            fill="#111111"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M111.397 81.9411C110.586 81.4908 109.563 81.7834 109.112 82.5946C108.792 83.1722 108.105 84.0779 107.178 84.7583C106.267 85.4272 105.253 85.791 104.165 85.613C103.249 85.4632 102.386 86.0841 102.236 86.9999C102.086 87.9156 102.707 88.7793 103.623 88.9291C105.867 89.2962 107.777 88.4866 109.166 87.4673C110.539 86.4594 111.53 85.1621 112.05 84.2255C112.501 83.4143 112.208 82.3915 111.397 81.9411Z"
            fill="#111111"
          />
          <path
            d="M128.678 12.6739C128.678 3.53781 130.877 1.84594 132.738 1L169.79 2.52269L186.54 13.1815L170.419 23.4807C169.633 24.1957 168.857 24.641 168.267 24.8554H138.321C132.231 24.3478 128.678 23.8403 128.678 12.6739Z"
            fill="#FAA71E"
          />
          <path
            d="M168.267 24.8554H138.321C132.231 24.3478 128.678 23.8403 128.678 12.6739C128.678 3.53781 130.877 1.84594 132.738 1L169.79 2.52269M168.267 24.8554L186.54 13.1815L169.79 2.52269M168.267 24.8554C170.129 24.1787 173.851 21.201 173.851 14.7042C173.851 8.20738 171.144 3.87618 169.79 2.52269"
            stroke="#111111"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M135.277 20.7952C135.615 20.1184 137.307 17.5074 137.307 12.1666C137.307 8.78286 136.394 1.91386 132.739 1.50781"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M182.852 15.9997C182.113 14.5974 182.028 11.7251 182.598 10.2752C182.762 9.85706 183.257 9.7816 183.645 10.0074C184.588 10.5557 186.354 11.6053 187.671 12.5194C188.16 12.8592 188.197 13.547 187.729 13.9161C186.297 15.0458 184.153 16.2845 183.244 16.2785C183.07 16.2774 182.933 16.1536 182.852 15.9997Z"
            fill="#111111"
          />
          <path
            d="M137.985 34.2668C139.203 72.8415 125.296 81.8084 118.19 81.47C110.184 84.5154 125.804 109.386 137.985 99.7422C153.821 85.9366 157.442 49.6628 157.273 33.2516C158.457 32.2365 161.029 28.6836 161.841 22.5929C162.856 14.9794 160.826 6.85843 157.78 5.33575C155.344 4.1176 154.58 6.50559 154.503 7.85186C154.088 7.28755 153.65 6.78897 153.212 6.35089C151.182 4.32064 150.336 6.5056 150.167 7.85186C149.34 6.89081 148.572 6.35089 148.137 6.35089C146.614 6.35089 144.584 6.35089 145.599 10.9189C147.223 17.8218 145.599 23.2696 144.584 25.1307H131.895C131.489 30.4093 135.786 33.4208 137.985 34.2668Z"
            fill="#FDFBEF"
          />
          <path
            d="M153.212 21.0702C154.662 15.2722 152.23 10.2505 150.167 7.85186M150.167 7.85186C149.34 6.89081 148.572 6.35089 148.137 6.35089C146.614 6.35089 144.584 6.35089 145.599 10.9189C147.223 17.8218 145.599 23.2696 144.584 25.1307H131.895C131.489 30.4093 135.786 33.4208 137.985 34.2668C139.203 72.8415 125.296 81.8084 118.19 81.47C110.184 84.5154 125.804 109.386 137.985 99.7422C153.821 85.9366 157.442 49.6628 157.273 33.2516C158.457 32.2365 161.029 28.6836 161.841 22.5929C162.856 14.9794 160.826 6.85843 157.78 5.33575C155.344 4.1176 154.58 6.50559 154.503 7.85186M150.167 7.85186C150.336 6.5056 151.182 4.32064 153.212 6.35089C153.65 6.78897 154.088 7.28755 154.503 7.85186M156.258 21.0702C157.937 14.771 156.49 10.5566 154.503 7.85186"
            stroke="#111111"
            strokeWidth="2"
          />
        </svg>
      </section>
      <footer>
        <Button variant="kakao" onClick={() => signin({ provider: 'kakao' })}>
          <svg
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3"
          >
            <path
              d="M11 0C4.92484 0 0 3.82543 0 8.54421C0 11.595 2.05893 14.2719 5.15604 15.7836C4.98754 16.356 4.0733 19.4663 4.03686 19.7107C4.03686 19.7107 4.015 19.8942 4.13566 19.9642C4.25638 20.0343 4.39828 19.9799 4.39828 19.9799C4.74437 19.9323 8.41149 17.3946 9.04626 16.954C9.68034 17.0424 10.3333 17.0884 11 17.0884C17.0752 17.0884 22 13.2631 22 8.54421C22 3.82543 17.0752 0 11 0Z"
              fill="#111111"
            />
          </svg>
          카카오 로그인
        </Button>
      </footer>
    </div>
  )
}

export default Page

Page.getLayout = (page: ReactNode) => (
  <BaseLayout showHeader={false}>{page}</BaseLayout>
)

export const getServerSideProps = (async (context) => {
  const isViewOnboard = context.req.cookies['namui-init'] ?? null
  if (!isViewOnboard) {
    return {
      redirect: {
        destination: '/onboard',
        permanent: true,
      },
    }
  }

  return {
    props: {},
  }
}) satisfies GetServerSideProps
