import { Button } from '@/components/ui'
import BaseLayout from '@/layout/base-layout'
import { cn } from '@/lib/client/utils'
import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'

const Pages = () => {
  const router = useRouter()
  return (
    <BaseLayout showHeader={false} className={cn('h-calc-h overflow-y-scroll')}>
      <div className="-mt-5 flex grow flex-col items-center justify-center space-y-8 px-5 text-center">
        <svg
          width="129"
          height="184"
          viewBox="0 0 129 184"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M46.6538 35.7138C45.6462 40.0819 47.4261 44.2219 50.6294 44.9607C53.8326 45.6996 57.2462 42.7576 58.2538 38.3895C59.2613 34.0215 57.4814 29.8815 54.2781 29.1426C51.0749 28.4037 47.6614 31.3457 46.6538 35.7138Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M48.4222 41.1136C47.8396 39.7585 47.6555 37.9561 48.096 36.0465C48.5365 34.1368 49.4915 32.5972 50.6088 31.6342C51.727 30.6705 52.9137 30.3468 53.9455 30.5848C54.9773 30.8228 55.9022 31.6336 56.4853 32.9897C57.0679 34.3448 57.252 36.1473 56.8116 38.0569C56.3711 39.9665 55.416 41.5061 54.2987 42.4691C53.1805 43.4328 51.9939 43.7565 50.9621 43.5185C49.9303 43.2805 49.0053 42.4697 48.4222 41.1136ZM50.6294 44.9607C47.4261 44.2219 45.6462 40.0819 46.6538 35.7138C47.6614 31.3457 51.0749 28.4037 54.2781 29.1426C57.4814 29.8815 59.2613 34.0215 58.2538 38.3895C57.2462 42.7576 53.8326 45.6996 50.6294 44.9607Z"
            fill="black"
          />
          <path
            d="M47.4756 33.3878C46.41 36.3393 47.5969 39.4724 50.1267 40.3858C52.6565 41.2992 55.5712 39.6471 56.6369 36.6956C57.7025 33.7442 56.5156 30.6111 53.9858 29.6977C51.456 28.7842 48.5413 30.4364 47.4756 33.3878Z"
            fill="#111111"
          />
          <path
            d="M18.3105 30.7734L23.1898 32.5134L20.2071 40.8779L15.3278 39.1379L18.3105 30.7734Z"
            fill="#FFEB34"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.2986 33.4103L19.2075 32.6646L17.219 38.241L19.3101 38.9867L21.2986 33.4103ZM18.3105 30.7734L15.3278 39.1379L20.2071 40.8779L23.1898 32.5134L18.3105 30.7734Z"
            fill="#FFEB34"
          />
          <path
            d="M32.8937 27.3304C30.8346 33.1049 24.4841 36.1168 18.7097 34.0576C12.9352 31.9985 9.92335 25.648 11.9825 19.8736C14.0417 14.0991 20.3921 11.0872 26.1665 13.1464C31.941 15.2056 34.9529 21.556 32.8937 27.3304Z"
            fill="#FCBF26"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.2068 32.6635C24.2113 34.4481 29.715 31.8379 31.4996 26.8333C33.2842 21.8288 30.674 16.3251 25.6694 14.5405C20.6649 12.7559 15.1612 15.3662 13.3766 20.3707C11.592 25.3752 14.2023 30.8789 19.2068 32.6635ZM18.7097 34.0576C24.4841 36.1168 30.8346 33.1049 32.8937 27.3304C34.9529 21.556 31.941 15.2056 26.1665 13.1464C20.3921 11.0872 14.0417 14.0991 11.9825 19.8736C9.92335 25.648 12.9352 31.9985 18.7097 34.0576Z"
            fill="#111111"
          />
          <path
            d="M28.712 25.8373C27.4765 29.302 23.6663 31.1091 20.2016 29.8736C16.7369 28.6381 14.9298 24.8279 16.1653 21.3632C17.4008 17.8985 21.211 16.0914 24.6757 17.3269C28.1404 18.5624 29.9475 22.3726 28.712 25.8373Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.6987 28.4796C23.3935 29.4405 26.357 28.035 27.3179 25.3402C28.2789 22.6455 26.8733 19.6819 24.1786 18.721C21.4838 17.76 18.5203 19.1656 17.5594 21.8603C16.5984 24.5551 18.004 27.5186 20.6987 28.4796ZM20.2016 29.8736C23.6663 31.1091 27.4765 29.302 28.712 25.8373C29.9475 22.3726 28.1404 18.5624 24.6757 17.3269C21.211 16.0914 17.4008 17.8985 16.1653 21.3632C14.9298 24.8279 16.7369 28.6381 20.2016 29.8736Z"
            fill="black"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.1956 19.616C24.2112 20.0244 23.8926 20.3681 23.4842 20.3836C20.7009 20.4893 19.6216 22.3896 19.424 23.2264C19.3301 23.6242 18.9315 23.8705 18.5337 23.7765C18.136 23.6826 17.8896 23.284 17.9836 22.8863C18.2993 21.5491 19.8397 19.0409 23.428 18.9046C23.8365 18.8891 24.1801 19.2076 24.1956 19.616Z"
            fill="black"
          />
          <path
            d="M61.0482 171.028C60.0675 169.004 60.7414 139.096 61.3866 127.005L58.6352 111.985L71.6844 115.843C71.7041 127.777 71.9216 154.428 72.6339 165.563C73.3462 176.698 72.8661 179.567 72.537 179.609C69.1674 184.344 52.1733 181.082 48.802 180.52C45.1251 179.908 31.2776 177.963 35.6299 171.64C39.0022 166.741 62.2741 173.559 61.0482 171.028Z"
            fill="#FFEB34"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M57.6893 110.934L72.4225 115.29L72.4234 115.842C72.4431 127.782 72.6609 154.409 73.3714 165.516C73.7282 171.094 73.7879 174.622 73.7146 176.771C73.678 177.842 73.6079 178.593 73.5187 179.092C73.4749 179.337 73.4207 179.557 73.3475 179.733C73.3115 179.82 73.2567 179.932 73.1708 180.036C73.1425 180.071 73.1025 180.115 73.05 180.158C72.0042 181.518 70.0968 182.211 68.0009 182.558C65.8028 182.922 63.1949 182.938 60.6265 182.79C56.0817 182.527 51.5383 181.743 49.3937 181.372C49.1126 181.324 48.8727 181.282 48.6794 181.25C48.5255 181.224 48.3523 181.196 48.162 181.165C46.1177 180.833 42.1026 180.18 38.9288 178.908C37.2109 178.22 35.5975 177.298 34.7241 176.028C34.2735 175.373 34.016 174.619 34.0552 173.777C34.094 172.944 34.4197 172.091 35.0193 171.22C35.5765 170.411 36.493 169.913 37.5267 169.602C38.5691 169.289 39.8208 169.14 41.1705 169.094C43.8713 169.002 47.1087 169.323 50.1559 169.712C51.415 169.872 52.6347 170.043 53.777 170.203C55.4325 170.435 56.9256 170.644 58.1408 170.766C59.0783 170.86 59.7785 170.893 60.2241 170.858C60.1944 170.722 60.1706 170.58 60.1501 170.44C60.0976 170.081 60.0533 169.63 60.0156 169.104C59.9401 168.05 59.8882 166.654 59.8558 165.01C59.7909 161.721 59.8034 157.405 59.8667 152.781C59.9928 143.577 60.3202 133.124 60.642 127.052L57.6893 110.934ZM59.5791 113.036L62.1292 126.957L62.1246 127.044C61.8026 133.077 61.4731 143.567 61.3467 152.801C61.2835 157.419 61.2711 161.715 61.3355 164.981C61.3678 166.615 61.4191 167.982 61.4919 168.998C61.5284 169.507 61.5695 169.918 61.6146 170.225C61.6371 170.379 61.6594 170.499 61.6803 170.588C61.6979 170.662 61.7104 170.697 61.7133 170.705C61.7142 170.707 61.7143 170.707 61.7133 170.705C61.7918 170.867 61.8586 171.086 61.8253 171.336C61.7899 171.602 61.653 171.812 61.4861 171.957C61.2029 172.203 60.8173 172.279 60.5366 172.314C59.9188 172.391 59.0209 172.341 57.9932 172.238C56.7574 172.115 55.2077 171.898 53.5205 171.662C52.3812 171.502 51.1791 171.334 49.9688 171.18C46.9297 170.793 43.7935 170.486 41.2206 170.573C39.9335 170.617 38.8234 170.758 37.9525 171.02C37.0728 171.284 36.5243 171.644 36.2384 172.06C35.7499 172.769 35.5563 173.36 35.5337 173.846C35.5115 174.323 35.6506 174.763 35.9435 175.189C36.5574 176.082 37.8197 176.869 39.4792 177.534C42.4893 178.74 46.3404 179.368 48.403 179.705C48.5919 179.736 48.7658 179.764 48.9227 179.79C49.1218 179.823 49.3666 179.866 49.6517 179.915C51.8054 180.286 56.2595 181.055 60.7118 181.312C63.2346 181.458 65.7177 181.436 67.759 181.098C69.8417 180.753 71.2724 180.108 71.9331 179.18L72.0103 179.071C72.0248 179.017 72.0426 178.939 72.0616 178.832C72.1327 178.434 72.1998 177.764 72.2354 176.721C72.3063 174.641 72.2498 171.167 71.8944 165.61C71.1911 154.617 70.9698 128.576 70.9444 116.396L59.5791 113.036Z"
            fill="#111111"
          />
          <path
            d="M84.6129 168.862C83.4782 166.974 81.7965 139.397 81.5499 127.266L77.6777 112.354L91.0682 114.486C91.971 126.373 94.1614 152.898 95.7006 163.898C97.2398 174.899 95.8915 176.052 95.8915 176.052C92.8578 181.212 79.0797 181.373 75.6496 181.306C71.6049 181.228 57.6442 182.033 60.9617 174.888C64.2792 167.743 86.0312 171.223 84.6129 168.862Z"
            fill="#FFEB34"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M76.6624 111.435L91.762 113.84L91.8036 114.387C92.7069 126.281 94.8957 152.781 96.4311 163.754C97.2039 169.277 97.2596 172.378 97.1079 174.122C97.032 174.995 96.9021 175.554 96.769 175.918C96.7018 176.102 96.6311 176.243 96.5609 176.353C96.5351 176.394 96.5092 176.43 96.4833 176.463C95.5882 177.938 93.9895 178.984 92.1798 179.739C90.3285 180.512 88.1483 181.026 85.9921 181.369C81.6765 182.056 77.3249 182.079 75.5909 182.046C75.2137 182.038 74.7369 182.039 74.1864 182.04C71.8907 182.045 68.3156 182.052 65.361 181.473C63.5401 181.116 61.8001 180.512 60.7421 179.425C60.1972 178.865 59.8283 178.171 59.7369 177.333C59.6464 176.502 59.8347 175.592 60.2918 174.607C61.2743 172.491 63.5541 171.282 66.0876 170.552C68.6568 169.812 71.7121 169.5 74.562 169.341C75.9919 169.26 77.3828 169.218 78.6461 169.181L78.8337 169.176C80.0265 169.141 81.0919 169.11 81.9766 169.055C82.7979 169.004 83.4021 168.935 83.7877 168.844C83.7443 168.711 83.7066 168.569 83.6725 168.429C83.5918 168.095 83.512 167.676 83.4331 167.188C83.2749 166.21 83.1136 164.916 82.9525 163.39C82.6301 160.337 82.3051 156.324 82.0083 151.997C81.4175 143.383 80.9364 133.496 80.81 127.408L76.6624 111.435ZM78.6886 113.27L82.2855 127.122L82.2873 127.208C82.4103 133.258 82.8916 143.172 83.4841 151.812C83.7804 156.131 84.104 160.124 84.4237 163.152C84.5837 164.667 84.7418 165.931 84.8938 166.87C84.9699 167.341 85.0429 167.72 85.1115 168.003C85.1458 168.145 85.1772 168.255 85.2049 168.337C85.2346 168.425 85.2519 168.456 85.2504 168.453C85.3368 168.597 85.4155 168.789 85.4167 169.019C85.418 169.266 85.3303 169.491 85.1895 169.672C84.947 169.985 84.5778 170.13 84.3197 170.211C83.7548 170.386 82.9227 170.474 81.9836 170.533C81.0737 170.589 79.9853 170.621 78.8038 170.655L78.6046 170.661C77.3407 170.698 75.9679 170.74 74.5602 170.819C71.7346 170.978 68.8185 171.283 66.4205 171.974C63.9868 172.675 62.3036 173.71 61.6272 175.167C61.255 175.968 61.1539 176.596 61.2076 177.089C61.2605 177.574 61.4696 177.991 61.8302 178.361C62.5832 179.135 63.9641 179.674 65.7243 180.019C68.5202 180.567 71.8823 180.562 74.1892 180.558C74.7695 180.558 75.2831 180.557 75.7041 180.565C77.4002 180.598 81.6526 180.574 85.842 179.907C87.9383 179.573 89.9858 179.084 91.6783 178.377C93.3866 177.664 94.6278 176.774 95.2573 175.704L95.3254 175.588L95.3469 175.569C95.3562 175.549 95.3685 175.52 95.383 175.481C95.4545 175.285 95.5655 174.868 95.6342 174.077C95.7719 172.495 95.7322 169.518 94.9658 164.041C93.446 153.18 91.2967 127.261 90.3702 115.131L78.6886 113.27Z"
            fill="#111111"
          />
          <path
            d="M64.9571 4.35335C75.1327 6.17753 80.2344 31.427 81.5134 43.8238C81.9975 47.7819 85.159 48.1999 99.8038 56.8034C111.52 63.6862 106.562 73.4626 102.619 77.4905C110.793 79.0296 126.704 84.9572 124.955 96.3552C123.207 107.753 111.921 110.456 106.496 110.383C106.942 110.969 106.253 114.386 99.9375 123.368C93.6217 132.349 81.414 128.094 76.0997 124.844C54.2205 148.042 46.6615 133.314 45.6169 123.05C40.7577 125.498 30.136 126.708 26.5231 111.961C22.9102 97.2133 38.7213 79.402 47.0785 72.3397C23.9248 79.9092 39.2196 54.4192 47.1901 44.4153C55.1606 34.4114 52.2378 2.07312 64.9571 4.35335Z"
            fill="#00BC68"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M61.2481 5.64507C62.2364 5.05745 63.399 4.82488 64.8277 5.081C67.0847 5.48562 69.1635 7.21289 71.0475 9.96423C72.922 12.7016 74.5276 16.3441 75.8708 20.3579C78.5556 28.3809 80.1425 37.7355 80.7784 43.899L80.78 43.9129C80.9147 45.0145 81.2466 45.9207 81.9429 46.7777C82.6162 47.6064 83.6007 48.3511 84.9575 49.1985C86.2313 49.994 87.8934 50.9157 90.0308 52.1008C90.1776 52.1822 90.3266 52.2648 90.4779 52.3487C92.8398 53.6588 95.7769 55.2946 99.4301 57.4407C102.274 59.1114 104.057 60.9284 105.101 62.7415C106.142 64.5501 106.471 66.3944 106.346 68.1649C106.095 71.7385 103.989 75.0335 102.091 76.972C101.9 77.1671 101.832 77.4515 101.914 77.7119C101.996 77.9723 102.215 78.1665 102.483 78.217C106.509 78.9751 112.431 80.8153 117.106 83.846C121.795 86.8854 125.033 90.9755 124.225 96.2422C123.391 101.678 120.299 105.024 116.743 107.025C113.16 109.04 109.116 109.678 106.507 109.642C106.225 109.639 105.964 109.797 105.837 110.049C105.722 110.277 105.733 110.545 105.861 110.761C105.862 110.769 105.863 110.779 105.864 110.791C105.87 110.876 105.864 111.027 105.821 111.261C105.735 111.726 105.517 112.431 105.077 113.427C104.198 115.416 102.477 118.471 99.3333 122.941C96.3705 127.154 92.0349 128.288 87.7011 127.954C83.3424 127.618 79.0741 125.794 76.4869 124.212C76.1883 124.029 75.8026 124.08 75.5625 124.335C70.126 130.099 65.6282 133.453 61.9493 135.118C58.2853 136.777 55.4799 136.744 53.3412 135.815C51.1819 134.877 49.5625 132.966 48.4104 130.598C47.26 128.233 46.609 125.477 46.3542 122.974C46.3296 122.732 46.1872 122.517 45.9736 122.4C45.7601 122.283 45.5025 122.279 45.285 122.388C42.9727 123.553 39.3107 124.405 35.8372 123.251C32.4222 122.115 29.005 118.976 27.243 111.784C25.5101 104.711 28.424 96.7929 32.9384 89.6634C37.4361 82.5604 43.4239 76.3972 47.5573 72.9042C47.8277 72.6757 47.8984 72.2877 47.726 71.9785C47.5535 71.6693 47.1862 71.5256 46.8497 71.6356C43.9939 72.5692 41.7821 72.9752 40.1066 72.9826C38.432 72.9901 37.3618 72.6004 36.6949 72.0184C36.0354 71.4428 35.6613 70.5836 35.5765 69.4141C35.491 68.2354 35.706 66.7976 36.1749 65.1718C38.0594 58.638 43.8012 49.8569 47.77 44.8756C49.8739 42.235 51.2142 38.1938 52.2612 33.7847C52.9136 31.0377 53.4676 28.07 54.0142 25.1418C54.3451 23.3694 54.6732 21.6115 55.0189 19.9256C55.9475 15.3963 57.0058 11.3635 58.5795 8.61076C59.3615 7.2429 60.2424 6.24313 61.2481 5.64507ZM105.857 110.736C105.857 110.736 105.857 110.737 105.858 110.74C105.857 110.737 105.857 110.736 105.857 110.736ZM50.8212 33.4428C49.7771 37.8395 48.4938 41.592 46.6124 43.9533C42.6107 48.976 36.7198 57.9419 34.7528 64.7617C34.2588 66.4743 33.9972 68.1003 34.1003 69.5212C34.204 70.9513 34.6836 72.2275 35.7217 73.1335C36.7523 74.033 38.2236 74.4711 40.1132 74.4627C41.2813 74.4575 42.6355 74.2822 44.1926 73.9223C40.2597 77.6029 35.4658 82.9054 31.6879 88.8716C27.1107 96.1003 23.9254 104.462 25.8054 112.136C27.6564 119.691 31.3565 123.321 35.3703 124.655C38.8664 125.817 42.4587 125.189 45.0046 124.141C45.333 126.494 45.9934 129.013 47.0794 131.245C48.3221 133.8 50.1558 136.045 52.7516 137.173C55.3682 138.309 58.6202 138.25 62.5597 136.467C66.3869 134.734 70.9056 131.358 76.2311 125.781C78.9885 127.371 83.2173 129.092 87.5873 129.429C92.2648 129.79 97.191 128.56 100.544 123.792C103.716 119.281 105.497 116.138 106.43 114.026C106.896 112.972 107.161 112.151 107.276 111.53C107.303 111.385 107.323 111.246 107.334 111.113C110.123 111.017 113.983 110.275 117.468 108.315C121.347 106.133 124.773 102.429 125.688 96.4666C126.628 90.3354 122.784 85.7626 117.912 82.604C113.506 79.748 108.096 77.928 104.034 77.0252C105.82 74.8815 107.579 71.7351 107.823 68.2687C107.966 66.2312 107.584 64.0892 106.383 62.003C105.185 59.9215 103.194 57.9354 100.18 56.1646C96.5106 54.009 93.5607 52.3662 91.1958 51.0544C91.051 50.9741 90.9084 50.895 90.768 50.8172C88.6099 49.6205 86.9811 48.7173 85.7415 47.9431C84.4168 47.1158 83.6049 46.4762 83.0916 45.8444C82.6025 45.2425 82.3577 44.6138 82.2499 43.7399C81.6064 37.5066 80.003 28.0422 77.2744 19.8882C75.9103 15.8121 74.2527 12.0253 72.2687 9.12801C70.2943 6.24462 67.9196 4.13163 65.0889 3.62416C63.3377 3.31022 61.8093 3.58942 60.4917 4.37292C59.1916 5.14599 58.1518 6.3767 57.2946 7.87621C55.5899 10.8582 54.4958 15.1077 53.569 19.6283C53.2115 21.372 52.8792 23.1534 52.5471 24.9338C52.0071 27.8287 51.4676 30.7208 50.8212 33.4428Z"
            fill="#111111"
          />
          <path
            d="M38.8355 62.4451C49.3117 67.438 59.2272 59.241 62.8754 54.5185C65.0153 52.9245 65.7122 53.173 70.5428 57.2526C74.4074 60.5163 74.0136 62.9425 73.3337 63.7476C67.4628 70.2965 51.8128 82.2363 36.1796 77.6044C16.6382 71.8145 14.3148 54.094 14.8119 52.6999C15.3091 51.3058 11.8725 47.7233 10.9512 47.0019C10.0299 46.2806 9.20862 46.3805 9.13302 44.3894C9.07254 42.7965 12.3931 43.3258 14.0609 43.7896C12.6668 43.2925 9.28158 42.871 9.80299 40.3071C10.2353 38.4764 12.2628 38.6461 14.0733 39.274C12.3711 38.2538 12.0328 37.0945 12.24 35.6764C12.5129 33.8095 15.8739 35.4008 18.3135 36.2708C20.2652 36.9668 21.2503 35.7467 21.4988 35.0496C32.2786 40.0722 25.7404 56.2041 38.8355 62.4451Z"
            fill="#FDFBEF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.2125 34.3672C21.4047 34.2868 21.6218 34.2912 21.8106 34.3791C27.2738 36.9246 28.5608 42.1764 29.8061 47.2581C29.8761 47.5436 29.946 47.8286 30.0164 48.1125C31.3652 53.5496 32.9418 58.8171 39.1531 61.7774C44.1368 64.1525 48.9942 63.4054 53.0977 61.4569C57.2174 59.5006 60.5215 56.3543 62.289 54.0663C62.3302 54.013 62.3785 53.9655 62.4326 53.9253C62.9751 53.5212 63.5058 53.1702 64.0767 52.993C64.6868 52.8037 65.2902 52.8267 65.9479 53.0612C66.5745 53.2847 67.2514 53.7005 68.0454 54.2842C68.8457 54.8727 69.8121 55.6678 71.0195 56.6875C74.9902 60.0409 74.9874 62.9357 73.8983 64.2253C73.8936 64.2309 73.8888 64.2364 73.8839 64.2418C70.8935 67.5776 65.4387 72.2622 58.7416 75.534C52.0442 78.8059 44.0253 80.7013 35.9686 78.3142C25.987 75.3568 20.3756 69.3366 17.3337 63.8635C15.816 61.1329 14.9384 58.5405 14.4713 56.5331C14.2379 55.5298 14.1053 54.6655 14.0477 53.9965C14.019 53.6626 14.0083 53.3691 14.0147 53.1263C14.0206 52.9072 14.0412 52.6561 14.1141 52.4516C14.1148 52.4496 14.1332 52.3899 14.1011 52.2347C14.0698 52.0833 13.9998 51.8874 13.8829 51.6493C13.6489 51.1726 13.2725 50.6179 12.831 50.0563C11.9437 48.928 10.8953 47.8989 10.4942 47.5849C10.3204 47.4488 10.1514 47.3487 9.95119 47.2301C9.93788 47.2222 9.92444 47.2143 9.91085 47.2062C9.70702 47.0854 9.44718 46.9301 9.21397 46.7081C8.69078 46.2101 8.43446 45.5167 8.39274 44.4177C8.38007 44.0842 8.45682 43.7651 8.63602 43.4869C8.81146 43.2144 9.05543 43.0268 9.30688 42.899C9.45925 42.8216 9.6233 42.7615 9.79389 42.7155C9.66078 42.5802 9.53842 42.4313 9.43153 42.2673C9.05136 41.6841 8.91101 40.9762 9.07702 40.1599C9.07856 40.1523 9.08021 40.1448 9.08198 40.1373C9.22208 39.544 9.50616 39.0632 9.92455 38.7159C10.3363 38.3741 10.8278 38.2031 11.32 38.1356C11.4925 38.112 11.6692 38.1005 11.8485 38.0994C11.8197 38.0442 11.7924 37.9885 11.7666 37.932C11.4158 37.1636 11.3911 36.3623 11.507 35.5696C11.5584 35.218 11.6922 34.8921 11.9339 34.6295C12.1743 34.3682 12.4752 34.2195 12.7776 34.1425C13.3491 33.9969 14.017 34.0845 14.6305 34.2266C15.5315 34.4354 16.599 34.8389 17.5574 35.2012C17.9116 35.3351 18.2508 35.4633 18.5613 35.574C19.3519 35.856 19.8557 35.7283 20.1702 35.5442C20.5172 35.3411 20.7251 35.0142 20.801 34.8014C20.871 34.6052 21.0203 34.4476 21.2125 34.3672ZM13.7607 39.9497C14.3396 40.2889 15.04 40.6038 15.8757 40.9018C16.2371 41.0306 16.637 40.8619 16.7969 40.5131C16.9568 40.1644 16.8236 39.7512 16.4901 39.5615C15.922 39.2383 15.1798 38.8813 14.3904 38.6015C13.6675 38.1569 13.2994 37.7257 13.113 37.3174C12.9209 36.8965 12.8801 36.4092 12.9715 35.7837C12.9882 35.6695 13.0188 35.6363 13.023 35.6317L13.0231 35.6316C13.0283 35.6259 13.0538 35.5995 13.143 35.5767C13.3546 35.5228 13.7307 35.5374 14.2964 35.6685C15.094 35.8533 16.0071 36.1985 16.9305 36.5476C17.309 36.6907 17.6893 36.8345 18.0641 36.9681C19.2253 37.3822 20.1898 37.2477 20.9179 36.8215C21.2913 36.603 21.5821 36.3197 21.7981 36.0293C26.0871 38.3612 27.171 42.7568 28.4106 47.7837C28.4666 48.0109 28.5229 48.2393 28.5799 48.4689C29.9307 53.9137 31.6325 59.8327 38.5164 63.1134C44.0089 65.7311 49.3472 64.8762 53.7326 62.7938C58.0529 60.7424 61.5017 57.4796 63.3966 55.0531C63.8809 54.6975 64.219 54.4986 64.5155 54.4066C64.7889 54.3217 65.0629 54.3169 65.4507 54.4553C65.8696 54.6046 66.4064 54.9162 67.1686 55.4767C67.9244 56.0324 68.8567 56.7982 70.0646 57.8183C73.7991 60.9722 73.048 62.9249 72.7727 63.2641C69.8902 66.4766 64.5888 71.0302 58.0919 74.2041C51.5882 77.3814 43.9655 79.14 36.3891 76.8951C26.8292 74.0627 21.5082 68.3276 18.6274 63.1445C17.1837 60.547 16.3523 58.0859 15.9129 56.1977C15.6931 55.2532 15.5731 54.4591 15.5224 53.8696C15.497 53.5742 15.4897 53.3384 15.4943 53.1656C15.4986 53.0039 15.5125 52.9409 15.5113 52.9406C15.5111 52.9405 15.5101 52.9434 15.5082 52.9487C15.6318 52.6022 15.6147 52.2449 15.5504 51.9346C15.4854 51.6204 15.3612 51.3021 15.2115 50.997C14.9122 50.3874 14.465 49.74 13.9944 49.1415C13.0573 47.9497 11.9269 46.8269 11.4067 46.4195C11.1538 46.2216 10.9068 46.0756 10.7153 45.9624C10.6983 45.9524 10.6818 45.9427 10.6658 45.9331C10.4541 45.8076 10.3312 45.7282 10.2344 45.6361C10.0977 45.506 9.90561 45.2537 9.87174 44.3616C9.87039 44.3262 9.87416 44.3068 9.87615 44.2991C9.87796 44.292 9.87952 44.2896 9.8804 44.2882C9.88149 44.2865 9.90005 44.2578 9.97745 44.2184C10.1529 44.1293 10.4765 44.0626 10.9544 44.0585C11.8878 44.0505 13.06 44.2799 13.8619 44.5029C14.2457 44.6096 14.6452 44.3933 14.7656 44.0135C14.886 43.6336 14.684 43.2267 14.3087 43.0929C14.0568 43.003 13.7306 42.911 13.4039 42.8189C13.2478 42.7749 13.0916 42.7308 12.9433 42.6869C12.4493 42.5408 11.9647 42.3767 11.5495 42.1646C11.1309 41.9508 10.8389 41.716 10.6715 41.4592C10.5212 41.2287 10.4342 40.9255 10.5251 40.4663C10.6015 40.1511 10.7316 39.9695 10.8699 39.8547C11.0165 39.733 11.2261 39.6424 11.521 39.602C12.1185 39.5201 12.9176 39.6642 13.7607 39.9497Z"
            fill="black"
          />
          <path
            d="M55.9011 36.5648C55.3869 41.018 57.6174 44.9337 60.883 45.3108C64.1487 45.6878 67.2129 42.3835 67.7271 37.9304C68.2413 33.4772 66.0109 29.5615 62.7452 29.1844C59.4795 28.8073 56.4153 32.1116 55.9011 36.5648Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M58.2607 41.7337C57.5306 40.452 57.1466 38.6814 57.3714 36.7346C57.5962 34.7877 58.3737 33.1512 59.3766 32.0696C60.3803 30.9873 61.5235 30.5332 62.5754 30.6547C63.6273 30.7762 64.6369 31.4788 65.3676 32.7614C66.0976 34.0431 66.4816 35.8138 66.2568 37.7606C66.032 39.7074 65.2546 41.344 64.2516 42.4255C63.2479 43.5079 62.1047 43.9619 61.0528 43.8405C60.0009 43.719 58.9913 43.0164 58.2607 41.7337ZM60.883 45.3108C57.6174 44.9337 55.3869 41.0179 55.9011 36.5648C56.4153 32.1116 59.4795 28.8073 62.7452 29.1844C66.0109 29.5615 68.2413 33.4772 67.7271 37.9304C67.2129 42.3835 64.1487 45.6878 60.883 45.3108Z"
            fill="black"
          />
          <path
            d="M56.4574 34.1587C55.7275 37.2106 57.2564 40.1918 59.8723 40.8174C62.4881 41.443 65.2004 39.4762 65.9303 36.4243C66.6602 33.3725 65.1314 30.3913 62.5155 29.7656C59.8996 29.14 57.1873 31.1068 56.4574 34.1587Z"
            fill="#111111"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M54.6191 51.911C54.3033 52.5092 53.5624 52.7382 52.9642 52.4225C52.5383 52.1977 51.7583 51.9184 50.9211 51.8725C50.0982 51.8275 49.3346 52.0093 48.7412 52.5516C48.242 53.0079 47.4672 52.9731 47.0109 52.4738C46.5545 51.9746 46.5893 51.1998 47.0886 50.7435C48.3124 49.6249 49.801 49.3579 51.0551 49.4266C52.295 49.4945 53.417 49.8916 54.1076 50.2561C54.7058 50.5718 54.9348 51.3128 54.6191 51.911Z"
            fill="black"
          />
        </svg>
        <div className="flex w-full flex-col items-center justify-center space-y-2">
          <h1 className="text-mainTitle2-bold ">페이지를 찾을 수 없어요</h1>
          <p className="text-subTitle2-medium text-text-sub-gray4f">
            입력한 주소가 정확한지 <br />
            다시 한번 확인해 주세요
          </p>
        </div>
        <Button
          onClick={() => {
            router.push('/garden')
          }}
          className="w-40"
        >
          내 정원가기
        </Button>
      </div>
    </BaseLayout>
  )
}

Pages.getLayout = (page: ReactNode) => page

export default Pages
