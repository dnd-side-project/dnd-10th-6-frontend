import { Button } from '@/components/ui'
import ShareModal from '@/components/share-modal'
import FormLayout from '@/layout/form-layout'
import { useSession } from '@/provider/session-provider'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'
import { GetServerSideProps } from 'next'

import { WikiType } from '@/types'
import { useToggletheme } from '@/contexts/wiki-provider'

const index = () => {
  const { data } = useSession()
  const searchParams = useSearchParams()
  const wikiType = searchParams.get('wikiType')! as WikiType

  useToggletheme(wikiType)

  return (
    <FormLayout
      button={
        <div className="flex w-full flex-col space-y-3">
          <ShareModal wikiType={wikiType}>
            <Button>친구에게 내 소개 부탁하기</Button>
          </ShareModal>
          {/* <Button variant="default">작성한 소개서 보러가기</Button> */}
        </div>
      }
      header={{
        leftIcon: <></>,
        center: <></>,
        rightIcon: (
          <Link href={data?.user?.wikiId ? 'garden' : '/'}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.786 6.45173C23.1277 6.11002 23.1277 5.556 22.786 5.21429C22.4443 4.87258 21.8903 4.87258 21.5486 5.21429L14.0007 12.7622L6.45271 5.21429C6.111 4.87258 5.55698 4.87258 5.21527 5.21429C4.87356 5.556 4.87356 6.11002 5.21527 6.45173L12.7632 13.9997L5.21527 21.5476C4.87356 21.8893 4.87356 22.4434 5.21527 22.7851C5.55697 23.1268 6.11099 23.1268 6.4527 22.7851L14.0007 15.2371L21.5486 22.7851C21.8903 23.1268 22.4443 23.1268 22.786 22.7851C23.1277 22.4434 23.1277 21.8893 22.786 21.5476L15.2381 13.9997L22.786 6.45173Z"
                fill="#111111"
              />
            </svg>
          </Link>
        ),
      }}
      content={
        <>
          <div className="flex grow flex-col items-center justify-center space-y-8 px-5 text-center">
            <svg
              width="139"
              height="185"
              viewBox="0 0 139 185"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M130.802 9.76043C128.675 9.05356 110.418 12.1167 101.555 13.7366C101.924 15.2828 103.15 21.777 105.1 35.3842C107.537 52.3933 110.196 51.0679 111.525 51.5097C112.855 51.9515 134.347 49.3007 137.006 48.4171C139.887 43.9992 133.461 10.644 130.802 9.76043Z"
                fill="#E4D5C0"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M102.473 14.3468C102.984 16.8147 104.143 23.3054 105.858 35.2731C107.076 43.7772 108.336 47.5543 109.38 49.2559C109.884 50.0763 110.305 50.3599 110.604 50.4883C110.766 50.5577 110.926 50.5963 111.111 50.6318C111.139 50.6371 111.17 50.6428 111.204 50.6491C111.362 50.6776 111.577 50.7167 111.766 50.7793C111.756 50.7762 111.751 50.7746 111.751 50.774C111.752 50.7721 111.823 50.7842 112.015 50.7881C112.223 50.7922 112.505 50.7867 112.858 50.7711C113.561 50.7399 114.507 50.6703 115.624 50.5706C117.856 50.3714 120.742 50.0549 123.673 49.6966C126.603 49.3382 129.573 48.9388 131.974 48.5744C134.1 48.2515 135.715 47.9649 136.482 47.7673C136.672 47.3303 136.831 46.5747 136.909 45.4673C137.001 44.1787 136.977 42.5478 136.859 40.6838C136.623 36.9591 136.011 32.3777 135.225 27.8936C134.438 23.4101 133.481 19.046 132.558 15.757C132.096 14.1093 131.649 12.7521 131.242 11.7902C131.038 11.307 130.855 10.9486 130.699 10.7096C130.621 10.5905 130.561 10.5185 130.521 10.4795C130.52 10.478 130.518 10.4765 130.517 10.4752C130.458 10.4623 130.348 10.4454 130.171 10.4342C129.949 10.4201 129.665 10.4172 129.317 10.4265C128.624 10.4451 127.722 10.5111 126.656 10.6168C124.524 10.8281 121.78 11.1933 118.815 11.6326C113.227 12.4606 106.889 13.5472 102.473 14.3468ZM130.495 10.4564C130.495 10.4564 130.496 10.4568 130.497 10.4577C130.496 10.4569 130.495 10.4564 130.495 10.4564ZM130.268 8.9028C130.539 8.91995 130.814 8.95405 131.043 9.03003C131.279 9.10856 131.464 9.25397 131.6 9.38895C131.741 9.52828 131.868 9.69426 131.982 9.86902C132.21 10.2179 132.435 10.671 132.655 11.1931C133.098 12.2417 133.566 13.6698 134.035 15.3425C134.976 18.6941 135.943 23.1106 136.736 27.6285C137.528 32.1459 138.149 36.7869 138.39 40.5865C138.511 42.4846 138.538 44.1913 138.439 45.5759C138.344 46.9152 138.125 48.1005 137.647 48.8339L137.501 49.0584L137.247 49.1429C136.505 49.3893 134.586 49.7297 132.204 50.0914C129.785 50.4587 126.8 50.86 123.859 51.2196C120.918 51.5792 118.015 51.8978 115.76 52.099C114.634 52.1995 113.662 52.2714 112.925 52.304C112.558 52.3203 112.239 52.3273 111.985 52.3222C111.768 52.3178 111.492 52.3051 111.282 52.2354C111.206 52.2101 111.129 52.1959 110.991 52.1705C110.943 52.1616 110.887 52.1513 110.822 52.1387C110.597 52.0957 110.312 52.0324 109.999 51.8983C109.35 51.6194 108.705 51.0884 108.073 50.0588C106.846 48.0603 105.558 43.9957 104.339 35.4908C102.389 21.8815 101.167 15.42 100.807 13.9125L100.619 13.1251L101.415 12.9795C105.852 12.1686 112.641 10.9963 118.591 10.1147C121.564 9.6741 124.337 9.30478 126.504 9.0899C127.587 8.98257 128.53 8.91261 129.276 8.89263C129.649 8.88265 129.984 8.88483 130.268 8.9028Z"
                fill="#111111"
              />
              <path
                d="M45.0638 171.551C44.0473 169.452 44.7457 138.446 45.4145 125.911L42.5628 110.34L56.0876 114.339C56.108 126.711 56.3335 154.342 57.0717 165.886C57.81 177.43 57.3124 180.404 56.9713 180.447C53.4789 185.357 35.8654 181.974 32.3712 181.392C28.5603 180.757 14.208 178.74 18.7189 172.186C22.2142 167.107 46.3344 174.175 45.0638 171.551Z"
                fill="#FFEB34"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M41.5826 109.252L56.8528 113.768L56.8538 114.34C56.8742 126.719 57.0999 154.324 57.8363 165.839C58.2061 171.622 58.268 175.279 58.192 177.507C58.1541 178.618 58.0814 179.396 57.9889 179.914C57.9436 180.168 57.8874 180.396 57.8115 180.579C57.7743 180.668 57.7174 180.785 57.6284 180.893C57.5991 180.929 57.5576 180.974 57.5032 181.019C56.4193 182.428 54.4423 183.147 52.2701 183.507C49.9918 183.885 47.2889 183.901 44.6269 183.747C39.9164 183.475 35.2074 182.662 32.9847 182.278C32.6933 182.227 32.4446 182.184 32.2443 182.151C32.0848 182.124 31.9053 182.095 31.7081 182.063C29.5892 181.718 25.4277 181.041 22.1383 179.723C20.3577 179.009 18.6856 178.053 17.7803 176.737C17.3133 176.058 17.0465 175.276 17.0871 174.404C17.1273 173.54 17.4648 172.656 18.0863 171.753C18.6638 170.914 19.6137 170.397 20.6851 170.075C21.7655 169.751 23.0628 169.596 24.4617 169.548C27.2609 169.453 30.6164 169.786 33.7747 170.189C35.0796 170.355 36.3437 170.532 37.5277 170.698C39.2436 170.938 40.7911 171.155 42.0506 171.282C43.0222 171.379 43.7479 171.413 44.2098 171.378C44.1791 171.237 44.1544 171.089 44.1331 170.944C44.0787 170.572 44.0328 170.104 43.9937 169.559C43.9154 168.466 43.8616 167.018 43.828 165.314C43.7608 161.904 43.7738 157.43 43.8394 152.636C43.97 143.095 44.3094 132.257 44.6429 125.963L41.5826 109.252ZM43.5413 111.431L46.1844 125.864L46.1796 125.954C45.8459 132.209 45.5043 143.083 45.3733 152.657C45.3078 157.444 45.295 161.899 45.3618 165.284C45.3952 166.978 45.4483 168.395 45.5238 169.449C45.5616 169.977 45.6043 170.402 45.651 170.721C45.6743 170.881 45.6974 171.005 45.7191 171.097C45.7373 171.174 45.7503 171.21 45.7533 171.218C45.7542 171.221 45.7543 171.22 45.7533 171.218C45.8346 171.386 45.9039 171.614 45.8694 171.873C45.8326 172.149 45.6908 172.366 45.5178 172.516C45.2243 172.771 44.8246 172.851 44.5337 172.887C43.8934 172.966 42.9628 172.915 41.8976 172.808C40.6168 172.68 39.0105 172.455 37.2619 172.21C36.081 172.045 34.8351 171.871 33.5807 171.711C30.4309 171.309 27.1804 170.991 24.5137 171.082C23.1796 171.127 22.029 171.274 21.1264 171.545C20.2146 171.819 19.6462 172.192 19.3498 172.623C18.8436 173.359 18.6429 173.971 18.6194 174.475C18.5964 174.97 18.7406 175.426 19.0442 175.867C19.6804 176.793 20.9887 177.609 22.7088 178.299C25.8286 179.549 29.82 180.2 31.9578 180.549C32.1536 180.581 32.3338 180.61 32.4964 180.637C32.7028 180.672 32.9565 180.716 33.252 180.767C35.4842 181.152 40.1007 181.949 44.7153 182.215C47.33 182.366 49.9036 182.344 52.0193 181.993C54.178 181.635 55.6608 180.967 56.3456 180.005L56.4256 179.892C56.4406 179.836 56.4591 179.755 56.4788 179.644C56.5525 179.232 56.622 178.537 56.6589 177.455C56.7324 175.299 56.6739 171.698 56.3055 165.937C55.5766 154.539 55.3471 127.542 55.3208 114.915L43.5413 111.431Z"
                fill="#111111"
              />
              <path
                d="M76.3574 169.944C77.2053 167.823 74.3545 139.323 72.5959 126.868L74.0855 110.964L60.7391 115.367C61.786 127.682 63.9419 155.19 64.1906 166.703C64.4394 178.216 66.01 179.173 66.01 179.173C69.9691 183.95 84.0923 181.83 87.5906 181.193C91.7158 180.442 106.133 178.951 101.554 172.189C96.9754 165.427 75.2975 172.595 76.3574 169.944Z"
                fill="#FFEB34"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M74.9707 109.857L59.9209 114.821L59.9691 115.389C61.0165 127.711 63.1699 155.193 63.4181 166.677C63.543 172.457 63.9999 175.64 64.4442 177.399C64.6666 178.28 64.8922 178.831 65.0888 179.182C65.188 179.358 65.2837 179.492 65.3738 179.592C65.4069 179.63 65.4395 179.663 65.4714 179.692C66.6317 181.053 68.4408 181.858 70.4174 182.331C72.4396 182.815 74.7554 182.98 77.0183 182.973C81.5474 182.961 86.0035 182.263 87.772 181.941C88.1566 181.871 88.6447 181.793 89.208 181.703C91.5575 181.327 95.2164 180.741 98.1434 179.659C99.9472 178.992 101.627 178.085 102.529 176.797C102.994 176.133 103.257 175.362 103.211 174.489C103.166 173.624 102.822 172.723 102.191 171.792C100.836 169.789 98.3027 168.93 95.5896 168.603C92.8384 168.272 89.6608 168.459 86.7186 168.768C85.2423 168.923 83.8122 169.11 82.5136 169.282L82.3208 169.308C81.0946 169.47 79.9994 169.615 79.0853 169.705C78.2365 169.789 77.6069 169.819 77.1973 169.79C77.2197 169.646 77.2348 169.495 77.2463 169.346C77.2737 168.991 77.2858 168.549 77.2857 168.036C77.2854 167.009 77.2359 165.658 77.1478 164.07C76.9716 160.892 76.6388 156.731 76.2252 152.253C75.4018 143.341 74.2551 133.143 73.3751 126.891L74.9707 109.857ZM73.2019 112.071L71.8182 126.844L71.8305 126.931C72.7076 133.143 73.8586 143.369 74.6845 152.309C75.0974 156.778 75.4283 160.918 75.603 164.07C75.6905 165.647 75.7383 166.967 75.7386 167.953C75.7387 168.447 75.7268 168.847 75.7036 169.149C75.692 169.3 75.6782 169.418 75.6634 169.506C75.6476 169.601 75.635 169.635 75.6361 169.632C75.5715 169.794 75.5229 170.003 75.5598 170.239C75.5993 170.492 75.7263 170.707 75.9004 170.87C76.2004 171.149 76.6022 171.237 76.8797 171.277C77.4867 171.363 78.3526 171.315 79.323 171.219C80.2634 171.126 81.3822 170.978 82.5967 170.817L82.8014 170.79C84.1007 170.618 85.5121 170.434 86.9655 170.281C89.8826 169.975 92.9168 169.804 95.4847 170.113C98.0908 170.427 99.9846 171.207 100.918 172.586C101.432 173.344 101.639 173.97 101.666 174.484C101.692 174.989 101.547 175.449 101.24 175.888C100.598 176.805 99.2743 177.586 97.5306 178.231C94.761 179.255 91.3204 179.808 88.9595 180.187C88.3656 180.282 87.8401 180.366 87.4108 180.444C85.6809 180.759 81.3263 181.44 76.9294 181.452C74.7295 181.458 72.5535 181.297 70.7047 180.854C68.8388 180.408 67.4213 179.703 66.5998 178.711L66.511 178.604L66.4859 178.589C66.473 178.57 66.4556 178.542 66.4343 178.504C66.3286 178.316 66.146 177.907 65.9446 177.11C65.5414 175.513 65.0887 172.46 64.9648 166.728C64.7192 155.36 62.6217 128.48 61.5589 115.912L73.2019 112.071Z"
                fill="#111111"
              />
              <path
                d="M57.7089 0.976003C47.2995 3.51556 43.6393 29.9693 43.1103 42.8787C42.863 47.0054 39.6194 47.6405 25.0209 57.4813C13.3421 65.3539 19.0968 75.1524 23.4341 79.0675C15.0769 81.1838 -1.00262 88.3369 1.53625 100.019C4.07513 111.701 15.9232 113.775 21.5299 113.352C21.1067 113.986 22.0377 117.478 29.1465 126.367C36.2554 135.255 48.6112 130.07 53.9006 126.367C78.0199 148.969 84.896 133.245 85.3192 122.557C90.5027 124.78 101.568 125.351 104.361 109.86C107.154 94.3684 89.6564 76.9512 80.5588 70.1791C104.995 76.528 87.5407 51.1323 78.6546 41.2915C69.7685 31.4507 70.7206 -2.19844 57.7089 0.976003Z"
                fill="#00BC68"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M61.6305 2.07722C60.5705 1.5325 59.3529 1.36635 57.8914 1.72291C55.5825 2.28621 53.5427 4.20669 51.77 7.17434C50.0063 10.127 48.5786 13.9989 47.4462 18.2382C45.1828 26.712 44.1404 36.4933 43.8775 42.9117L43.8767 42.9262C43.8079 44.0747 43.5227 45.0337 42.8573 45.965C42.2139 46.8657 41.2431 47.6993 39.8938 48.6631C38.6271 49.5679 36.9667 50.6281 34.8316 51.9913C34.6849 52.0849 34.536 52.18 34.3849 52.2765C32.0255 53.7835 29.0919 55.6642 25.4503 58.119C22.6156 60.0299 20.8876 62.0243 19.9239 63.9673C18.9626 65.9055 18.7403 67.835 18.9826 69.659C19.4715 73.3407 21.8613 76.6152 23.9487 78.4995C24.1588 78.6891 24.2474 78.979 24.1793 79.2537C24.1112 79.5285 23.8974 79.7433 23.6231 79.8128C19.5064 80.8553 13.4985 83.1389 8.85611 86.5744C4.20021 90.0199 1.11338 94.4595 2.28653 99.8574C3.49723 105.428 6.90979 108.693 10.7174 110.536C14.5529 112.391 18.7764 112.792 21.4729 112.588C21.7654 112.566 22.0448 112.713 22.1928 112.966C22.3261 113.194 22.3318 113.472 22.2129 113.704C22.2123 113.712 22.2119 113.722 22.2119 113.735C22.2113 113.824 22.227 113.98 22.2867 114.219C22.4057 114.695 22.6763 115.41 23.1955 116.413C24.2318 118.414 26.208 121.465 29.7462 125.889C33.0811 130.059 37.6387 130.954 42.1005 130.33C46.5879 129.704 50.8865 127.543 53.4615 125.74C53.7587 125.532 54.161 125.56 54.4257 125.808C60.4188 131.425 65.2865 134.606 69.1989 136.094C73.0954 137.576 75.9954 137.362 78.1483 136.264C80.322 135.155 81.8748 133.074 82.9149 130.549C83.9534 128.028 84.4503 125.135 84.5535 122.529C84.5635 122.276 84.697 122.045 84.9105 121.91C85.1239 121.775 85.39 121.754 85.6221 121.854C88.0887 122.911 91.9315 123.558 95.4508 122.141C98.9108 120.747 102.245 117.28 103.607 109.725C104.946 102.295 101.425 94.2888 96.298 87.2009C91.1903 80.1393 84.6013 74.1456 80.1016 70.7961C79.8073 70.577 79.7093 70.18 79.8679 69.849C80.0265 69.518 80.3972 69.3458 80.7524 69.438C83.7664 70.2211 86.0804 70.4995 87.8142 70.3999C89.547 70.3002 90.6291 69.8285 91.2818 69.1835C91.9271 68.5456 92.259 67.6326 92.2719 66.4171C92.2848 65.1919 91.9703 63.7179 91.3811 62.0657C89.013 55.4256 82.5108 46.7073 78.0862 41.8073C75.7406 39.2097 74.0953 35.114 72.7297 30.6188C71.8789 27.8181 71.1157 24.7828 70.3626 21.7878C69.9069 19.9751 69.4548 18.1771 68.9892 16.4548C67.7384 11.8276 66.3853 7.72252 64.5811 4.97496C63.6845 3.60968 62.7092 2.63162 61.6305 2.07722ZM22.2158 113.678C22.2159 113.678 22.2157 113.679 22.215 113.682C22.2154 113.679 22.2157 113.678 22.2158 113.678ZM74.1974 30.1727C75.5592 34.6552 77.1271 38.4559 79.2246 40.7788C83.686 45.7195 90.3542 54.6195 92.8259 61.5502C93.4466 63.2907 93.8214 64.9564 93.8058 66.4333C93.7901 67.9198 93.3758 69.271 92.3599 70.275C91.3514 71.2718 89.8574 71.8193 87.9022 71.9317C86.6935 72.0013 85.2813 71.9066 83.6475 71.634C87.9518 75.1905 93.2506 80.3701 97.5408 86.3015C102.739 93.4881 106.57 101.936 105.116 109.997C103.686 117.934 100.09 121.926 96.0238 123.564C92.4816 124.991 88.7252 124.571 86.0245 123.65C85.8355 126.105 85.3137 128.754 84.3332 131.134C83.2113 133.857 81.4583 136.298 78.8451 137.631C76.2112 138.974 72.8433 139.121 68.6538 137.528C64.5837 135.981 59.693 132.777 53.8267 127.347C51.076 129.169 46.8118 131.222 42.3127 131.85C37.4971 132.523 32.3223 131.566 28.5484 126.848C24.9777 122.383 22.934 119.244 21.8334 117.118C21.2842 116.058 20.9571 115.225 20.7985 114.591C20.7613 114.442 20.7321 114.299 20.7117 114.163C17.8205 114.242 13.78 113.722 10.0494 111.917C5.89662 109.908 2.1157 106.295 0.787529 100.183C-0.578197 93.8994 3.10531 88.9214 7.94375 85.3409C12.3187 82.1033 17.7982 79.8734 21.942 78.679C19.957 76.5753 17.9362 73.4322 17.4619 69.861C17.1831 67.7619 17.4409 65.521 18.5497 63.2854C19.6561 61.0547 21.5884 58.872 24.593 56.8466C28.2507 54.381 31.197 52.4921 33.5593 50.9833C33.7041 50.8908 33.8465 50.7999 33.9867 50.7104C36.1425 49.3338 37.7697 48.2949 39.0024 47.4144C40.3197 46.4734 41.1187 45.7595 41.6092 45.0729C42.0765 44.4187 42.2896 43.7526 42.3451 42.8414C42.6115 36.3502 43.6638 26.4543 45.9642 17.8422C47.1142 13.537 48.5864 9.51243 50.4531 6.38731C52.3109 3.27723 54.6321 0.938656 57.5279 0.23218C59.3194 -0.204875 60.9183 -0.013904 62.3315 0.712397C63.7259 1.42902 64.8804 2.63587 65.8632 4.13255C67.8177 7.10892 69.2217 11.436 70.4701 16.0543C70.9516 17.8356 71.4094 19.6577 71.867 21.4786C72.6111 24.4396 73.3544 27.3975 74.1974 30.1727Z"
                fill="#111111"
              />
              <path
                d="M44.9592 51.1024C45.252 56.3538 48.8132 60.4255 52.9134 60.1969C57.0136 59.9682 60.1002 55.5256 59.8074 50.2742C59.5147 45.0228 55.9535 40.951 51.8533 41.1797C47.753 41.4084 44.6665 45.8509 44.9592 51.1024Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M52.828 58.6648C49.9046 58.8279 46.7573 55.7964 46.4909 51.0169C46.2244 46.2374 49.0152 42.8748 51.9387 42.7118C54.8621 42.5487 58.0093 45.5801 58.2758 50.3596C58.5422 55.1391 55.7514 58.5018 52.828 58.6648ZM52.9134 60.1969C48.8132 60.4255 45.252 56.3538 44.9592 51.1024C44.6665 45.8509 47.753 41.4084 51.8533 41.1797C55.9535 40.951 59.5147 45.0228 59.8074 50.2742C60.1002 55.5256 57.0136 59.9682 52.9134 60.1969Z"
                fill="#111111"
              />
              <path
                d="M46.9746 53.5363C47.1503 57.2138 49.8473 60.0729 52.9987 59.9223C56.15 59.7716 58.5622 56.6683 58.3865 52.9908C58.2108 49.3133 55.5137 46.4541 52.3624 46.6048C49.2111 46.7554 46.7989 49.8588 46.9746 53.5363Z"
                fill="#111111"
              />
              <path
                d="M58.4569 50.2946C58.415 55.554 61.5069 59.8425 65.3627 59.8733C69.2186 59.904 72.3784 55.6653 72.4203 50.4059C72.4621 45.1464 69.3703 40.8579 65.5144 40.8272C61.6585 40.7965 58.4988 45.0352 58.4569 50.2946Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M61.6924 56.1472C60.6527 54.7051 59.9722 52.6446 59.9908 50.3068C60.0095 47.9691 60.7226 45.9197 61.7852 44.4943C62.8484 43.0681 64.1803 42.351 65.5022 42.3616C66.824 42.3721 68.1444 43.1103 69.1848 44.5533C70.2245 45.9954 70.9049 48.0559 70.8863 50.3936C70.8677 52.7314 70.1545 54.7808 69.092 56.2061C68.0288 57.6324 66.6968 58.3494 65.375 58.3389C64.0531 58.3284 62.7327 57.5902 61.6924 56.1472ZM65.3627 59.8733C61.5069 59.8425 58.415 55.554 58.4569 50.2946C58.4988 45.0352 61.6585 40.7965 65.5144 40.8272C69.3703 40.8579 72.4621 45.1464 72.4203 50.4059C72.3784 55.6653 69.2186 59.904 65.3627 59.8733Z"
                fill="#111111"
              />
              <path
                d="M59.8776 51.82C59.4087 55.4717 61.5652 58.758 64.6944 59.16C67.8236 59.5621 70.7405 56.9278 71.2095 53.2761C71.6784 49.6244 69.5219 46.3381 66.3927 45.936C63.2635 45.534 60.3466 48.1683 59.8776 51.82Z"
                fill="#111111"
              />
              <path
                d="M50.7215 66.482C54.5081 64.6062 53.2329 66.8697 52.1219 68.236C52.7656 71.3958 55.2488 78.2328 60.0323 80.3019C64.8159 82.3709 68.2145 73.3414 67.4751 67.9348C66.8444 67.8641 64.8392 67.3042 65.4086 66.4256C65.7946 65.8301 67.5128 64.7448 69.4405 64.6411C71.3712 64.5373 69.6719 67.329 68.7367 68.076C69.8209 70.7529 68.7507 76.3908 65.9432 80.9317C62.4338 86.6078 57.7869 83.2447 55.3015 79.7721C53.3132 76.994 51.2314 71.437 50.439 69.0058C48.9555 68.9462 46.9349 68.3578 50.7215 66.482Z"
                fill="#111111"
              />
              <path
                d="M101.871 64.8886C99.7607 67.8776 88.4426 64.4734 83.8987 62.7884C81.8466 64.3268 78.4629 69.9822 80.9254 74.7294C84.0035 80.6635 104.895 80.9563 108.853 78.5388C112.019 76.6047 117.2 67.6238 119.326 62.3491L123.134 50.6036L112.261 51.7994C114.68 49.162 112.102 39.1751 109.843 39.4917C107.584 39.8084 108.121 48.4294 107.901 51.7994C106.948 55.3891 103.982 61.8996 101.871 64.8886Z"
                fill="#FDFBEF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M109.944 40.2537C109.944 40.2537 109.945 40.2536 109.946 40.2537C109.945 40.2538 109.944 40.2538 109.944 40.2537ZM109.947 40.2537C109.962 40.2547 110.038 40.2684 110.188 40.3996C110.379 40.5675 110.605 40.8593 110.844 41.2867C111.318 42.1352 111.755 43.3604 112.057 44.7075C112.358 46.051 112.514 47.4662 112.455 48.6839C112.394 49.938 112.113 50.8274 111.696 51.2826C111.496 51.5003 111.439 51.8132 111.549 52.0873C111.659 52.3614 111.917 52.5479 112.212 52.5669C113.302 52.6372 114.626 52.8849 115.599 53.5911C116.504 54.2476 117.213 55.3757 116.976 57.5045L118.501 57.674C118.792 55.0556 117.898 53.3629 116.5 52.3489C116.399 52.2756 116.296 52.2064 116.191 52.1408L122.038 51.4978L118.604 62.0887C117.559 64.676 115.759 68.1878 113.828 71.2933C112.86 72.8496 111.867 74.2907 110.928 75.4553C109.977 76.6357 109.127 77.4738 108.453 77.8858C108.067 78.1217 107.406 78.3595 106.477 78.5654C105.563 78.7678 104.445 78.9275 103.186 79.0354C100.67 79.2512 97.6344 79.2563 94.623 79.0033C91.6074 78.7499 88.6496 78.2404 86.2747 77.4426C83.8537 76.6293 82.2286 75.579 81.6056 74.3779C80.5054 72.2568 80.69 69.8937 81.4399 67.8182C82.1114 65.9593 83.1977 64.4411 84.049 63.6623C86.3931 64.5088 90.1534 65.689 93.6553 66.3471C95.5101 66.6957 97.3336 66.9059 98.8513 66.8264C100.312 66.7499 101.749 66.3925 102.497 65.3331C103.593 63.7816 104.885 61.3572 106.017 58.8912C107.15 56.4235 108.15 53.8535 108.642 51.9981C108.655 51.95 108.663 51.9009 108.666 51.8512C108.716 51.0859 108.728 50.0641 108.741 48.9609C108.742 48.8121 108.744 48.6618 108.746 48.5105C108.762 47.223 108.786 45.8386 108.872 44.5538C108.959 43.2585 109.106 42.1162 109.352 41.2962C109.475 40.885 109.608 40.6038 109.736 40.4319C109.852 40.2742 109.925 40.2571 109.947 40.2537ZM113.63 50.8789C113.846 50.2242 113.952 49.4915 113.987 48.7582C114.054 47.3714 113.878 45.8152 113.554 44.3718C113.231 42.9321 112.752 41.5551 112.183 40.5377C111.9 40.0322 111.573 39.5751 111.2 39.2471C110.83 38.9215 110.326 38.651 109.736 38.7338C109.19 38.8104 108.786 39.1364 108.503 39.5184C108.226 39.8918 108.03 40.3623 107.882 40.8565C107.586 41.8473 107.43 43.1304 107.341 44.4511C107.252 45.7824 107.228 47.2049 107.212 48.4916C107.21 48.6437 107.209 48.7937 107.207 48.9413C107.194 50.0173 107.183 50.9637 107.14 51.6767C106.672 53.4073 105.724 55.8525 104.623 58.251C103.506 60.6849 102.26 63.0102 101.244 64.4478C100.937 64.8829 100.168 65.2209 98.771 65.2941C97.4309 65.3643 95.7451 65.1786 93.9386 64.8391C90.3339 64.1617 86.4123 62.9043 84.1647 62.0709C83.9204 61.9802 83.6467 62.02 83.4381 62.1763C82.2664 63.0548 80.8303 64.9906 79.9972 67.2967C79.1577 69.6203 78.8818 72.4585 80.244 75.0846C81.1601 76.8506 83.3007 78.0622 85.7864 78.8972C88.3181 79.7477 91.4078 80.273 94.4946 80.5323C97.5856 80.7921 100.708 80.788 103.317 80.5642C104.622 80.4523 105.81 80.2846 106.808 80.0635C107.791 79.8458 108.649 79.564 109.252 79.1954C110.161 78.6404 111.146 77.6307 112.123 76.4183C113.113 75.1902 114.142 73.6938 115.13 72.1038C117.106 68.9264 118.955 65.3229 120.037 62.6377C120.043 62.6213 120.049 62.6045 120.055 62.5876L123.863 50.8422C123.943 50.5945 123.893 50.323 123.728 50.1211C123.564 49.9192 123.309 49.8144 123.05 49.8429L113.63 50.8789Z"
                fill="#111111"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M121.38 16.0027C121.456 16.5231 121.096 17.0065 120.575 17.0823L114.86 17.9152C114.339 17.991 113.856 17.6305 113.78 17.11C113.705 16.5896 114.065 16.1062 114.585 16.0304L120.301 15.1976C120.821 15.1218 121.304 15.4822 121.38 16.0027ZM128.98 20.8751C129.07 21.3933 128.723 21.8863 128.205 21.9761L108.367 25.4158C107.849 25.5056 107.356 25.1584 107.266 24.6401C107.176 24.1219 107.523 23.629 108.042 23.5391L127.879 20.0994C128.398 20.0096 128.89 20.3569 128.98 20.8751ZM130.066 23.9757C130.148 24.4952 129.794 24.983 129.274 25.0653L108.79 28.3109C108.27 28.3932 107.783 28.0388 107.7 27.5193C107.618 26.9998 107.972 26.512 108.492 26.4297L128.977 23.1841C129.496 23.1018 129.984 23.4562 130.066 23.9757ZM130.066 27.0763C130.145 27.5962 129.788 28.0822 129.269 28.1617L109.437 31.1958C108.917 31.2754 108.431 30.9183 108.352 30.3984C108.272 29.8785 108.629 29.3926 109.149 29.3131L128.981 26.2789C129.501 26.1994 129.986 26.5564 130.066 27.0763ZM131.152 29.734C131.235 30.2534 130.881 30.7417 130.362 30.8248L110.094 34.0675C109.575 34.1506 109.086 33.7969 109.003 33.2776C108.92 32.7582 109.274 32.2699 109.793 32.1868L130.061 28.944C130.58 28.861 131.069 29.2147 131.152 29.734ZM121.38 34.3849C121.476 34.9021 121.135 35.399 120.618 35.4949L110.547 37.3624C110.03 37.4583 109.533 37.1168 109.438 36.5997C109.342 36.0825 109.683 35.5856 110.2 35.4897L120.271 33.6222C120.788 33.5263 121.284 33.8678 121.38 34.3849ZM132.02 42.5794C132.117 43.0964 131.776 43.594 131.26 43.6908L122.491 45.3335C121.974 45.4303 121.477 45.0897 121.38 44.5727C121.283 44.0557 121.624 43.5582 122.141 43.4613L130.909 41.8187C131.426 41.7219 131.923 42.0625 132.02 42.5794Z"
                fill="#111111"
              />
              <path
                d="M17.9876 127.476L19.66 108.119C20.1411 102.551 29.4625 106.689 33.0163 109.075C36.5701 111.461 31.762 144.928 28.8353 145.988C25.9087 147.049 25.2815 141.481 25.2815 142.806C25.2815 144.132 24.0272 146.519 21.9368 146.784C19.8463 147.049 22.161 141.481 19.6524 144.397C17.1514 147.305 17.1514 146.468 17.1514 139.105V139.038C17.1514 135.906 18.4861 133.964 20.1464 132.814C17.7201 134.087 15.4011 135.709 14.8519 135.43C11.0054 134.794 15.3396 129.862 17.9876 127.476Z"
                fill="#FDFBEF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.3533 104.863C28.3049 105.526 31.6111 107.205 33.4432 108.436C33.8442 108.705 34.1083 109.134 34.2929 109.57C34.4829 110.019 34.6247 110.563 34.7316 111.167C34.9458 112.376 35.0386 113.934 35.0402 115.697C35.0435 119.232 34.6803 123.707 34.1162 128.124C33.5519 132.542 32.7831 136.928 31.9678 140.287C31.5609 141.964 31.1371 143.407 30.7134 144.476C30.5024 145.009 30.2813 145.475 30.0484 145.837C29.8367 146.167 29.5303 146.55 29.096 146.707C28.1072 147.066 27.25 146.862 26.5851 146.364C26.0813 145.987 25.7101 145.46 25.438 144.96C25.3133 145.194 25.1713 145.422 25.0141 145.64C24.3601 146.545 23.3546 147.375 22.0326 147.543C21.5999 147.598 21.1786 147.506 20.8422 147.219C20.5331 146.954 20.386 146.599 20.3086 146.307C20.1959 145.881 20.1813 145.371 20.1816 144.955C19.5966 145.633 19.0667 146.203 18.6063 146.485C18.3689 146.63 17.9802 146.806 17.5417 146.675C17.0889 146.539 16.8649 146.164 16.7532 145.89C16.6364 145.604 16.568 145.252 16.5214 144.873C16.4736 144.484 16.4432 144.016 16.4234 143.473C16.3838 142.39 16.3838 140.946 16.3838 139.12V139.036C16.3838 137.635 16.6335 136.442 17.058 135.433C16.6197 135.675 16.2057 135.888 15.8533 136.029C15.6635 136.104 15.4609 136.172 15.2632 136.205C15.1144 136.23 14.8843 136.25 14.6452 136.171C14.1155 136.074 13.6501 135.893 13.2868 135.595C12.8892 135.269 12.6629 134.842 12.5885 134.372C12.4512 133.504 12.8394 132.552 13.3202 131.722C14.2598 130.101 15.9338 128.321 17.2486 127.108L18.8952 108.051C18.9649 107.244 19.2004 106.556 19.6096 106.004C20.0207 105.45 20.5713 105.081 21.1904 104.859C22.3947 104.427 23.8905 104.534 25.3533 104.863ZM23.6696 130.666C22.4454 130.841 21.0189 131.285 19.7487 132.154C18.9774 132.56 18.1964 133.012 17.4989 133.415C17.1081 133.641 16.7435 133.852 16.4216 134.032C15.9487 134.295 15.5682 134.49 15.2847 134.603C15.1754 134.647 15.0984 134.671 15.0487 134.683L14.9764 134.671C14.578 134.605 14.3664 134.496 14.2593 134.408C14.1679 134.333 14.1225 134.251 14.1037 134.132C14.0546 133.822 14.1943 133.273 14.6472 132.492C15.5206 130.985 17.1956 129.219 18.5004 128.043L18.7251 127.841L20.4235 108.183C20.4741 107.597 20.635 107.197 20.8416 106.918C21.0463 106.642 21.3305 106.439 21.7085 106.303C22.4984 106.02 23.6452 106.052 25.0172 106.36C27.735 106.971 30.8664 108.553 32.5881 109.71C32.6313 109.739 32.7462 109.851 32.8802 110.168C33.0087 110.472 33.1252 110.893 33.2211 111.434C33.4128 112.516 33.5046 113.973 33.5062 115.699C33.5094 119.144 33.1541 123.549 32.5945 127.929C32.0352 132.309 31.2753 136.637 30.4771 139.925C30.0771 141.573 29.6729 142.937 29.2873 143.911C29.0938 144.399 28.9149 144.763 28.7576 145.008C28.6295 145.208 28.5552 145.266 28.5487 145.273C28.0878 145.433 27.7754 145.339 27.5044 145.136C27.1814 144.894 26.8942 144.471 26.6523 143.965C26.4308 143.501 26.2805 143.041 26.1741 142.715C26.167 142.694 26.1602 142.673 26.1535 142.652C26.128 142.575 26.1012 142.493 26.0762 142.427C26.0639 142.394 26.0469 142.351 26.026 142.307L26.0247 142.304C26.0126 142.278 25.9606 142.168 25.861 142.066C25.8131 142.017 25.6598 141.871 25.4049 141.838C25.0832 141.796 24.8433 141.957 24.7203 142.098C24.6192 142.214 24.5783 142.332 24.5641 142.375C24.5459 142.431 24.5367 142.479 24.5318 142.509C24.515 142.611 24.5139 142.725 24.5139 142.804C24.5139 143.27 24.2745 144.044 23.7708 144.741C23.275 145.427 22.6082 145.923 21.8397 146.02C21.8354 146.021 21.8314 146.021 21.8277 146.022C21.8176 145.999 21.8048 145.964 21.7916 145.914C21.7132 145.618 21.715 145.202 21.7173 144.699C21.7175 144.665 21.7176 144.631 21.7177 144.597C21.7187 144.355 21.7176 144.077 21.6862 143.838C21.6703 143.718 21.6424 143.57 21.5842 143.425C21.5276 143.283 21.4146 143.074 21.1862 142.928C20.6599 142.592 20.1404 142.905 19.9428 143.044C19.6817 143.228 19.3933 143.519 19.0703 143.895C18.635 144.401 18.3157 144.743 18.0836 144.956C18.07 144.878 18.0566 144.789 18.0439 144.686C18.0038 144.36 17.9755 143.942 17.9563 143.417C17.9179 142.366 17.9178 140.95 17.9178 139.103V139.036C17.9178 136.186 19.1036 134.482 20.5446 133.469C21.7901 132.818 22.9703 132.314 23.9077 132.182C24.1843 132.143 24.4484 132.121 24.6938 132.113L24.644 130.579C24.3473 130.589 24.0278 130.616 23.693 130.663C23.6852 130.664 23.6774 130.665 23.6696 130.666ZM17.7562 145.202C17.7563 145.202 17.7593 145.2 17.7649 145.199C17.7589 145.201 17.7561 145.202 17.7562 145.202ZM14.9913 134.693C14.9915 134.693 14.9951 134.693 15.0018 134.693C14.9945 134.694 14.9912 134.694 14.9913 134.693ZM20.8749 144.268C20.8746 144.269 20.8674 144.273 20.8542 144.279C20.8686 144.27 20.8753 144.267 20.8749 144.268Z"
                fill="#111111"
              />
              <path
                d="M25.9579 130.566C24.9424 130.058 23.8422 130.354 23.419 130.566C21.5149 131.2 17.3257 132.661 15.8024 133.422C13.8982 134.375 15.1677 137.232 14.2156 137.549C13.2635 137.867 10.4073 138.184 9.13784 140.406C8.12229 142.184 10.4073 141.993 11.6767 141.676C11.6767 142.946 14.004 142.84 15.1677 142.628C23.419 141.147 40.4295 138.057 42.4606 137.549C44.4917 137.041 44.5763 136.068 44.3648 135.645C45.2111 135.645 46.9036 135.391 46.9036 134.375C46.9036 133.359 45.4226 133.317 44.6821 133.422C44.8937 133.105 44.5552 132.47 41.5085 132.47C38.4619 132.47 23.948 135.221 17.0718 136.597C17.0718 134.375 20.2454 134.692 23.419 133.422C26.5926 132.153 27.2273 131.2 25.9579 130.566Z"
                fill="#1659A5"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.6149 131.25C24.8916 130.888 24.059 131.101 23.7621 131.25L23.7133 131.274L23.6616 131.291C21.7386 131.933 17.6091 133.375 16.1454 134.107C15.6124 134.373 15.4573 134.896 15.4182 135.757C15.4134 135.862 15.4106 135.984 15.4076 136.113C15.4005 136.412 15.3927 136.748 15.3574 137.006C15.3095 137.358 15.1588 138.041 14.4582 138.275C14.2659 138.339 13.9983 138.406 13.7247 138.474C13.613 138.502 13.5003 138.53 13.3913 138.558C12.9827 138.664 12.5326 138.793 12.0806 138.974C11.1713 139.338 10.3185 139.884 9.80385 140.785C9.73014 140.914 9.69239 141.005 9.67301 141.065C9.68622 141.069 9.70113 141.072 9.7179 141.076C10.1366 141.17 10.8775 141.083 11.4908 140.93L12.4438 140.691V141.674C12.4438 141.676 12.4438 141.679 12.4437 141.681C12.4435 141.71 12.4434 141.721 12.4982 141.76C12.5934 141.826 12.7849 141.901 13.0963 141.946C13.7099 142.036 14.492 141.969 15.0305 141.871L15.0322 141.871C23.3084 140.385 40.2766 137.303 42.2746 136.803C43.2 136.572 43.5233 136.271 43.6228 136.127C43.6815 136.042 43.6782 135.992 43.676 135.98L43.1238 134.875H44.3648C44.7343 134.875 45.2737 134.817 45.6918 134.667C45.9006 134.592 46.0277 134.511 46.0922 134.449C46.1373 134.405 46.137 134.388 46.1367 134.375C46.1367 134.375 46.1367 134.374 46.1367 134.373C46.1367 134.336 46.1323 134.334 46.1295 134.333C46.129 134.333 46.1285 134.333 46.1282 134.333C46.1048 134.31 46.0322 134.26 45.8717 134.217C45.5453 134.129 45.1034 134.135 44.7907 134.18L43.0924 134.423L43.7491 133.437C43.3688 133.333 42.6803 133.235 41.5086 133.235C40.8129 133.235 39.3909 133.398 37.4838 133.678C35.5975 133.956 33.2908 134.342 30.8596 134.771C25.9981 135.63 20.6565 136.66 17.2223 137.347L16.3049 137.531V136.595C16.3049 135.822 16.596 135.213 17.1134 134.762C17.5889 134.347 18.2163 134.101 18.835 133.916C19.2735 133.784 19.7734 133.665 20.2799 133.545C20.4884 133.496 20.6979 133.446 20.9048 133.395C21.6366 133.214 22.3899 133.006 23.1342 132.708C23.9082 132.398 24.5079 132.116 24.9526 131.862C25.3586 131.63 25.5972 131.443 25.7237 131.309C25.6947 131.292 25.6589 131.272 25.6149 131.25ZM25.8145 131.195C25.8145 131.195 25.8143 131.195 25.8138 131.196C25.8142 131.195 25.8145 131.195 25.8145 131.195ZM44.0841 133.57C44.0841 133.57 44.083 133.569 44.0811 133.567C44.0832 133.569 44.0842 133.569 44.0841 133.57ZM43.6753 135.977C43.6753 135.977 43.6754 135.978 43.6757 135.979L43.6753 135.977ZM9.58138 141.03C9.58162 141.03 9.58402 141.031 9.58788 141.034C9.58307 141.031 9.58114 141.03 9.58138 141.03ZM23.1303 129.851C23.7114 129.58 25.0344 129.244 26.301 129.877C26.6739 130.064 27.0972 130.36 27.267 130.846C27.4602 131.398 27.2351 131.896 26.9439 132.245C26.6591 132.587 26.2297 132.899 25.7137 133.194C25.1865 133.495 24.5167 133.808 23.7039 134.133C22.8615 134.47 22.028 134.698 21.2722 134.885C21.0305 134.944 20.8015 134.999 20.5834 135.05C20.1346 135.157 19.7324 135.252 19.3623 135.36C22.626 134.721 26.7572 133.937 30.5929 133.26C33.0306 132.83 35.3534 132.441 37.2602 132.16C39.1462 131.883 40.681 131.701 41.5086 131.701C43.053 131.701 44.0376 131.857 44.633 132.126C44.8688 132.233 45.1094 132.387 45.2791 132.614C45.5965 132.615 45.9433 132.647 46.2696 132.735C46.5719 132.816 46.9159 132.961 47.1933 133.228C47.4917 133.516 47.6707 133.908 47.6707 134.373C47.6707 135.407 46.7948 135.9 46.2114 136.11C45.8729 136.232 45.5092 136.309 45.171 136.354C45.1235 136.568 45.0314 136.787 44.8847 136.999C44.4869 137.575 43.7524 138.015 42.6467 138.292C40.5825 138.808 23.5303 141.904 15.3036 143.381C14.6785 143.495 13.7158 143.587 12.8755 143.465C12.4596 143.404 11.9965 143.281 11.619 143.017C11.4431 142.894 11.2886 142.741 11.1691 142.56C10.5937 142.653 9.92857 142.696 9.38304 142.573C8.98978 142.486 8.44807 142.261 8.21593 141.683C7.99129 141.124 8.18128 140.532 8.47195 140.024C9.22679 138.702 10.4368 137.979 11.5109 137.549C12.0507 137.333 12.5724 137.185 13.0069 137.072C13.1696 137.03 13.3113 136.995 13.4355 136.964C13.5912 136.926 13.7194 136.894 13.8273 136.864C13.8306 136.845 13.8341 136.824 13.8375 136.799C13.8614 136.623 13.8652 136.44 13.8701 136.204C13.8732 136.056 13.8767 135.888 13.8858 135.687C13.926 134.802 14.0883 133.42 15.4594 132.734C17.0296 131.949 21.2226 130.488 23.1303 129.851ZM13.8027 136.958C13.8025 136.958 13.804 136.954 13.8077 136.946C13.8047 136.955 13.8029 136.959 13.8027 136.958Z"
                fill="#111111"
              />
            </svg>
            <div className="flex w-full flex-col items-center justify-center space-y-2">
              <h1 className="text-mainTitle2-bold ">
                남의위키 작성이 끝났어요{' '}
              </h1>
              <p className="text-subTitle2-medium text-text-sub-gray4f">
                친구에게도 나에 대해 알려달라고
                <br />
                부탁해보세요
              </p>
            </div>
          </div>
        </>
      }
    />
  )
}

export default index
index.getLayout = (page: ReactNode) => page
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { wikiId, wikiType } = ctx.query
  if (!wikiId || typeof wikiId === 'object') return { notFound: true }
  if (
    !wikiType ||
    typeof wikiType !== 'string' ||
    ['NAMUI', 'ROMANCE'].includes(wikiType.toUpperCase())
  ) {
    return { notFound: true }
  }

  return {
    props: {
      wikiId,
      wikiType,
    },
  }
}
