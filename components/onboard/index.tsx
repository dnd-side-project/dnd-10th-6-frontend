import Button from '@/components/button'
import Carousel from '@/components/carousel'
import { useState } from 'react'

export const onBoardingItems = [
  <div
    key="step1"
    className="px-5 h-full pt-[11.8dvh] pb-[16dvh] flex flex-col items-center text-center"
  >
    <h2 className="text-mainTitle2-medium">
      나에 대해 <b>얼마나 알고 있나요?</b>
    </h2>
    <svg
      className="mt-auto"
      width="158"
      height="272"
      viewBox="0 0 158 272"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M69.1143 254.891C67.5423 252.295 64.8125 214.622 64.1576 198.301L58.5719 178.474L76.584 182.014C78.1123 198.04 81.7584 233.809 84.1163 248.674C86.4743 263.54 86.1905 267.454 85.7538 267.552C81.8239 274.336 58.5719 269.322 54.3145 267.552C50.0571 265.782 32.0451 260.768 36.3025 251.329C40.5599 241.89 71.0793 258.135 69.1143 254.891Z"
        fill="#FFEB34"
        stroke="#111111"
        strokeWidth="2"
      />
      <path
        d="M109.594 251.587C110.435 248.736 103.281 212.16 99.4904 196.236L99.4904 175.452L82.7295 182.777C85.5809 198.604 91.7138 233.98 93.4337 248.865C95.1535 263.75 96.4962 267.472 96.9526 267.473C102.663 273.181 124.179 263.296 127.887 260.662C131.595 258.028 147.955 249.278 141.201 241.074C134.447 232.869 108.542 255.15 109.594 251.587Z"
        fill="#FFEB34"
        stroke="#111111"
        strokeWidth="2"
      />
      <path
        d="M80.2039 33.3499C66.6554 36.6544 61.8914 71.0763 61.203 87.8741C60.8811 93.2438 56.6594 94.0702 37.6585 106.875C22.4578 117.119 29.948 129.869 35.5932 134.963C24.7159 137.717 3.78739 147.025 7.09189 162.226C10.3964 177.426 25.8174 180.125 33.1148 179.574C32.564 180.4 33.7757 184.944 43.0283 196.51C52.2809 208.075 68.3628 201.329 75.2471 196.51C106.64 225.92 115.59 205.459 116.14 191.553C122.887 194.444 137.289 195.188 140.924 175.03C144.559 154.873 121.785 132.21 109.944 123.398C141.75 131.659 119.032 98.6138 107.466 85.8088C95.9002 73.0039 97.1394 29.2193 80.2039 33.3499Z"
        fill="#00BC68"
        stroke="#111111"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M66.9948 95.5297C67.7495 102.022 72.3841 106.372 76.9301 105.843C81.4761 105.315 84.9892 100.018 84.2345 93.5255C83.4798 87.0334 78.8452 82.6835 74.2992 83.2119C69.7532 83.7404 66.2401 89.0376 66.9948 95.5297Z"
        fill="white"
        stroke="#111111"
        strokeWidth="2"
      />
      <ellipse
        cx="7.43512"
        cy="8.67431"
        rx="7.43512"
        ry="8.67431"
        transform="matrix(-0.994197 0.107573 0.107573 0.994197 80.8184 81.1489)"
        fill="#111111"
      />
      <path
        d="M81.4487 95.2871C82.1778 98.4354 83.766 101.03 85.6966 102.691C87.6277 104.352 89.8379 105.038 91.8977 104.561C93.9575 104.084 95.6413 102.496 96.6455 100.155C97.6493 97.8144 97.9355 94.7861 97.2064 91.6378C96.4772 88.4895 94.889 85.8953 92.9584 84.2343C91.0273 82.5729 88.8171 81.8873 86.7573 82.3643C84.6975 82.8413 83.0137 84.4287 82.0095 86.7699C81.0057 89.1105 80.7195 92.1388 81.4487 95.2871Z"
        fill="white"
        stroke="#111111"
        strokeWidth="2"
      />
      <ellipse
        cx="7.43512"
        cy="8.67431"
        rx="7.43512"
        ry="8.67431"
        transform="matrix(-0.994197 0.107573 0.107573 0.994197 93.8945 81.5479)"
        fill="#111111"
      />
      <path
        d="M93.1473 133.936C94.4429 129.968 93.8526 124.287 96.8009 123.409C100.486 122.312 100.751 130.365 102.921 134.077C105.09 137.788 112.853 150.576 120.107 147.69C127.362 144.804 126.425 135.591 131.31 135.591C135.986 135.591 137.489 135.769 136.937 139.494C136.377 143.265 135.551 151.113 125.638 156.896C114.178 163.581 109.941 158.745 98.0237 149.187C95.8228 151.914 94.4052 152.453 93.3352 151.748C94.1988 152.912 94.3493 154.105 91.3881 153.922C86.7781 153.637 87.0347 150.626 89.1079 146.603L87.0854 150.41C86.3217 151.702 84.7016 153.734 84.1789 146.918C84.0181 145.408 84.5872 143.928 85.2571 142.801C83.6908 145.083 81.7791 147.503 77.1191 147.276C70.4095 146.949 76.4242 143.126 79.722 141.563C83.0198 140 92.8824 134.723 93.1473 133.936Z"
        fill="#FDFBEF"
        stroke="#111111"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M45.003 174.764C48.765 172.955 54.4747 172.789 54.9547 169.75C55.5546 165.952 47.5369 166.755 43.5711 165.095C39.6053 163.436 25.9038 157.433 27.8047 149.86C29.7056 142.287 38.9617 141.997 38.3157 137.155C37.6974 132.521 37.3226 131.054 33.7031 132.094C30.0392 133.147 22.3692 135.004 17.9482 145.595C12.8374 157.839 18.1908 161.399 29.2409 171.948C26.8289 174.49 26.4824 175.966 27.3231 176.933C26.0552 176.231 24.8522 176.24 25.4253 179.151C26.3176 183.683 29.2682 183.03 32.982 180.443L29.4757 182.952C28.2956 183.879 26.4963 185.754 33.3215 185.371C34.8397 185.33 36.2311 184.571 37.2593 183.758C35.2052 185.612 33.0589 187.827 33.9 192.416C35.1112 199.023 38.106 192.556 39.2187 189.08C40.3314 185.605 44.2582 175.131 45.003 174.764Z"
        fill="#FDFBEF"
        stroke="#111111"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M88.3723 117.424C88.2422 118.327 87.4045 118.954 86.5013 118.824C85.8583 118.731 84.7406 118.73 83.6562 119.051C82.5901 119.366 81.7022 119.943 81.194 120.901C80.7664 121.707 79.7662 122.014 78.9601 121.587C78.154 121.159 77.8472 120.159 78.2749 119.353C79.323 117.377 81.0935 116.363 82.7182 115.882C84.3245 115.407 85.9299 115.403 86.9726 115.553C87.8757 115.683 88.5024 116.521 88.3723 117.424Z"
        fill="#111111"
      />
      <path
        d="M123.978 16.4659C123.09 5.9177 133.132 2.9041 137.708 1.39787C158.303 -2.36913 159.829 21.7391 153.727 26.2595C146.862 31.345 145.336 36.8074 143.811 40.5744C142.285 44.3414 134.657 43.588 134.657 38.3142C134.657 27.0132 147.625 23.9999 146.099 16.4659C144.573 8.93188 135.42 11.1921 133.132 17.2193C130.843 23.2465 124.74 25.5062 123.978 16.4659Z"
        fill="#FAA71E"
        stroke="#111111"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="140.893"
        cy="56.9051"
        r="5.98813"
        fill="#FAA71E"
        stroke="#111111"
        strokeWidth="2"
      />
    </svg>
  </div>,
  <div
    key="step2"
    className="px-5 h-full pt-[11.8dvh] pb-[16dvh] flex flex-col items-center"
  >
    <h2 className="text-mainTitle2-medium text-center">
      남의위키를 통해{' '}
      <b>
        타인의 눈으로 본<br />
        &apos;나&apos;를 발견
      </b>
      하고 탐구해보세요
    </h2>
    <svg
      className="mt-auto"
      width="171"
      height="246"
      viewBox="0 0 171 246"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M62.7989 47.3328C62.1622 50.0928 62.4166 52.742 63.2944 54.7837C64.1725 56.8261 65.6358 58.1947 67.4108 58.6042C69.1858 59.0136 71.1008 58.4242 72.7847 56.9728C74.4682 55.5219 75.8573 53.2518 76.4939 50.4918C77.1306 47.7318 76.8762 45.0826 75.9984 43.0409C75.1203 40.9985 73.657 39.6299 71.882 39.2204C70.107 38.811 68.192 39.4004 66.5081 40.8518C64.8246 42.3027 63.4355 44.5728 62.7989 47.3328Z"
        fill="white"
        stroke="black"
        strokeWidth="2"
      />
      <ellipse
        cx="6.56782"
        cy="7.66245"
        rx="6.56782"
        ry="7.66245"
        transform="matrix(-0.940568 -0.339605 -0.339605 0.940568 77.8896 41.2246)"
        fill="#111111"
      />
      <rect
        x="24.2047"
        y="41.7163"
        width="4.98612"
        height="9.97621"
        transform="rotate(19.6261 24.2047 41.7163)"
        fill="#FFEB34"
        stroke="black"
        strokeWidth="2"
      />
      <circle
        cx="29.1661"
        cy="30.7689"
        r="13.9703"
        transform="rotate(19.6261 29.1661 30.7689)"
        fill="#FCBF26"
        stroke="black"
        strokeWidth="2"
      />
      <circle
        cx="29.1661"
        cy="30.7688"
        r="7.98216"
        transform="rotate(19.6261 29.1661 30.7688)"
        fill="white"
        stroke="black"
        strokeWidth="2"
      />
      <path
        d="M24.1317 30.033C24.4779 28.567 26.2443 25.5944 30.5408 25.4312"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M81.2346 229.594C79.912 226.863 80.8208 186.53 81.6909 170.223L77.9803 149.967L95.5786 155.17C95.6052 171.265 95.8986 207.207 96.8591 222.224C97.8197 237.241 97.1723 241.109 96.7285 241.166C92.1842 247.552 69.2658 243.153 64.7192 242.395C59.7605 241.569 41.0855 238.946 46.955 230.419C51.503 223.812 82.8878 233.006 81.2346 229.594Z"
        fill="#FFEB34"
        stroke="black"
        strokeWidth="2"
      />
      <path
        d="M113.015 226.673C111.484 224.126 109.217 186.936 108.884 170.576L103.662 150.465L121.72 153.341C122.938 169.372 125.892 205.144 127.968 219.979C130.044 234.814 128.225 236.37 128.225 236.37C124.134 243.328 105.553 243.545 100.927 243.455C95.472 243.35 76.6445 244.435 81.1185 234.799C85.5925 225.164 114.928 229.856 113.015 226.673Z"
        fill="#FFEB34"
        stroke="black"
        strokeWidth="2"
      />
      <path
        d="M86.5088 4.8121C100.232 7.27222 107.112 41.324 108.837 58.0424C109.49 63.3804 113.753 63.9442 133.503 75.5469C149.304 84.8291 142.618 98.0138 137.3 103.446C148.323 105.521 169.781 113.516 167.423 128.887C165.065 144.258 149.844 147.904 142.529 147.805C143.13 148.596 142.201 153.204 133.684 165.316C125.166 177.428 108.703 171.69 101.536 167.307C72.0292 198.592 61.835 178.729 60.4262 164.888C53.873 168.19 39.5485 169.821 34.6761 149.933C29.8037 130.044 51.1268 106.024 62.3974 96.4994C31.172 106.708 51.7987 72.3315 62.5479 58.8401C73.297 45.3487 69.3552 1.73696 86.5088 4.8121Z"
        fill="#00BC68"
        stroke="black"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M51.2792 83.1562C65.4075 89.8896 78.7797 78.8351 83.6997 72.4661C86.5855 70.3165 87.5254 70.6517 94.0401 76.1535C99.2518 80.5549 98.7208 83.8269 97.8038 84.9126C89.8863 93.7446 68.7805 109.847 47.6974 103.6C21.3436 95.7918 18.2102 71.8937 18.8807 70.0136C19.5511 68.1335 14.9165 63.3021 13.6741 62.3293C12.4316 61.3564 11.324 61.4912 11.222 58.8059C11.1405 56.6577 15.6186 57.3716 17.8678 57.9971C15.9877 57.3267 11.4224 56.7582 12.1256 53.3005C12.7085 50.8316 15.4429 51.0604 17.8845 51.9072C15.5889 50.5314 15.1327 48.968 15.4122 47.0555C15.7802 44.5378 20.3128 46.6839 23.6029 47.8571C26.235 48.7957 27.5635 47.1503 27.8987 46.2103C42.4365 52.9837 33.6189 74.7394 51.2792 83.1562Z"
        fill="#FDFBEF"
        stroke="black"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M75.2871 48.3679C74.9622 51.1817 75.5104 53.786 76.6103 55.7171C77.7107 57.6488 79.3175 58.8457 81.1271 59.0547C82.9366 59.2636 84.774 58.4644 86.2856 56.8343C87.7968 55.2047 88.9241 52.7939 89.249 49.9801C89.5739 47.1663 89.0257 44.562 87.9257 42.6309C86.8254 40.6992 85.2185 39.5022 83.409 39.2933C81.5994 39.0843 79.7621 39.8836 78.2505 41.5137C76.7393 43.1432 75.612 45.5541 75.2871 48.3679Z"
        fill="white"
        stroke="black"
        strokeWidth="2"
      />
      <ellipse
        cx="6.56782"
        cy="7.66245"
        rx="6.56782"
        ry="7.66245"
        transform="matrix(-0.972571 -0.232608 -0.232608 0.972571 89.6025 40.6157)"
        fill="#111111"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M72.5671 68.9514C72.1413 69.7581 71.1421 70.067 70.3353 69.6412C69.7609 69.338 68.709 68.9614 67.58 68.8995C66.4702 68.8387 65.4403 69.0839 64.6402 69.8153C63.9668 70.4307 62.9221 70.3838 62.3066 69.7104C61.6911 69.0371 61.7381 67.9923 62.4114 67.3768C64.0619 65.8683 66.0694 65.5083 67.7607 65.6009C69.4329 65.6925 70.9459 66.228 71.8773 66.7196C72.6841 67.1454 72.9929 68.1446 72.5671 68.9514Z"
        fill="black"
      />
    </svg>
  </div>,
  <div
    key="step3"
    className="px-5 h-full pt-[11.8dvh] pb-[16dvh] flex flex-col items-center"
  >
    <h2 className="text-mainTitle2-medium text-center">
      <b>남이 작성한 내 소개서</b>를 통해
      <br />
      <b>나에 대해</b> 더 자세히 알 수 있어요
    </h2>
    <svg
      className="mt-auto"
      width="228"
      height="246"
      viewBox="0 0 228 246"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M138.699 121.758C120.336 121.359 113.416 111.279 112.252 106.289L121.733 98.8037C122.897 102.297 128.619 108.784 142.192 106.788C159.159 104.293 163.65 98.8037 170.137 98.8037C176.624 98.8037 180.117 102.796 177.622 106.788C175.127 110.78 175.127 102.297 172.632 103.794C160.257 120.56 144.854 122.756 138.699 121.758Z"
        fill="#FDFBEF"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M100.277 11.9766C89.0992 21.1584 92.6255 32.436 95.7859 36.9271C126.558 93.4812 188.901 208.186 192.094 214.574C196.087 222.558 222.035 240.522 225.029 240.023C227.424 239.624 224.031 205.259 222.035 188.126C191.928 133.734 130.816 23.354 127.223 16.9667C122.732 8.98257 114.249 0.499423 100.277 11.9766Z"
        fill="#FAA71E"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M225.028 218.566C225.826 222.957 226.026 234.701 226.026 240.023C219.239 238.426 212.885 233.703 210.557 231.54C210.956 224.754 220.37 220.063 225.028 218.566Z"
        fill="#F77D0E"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M118.24 44.9106L206.565 208.586M206.565 208.586L193.591 216.071M206.565 208.586C210.224 207.088 218.341 200.901 221.535 188.126"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M178.684 112.9C173.831 115.04 172.233 113.744 172.806 110.157C174.454 107.805 179.095 104.941 184.473 112.297C189.851 119.652 187.216 122.939 185.226 123.662C178.051 130.777 173.951 127.762 176.574 125.682C179.197 123.602 182.875 119.261 181.518 118.628C180.162 117.995 177.207 124.325 174.675 121.492C172.143 118.658 183.538 110.76 178.684 112.9Z"
        fill="#FDFBEF"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M127.723 17.4653C122.932 18.2637 104.768 31.4376 96.2852 37.9247L106.265 55.39C107.862 50.5995 126.558 38.091 135.707 32.4356L127.723 17.4653Z"
        fill="#F77D0E"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M108.993 47.3328C109.63 50.0928 109.375 52.742 108.498 54.7837C107.62 56.8261 106.156 58.1947 104.381 58.6042C102.606 59.0136 100.691 58.4242 99.0072 56.9728C97.3238 55.5219 95.9347 53.2518 95.2981 50.4918C94.6614 47.7318 94.9158 45.0826 95.7936 43.0409C96.6717 40.9985 98.135 39.6299 99.91 39.2204C101.685 38.811 103.6 39.4004 105.284 40.8518C106.967 42.3027 108.356 44.5728 108.993 47.3328Z"
        fill="white"
        stroke="black"
        strokeWidth="2"
      />
      <ellipse
        cx="104.254"
        cy="50.9455"
        rx="5.58856"
        ry="6.51998"
        transform="rotate(-19.8528 104.254 50.9455)"
        fill="#111111"
      />
      <path
        d="M90.5584 229.594C91.881 226.863 90.9722 186.53 90.1021 170.223L93.8126 149.967L76.2144 155.17C76.1878 171.265 75.8944 207.207 74.9338 222.224C73.9732 237.241 74.6207 241.109 75.0645 241.166C79.6088 247.552 102.527 243.153 107.074 242.395C112.032 241.569 130.707 238.946 124.838 230.419C120.29 223.812 88.9051 233.006 90.5584 229.594Z"
        fill="#FFEB34"
        stroke="black"
        strokeWidth="2"
      />
      <path
        d="M58.7753 226.673C60.3055 224.126 62.5734 186.936 62.906 170.576L68.1281 150.465L50.0696 153.341C48.852 169.372 45.898 205.144 43.8223 219.979C41.7465 234.814 43.5648 236.37 43.5648 236.37C47.656 243.328 66.2374 243.545 70.8632 243.455C76.318 243.35 95.1456 244.435 90.6716 234.799C86.1975 225.164 56.8625 229.856 58.7753 226.673Z"
        fill="#FFEB34"
        stroke="black"
        strokeWidth="2"
      />
      <path
        d="M85.2832 4.8121C71.5604 7.27222 64.6801 41.324 62.9553 58.0424C62.3023 63.3804 58.0388 63.9442 38.2886 75.5469C22.4884 84.8291 29.1743 98.0138 34.4923 103.446C23.4687 105.521 2.01118 113.516 4.36921 128.887C6.72724 144.258 21.9476 147.904 29.263 147.805C28.6624 148.596 29.5906 153.204 38.1083 165.316C46.6259 177.428 63.0893 171.69 70.2563 167.307C99.7628 198.592 109.957 178.729 111.366 164.888C117.919 168.19 132.243 169.821 137.116 149.933C141.988 130.044 120.665 106.024 109.395 96.4994C140.62 106.708 119.993 72.3315 109.244 58.8401C98.495 45.3487 102.437 1.73696 85.2832 4.8121Z"
        fill="#00BC68"
        stroke="black"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M96.5059 48.3679C96.8308 51.1817 96.2826 53.786 95.1826 55.7171C94.0823 57.6488 92.4754 58.8457 90.6659 59.0547C88.8563 59.2636 87.019 58.4644 85.5074 56.8343C83.9962 55.2047 82.8689 52.7939 82.544 49.9801C82.2191 47.1663 82.7673 44.562 83.8672 42.6309C84.9676 40.6992 86.5744 39.5022 88.384 39.2933C90.1935 39.0843 92.0309 39.8836 93.5425 41.5137C95.0537 43.1432 96.181 45.5541 96.5059 48.3679Z"
        fill="white"
        stroke="black"
        strokeWidth="2"
      />
      <ellipse
        cx="90.5124"
        cy="52.378"
        rx="6.19143"
        ry="7.22333"
        transform="rotate(-13.4506 90.5124 52.378)"
        fill="#111111"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M109.73 68.9163C109.479 68.0393 108.565 67.5317 107.688 67.7826C107.064 67.9612 105.957 68.1136 104.839 67.942C103.74 67.7734 102.783 67.3218 102.15 66.4416C101.618 65.7009 100.586 65.532 99.8449 66.0645C99.1042 66.597 98.9354 67.6291 99.4678 68.3698C100.773 70.1854 102.664 70.9504 104.338 71.2073C105.993 71.4614 107.584 71.2483 108.597 70.9587C109.474 70.7078 109.981 69.7934 109.73 68.9163Z"
        fill="black"
      />
      <path
        d="M101.549 92.8154C113.692 85.6629 143.067 69.9608 147.458 68.364C152.947 66.3679 153.945 58.8828 156.939 58.8828C159.927 58.8828 158.939 65.3435 156.455 67.8497C157.12 67.2558 167.449 65.3959 170.911 68.364C174.405 71.358 173.406 73.3541 169.913 73.3541C166.42 73.3541 163.925 70.859 158.935 73.3541C158.104 73.6867 158.336 74.5517 165.921 75.3501C175.403 76.3481 175.902 77.8451 175.902 79.3422C175.902 80.8392 161.929 78.8432 160.432 80.3402C158.935 81.8372 164.923 82.3362 171.41 83.8333C177.898 85.3303 170.911 88.8233 162.927 87.8253C154.943 86.8273 143.965 84.8313 136.48 90.8194C128.995 96.8075 110.032 106.788 107.537 105.291C105.042 103.794 98.5552 92.8154 101.549 92.8154Z"
        fill="#FDFBEF"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </div>,
]
interface OnBoardProps {
  onStartClick: () => void
}

const OnBoard = ({ onStartClick }: OnBoardProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  return (
    <div className="h-calc-h flex flex-col pb-[50px] px-5">
      <Carousel
        className="grow flex flex-col w-[calc(100%_+_40px)] -ml-5 py-9"
        slides={onBoardingItems}
        renderItem={(item) => item}
        onSlideSelect={(index) => setSelectedIndex(index)}
      />
      <Button
        onClick={onStartClick}
        disabled={selectedIndex !== onBoardingItems.length - 1}
      >
        시작하기
      </Button>
    </div>
  )
}

export default OnBoard
