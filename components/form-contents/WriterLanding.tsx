import { useFunnelContext } from '@/contexts/useFunnelContext'

const WriterLanding = () => {
  const { toNextStep } = useFunnelContext()

  return (
    <>
      <div className="flex flex-col items-center justify-center text-center">
        <svg
          width="140"
          height="247"
          viewBox="0 0 140 247"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M61.5078 234.231C60.3412 232.283 58.3154 204.006 57.8293 191.755L53.6841 176.873L67.0513 179.53C68.1855 191.559 70.8914 218.407 72.6412 229.565C74.3911 240.724 74.1805 243.661 73.8564 243.735C70.94 248.827 53.6841 245.063 50.5245 243.735C47.365 242.406 33.9978 238.643 37.1573 231.558C40.3169 224.473 62.9661 236.667 61.5078 234.231Z"
            fill="#FFEB34"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M52.6182 175.935L67.8612 178.901L67.9141 179.452C69.0603 191.355 71.7911 217.884 73.554 228.892C74.4393 234.42 74.8322 237.933 74.9611 240.082C75.0253 241.153 75.0255 241.909 74.9828 242.415C74.9619 242.663 74.928 242.887 74.8709 243.07C74.843 243.16 74.7983 243.277 74.7217 243.389C74.6964 243.426 74.66 243.473 74.6111 243.522C73.6665 245 71.7703 245.726 69.6868 246.063C67.4993 246.416 64.8736 246.376 62.2837 246.141C57.1175 245.672 51.8809 244.402 50.1903 243.706C49.8342 243.56 49.3159 243.373 48.6865 243.146C46.6866 242.424 43.5643 241.298 40.9539 239.774C39.2279 238.766 37.62 237.53 36.6593 236.029C35.6693 234.481 35.385 232.672 36.2948 230.674C37.2996 228.468 39.7924 227.925 42.4046 228.034C45.0774 228.146 48.2676 228.947 51.246 229.869C53.3405 230.518 55.376 231.242 57.0803 231.849C57.8005 232.105 58.4615 232.341 59.0429 232.54C59.6664 232.754 60.1834 232.922 60.5868 233.036C60.5096 232.717 60.4325 232.33 60.3553 231.888C60.1823 230.895 60.0019 229.582 59.8187 228.036C59.4521 224.941 59.0697 220.876 58.7093 216.499C57.992 207.787 57.3596 197.809 57.1111 191.73L52.6182 175.935ZM54.719 177.854L58.5993 191.496L58.6029 191.583C58.8478 197.629 59.4813 207.639 60.2009 216.379C60.5607 220.749 60.9414 224.794 61.3051 227.863C61.487 229.399 61.6637 230.682 61.83 231.635C61.9133 232.113 61.9922 232.497 62.0655 232.785C62.1022 232.929 62.1354 233.041 62.1645 233.124C62.1958 233.214 62.2132 233.243 62.2105 233.239C62.2795 233.352 62.3878 233.556 62.3868 233.81C62.3862 233.953 62.3507 234.113 62.2555 234.263C62.1616 234.412 62.0363 234.508 61.9213 234.568C61.7144 234.677 61.5013 234.688 61.3763 234.687C61.2327 234.687 61.0822 234.668 60.9377 234.643C60.3778 234.546 59.5354 234.278 58.5527 233.941C57.9446 233.732 57.2671 233.491 56.5363 233.231C54.8426 232.628 52.8629 231.923 50.7993 231.284C47.844 230.368 44.8091 229.618 42.3414 229.515C39.8129 229.409 38.2497 229.986 37.659 231.284C36.9732 232.789 37.1798 234.073 37.9234 235.235C38.6964 236.443 40.0648 237.534 41.7139 238.497C44.1873 239.941 47.0555 240.977 49.0611 241.701C49.7464 241.948 50.331 242.159 50.7647 242.338C52.2652 242.955 57.3382 244.204 62.4203 244.665C64.9545 244.895 67.4376 244.924 69.446 244.6C71.4988 244.268 72.837 243.604 73.3948 242.65L73.4623 242.535C73.4718 242.479 73.4824 242.4 73.4915 242.292C73.5255 241.888 73.5298 241.214 73.4672 240.17C73.3425 238.09 72.958 234.632 72.076 229.124C70.331 218.228 67.6519 192.284 66.4775 180.143L54.719 177.854Z"
            fill="#111111"
          />
          <path
            d="M91.4332 231.517C92.0549 229.403 86.7692 202.275 83.9682 190.465L83.9682 175.05L71.5841 180.483C73.691 192.221 78.2223 218.458 79.4931 229.498C80.7638 240.538 81.7559 243.299 82.0931 243.299C86.3123 247.533 102.21 240.201 104.949 238.248C107.689 236.295 119.777 229.805 114.787 223.72C109.796 217.635 90.6562 234.16 91.4332 231.517Z"
            fill="#FFEB34"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M84.7141 173.907L70.7494 180.033L70.8464 180.574C72.9545 192.319 77.4811 218.531 78.7487 229.544C79.3853 235.074 79.9542 238.551 80.4106 240.656C80.6381 241.704 80.8421 242.434 81.0205 242.914C81.108 243.149 81.2013 243.358 81.3061 243.523C81.3575 243.603 81.4323 243.706 81.5366 243.798C81.5712 243.828 81.6193 243.866 81.6796 243.903C82.9942 245.126 85.0279 245.422 87.139 245.3C89.3553 245.173 91.8906 244.572 94.3388 243.789C99.2223 242.229 103.957 239.88 105.408 238.846C105.714 238.628 106.166 238.336 106.716 237.981C108.46 236.856 111.183 235.099 113.302 233.067C114.704 231.724 115.928 230.186 116.454 228.531C116.995 226.824 116.782 225.016 115.359 223.281C113.789 221.367 111.214 221.375 108.694 222.037C106.113 222.715 103.21 224.167 100.544 225.693C98.6785 226.761 96.8895 227.889 95.3885 228.835C94.7439 229.241 94.1525 229.614 93.6309 229.934C93.0653 230.281 92.5952 230.559 92.226 230.756C92.2169 230.432 92.19 230.044 92.1486 229.601C92.0563 228.615 91.8877 227.32 91.661 225.803C91.2072 222.765 90.5154 218.797 89.7178 214.532C88.13 206.042 86.1174 196.346 84.7141 190.418L84.7141 173.907ZM92.151 231.751C92.1511 231.751 92.151 231.751 92.151 231.751V231.751ZM83.2191 176.194L83.2191 190.513L83.2388 190.596C84.6357 196.486 86.655 206.208 88.2475 214.723C89.0437 218.981 89.7318 222.929 90.1818 225.941C90.407 227.449 90.5712 228.713 90.6599 229.661C90.7043 230.136 90.7288 230.521 90.7336 230.813C90.7361 230.959 90.7334 231.073 90.7272 231.16C90.7206 231.252 90.7116 231.286 90.7124 231.283C90.6758 231.408 90.6258 231.631 90.6981 231.878C90.7388 232.017 90.8184 232.163 90.9515 232.286C91.0823 232.407 91.2283 232.471 91.3537 232.504C91.58 232.563 91.7871 232.529 91.9089 232.503C92.0483 232.472 92.1899 232.423 92.3245 232.368C92.8465 232.155 93.5991 231.718 94.4713 231.182C95.0168 230.847 95.6227 230.465 96.2764 230.053C97.7679 229.113 99.5083 228.015 101.347 226.963C103.993 225.449 106.762 224.076 109.149 223.449C111.597 222.806 113.286 223.031 114.211 224.159C115.284 225.467 115.431 226.752 115.024 228.035C114.601 229.368 113.568 230.716 112.228 232C110.219 233.925 107.717 235.541 105.967 236.671C105.369 237.056 104.86 237.385 104.488 237.651C103.199 238.57 98.6151 240.863 93.8102 242.399C91.4141 243.164 89.0128 243.725 86.9761 243.842C84.8943 243.962 83.4144 243.607 82.6141 242.804L82.5171 242.707C82.4928 242.655 82.4611 242.58 82.4229 242.478C82.2807 242.095 82.0941 241.444 81.8725 240.423C81.4309 238.386 80.8685 234.963 80.2343 229.454C78.9796 218.553 74.5604 192.913 72.4156 180.933L83.2191 176.194Z"
            fill="#111111"
          />
          <path
            d="M69.936 64.273C79.9112 66.8647 83.0738 92.4415 83.4081 104.906C83.5902 108.891 86.7006 109.548 100.606 119.242C111.729 126.998 106.063 136.375 101.84 140.094C109.847 142.249 125.213 149.37 122.614 160.608C120.015 171.847 108.594 173.688 103.208 173.203C103.607 173.822 102.664 177.179 95.7085 185.659C88.7527 194.14 76.9415 188.969 71.9054 185.324C48.4075 206.807 42.0078 191.541 41.7452 181.222C36.7308 183.296 26.0829 183.697 23.6065 168.711C21.1302 153.724 38.1902 137.154 47.0298 130.743C23.4461 136.538 40.5732 112.268 49.2507 102.893C57.9283 93.5169 57.467 61.0333 69.936 64.273Z"
            fill="#00BC68"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M66.1508 65.2804C67.1774 64.7691 68.3505 64.6253 69.751 64.9892C71.9636 65.564 73.8992 67.4449 75.5637 70.3327C77.2198 73.2058 78.5403 76.9614 79.572 81.0677C81.6341 89.2753 82.5044 98.7282 82.6706 104.925L82.6711 104.939C82.7218 106.049 82.9831 106.978 83.6104 107.886C84.2169 108.763 85.1391 109.581 86.4236 110.529C87.6294 111.42 89.2117 112.465 91.2464 113.81C91.3862 113.902 91.528 113.996 91.6721 114.091C93.9205 115.577 96.716 117.432 100.185 119.85C102.885 121.732 104.519 123.68 105.42 125.568C106.318 127.452 106.506 129.316 106.248 131.073C105.728 134.619 103.386 137.747 101.353 139.537C101.149 139.717 101.06 139.996 101.121 140.262C101.183 140.528 101.386 140.738 101.649 140.809C105.593 141.87 111.339 144.155 115.757 147.534C120.188 150.921 123.096 155.247 121.895 160.44C120.656 165.8 117.33 168.904 113.644 170.63C109.931 172.369 105.864 172.698 103.274 172.465C102.993 172.44 102.722 172.578 102.577 172.82C102.445 173.038 102.436 173.307 102.547 173.532C102.548 173.54 102.548 173.55 102.548 173.562C102.547 173.648 102.53 173.798 102.469 174.027C102.348 174.485 102.079 175.172 101.566 176.133C100.542 178.05 98.6009 180.967 95.1389 185.188C91.8758 189.167 87.4812 189.969 83.1992 189.307C78.8927 188.641 74.7884 186.497 72.3367 184.723C72.0537 184.518 71.6665 184.54 71.4085 184.776C65.5699 190.114 60.8462 193.119 57.0641 194.501C53.2972 195.878 50.5116 195.632 48.4562 194.543C46.3809 193.444 44.9159 191.414 43.9498 188.964C42.9852 186.518 42.5464 183.719 42.4824 181.203C42.4762 180.959 42.351 180.734 42.1475 180.601C41.9441 180.468 41.6885 180.444 41.464 180.537C39.0779 181.524 35.374 182.096 32.009 180.681C28.7007 179.289 25.5417 175.898 24.334 168.589C23.1463 161.401 26.6405 153.723 31.666 146.953C36.6728 140.208 43.0896 134.513 47.4616 131.342C47.7476 131.135 47.8472 130.753 47.6992 130.431C47.5511 130.11 47.197 129.939 46.8542 130.023C43.9454 130.738 41.7165 130.975 40.0507 130.855C38.3858 130.736 37.3516 130.266 36.7327 129.635C36.1208 129.01 35.8139 128.125 35.818 126.952C35.8221 125.769 36.1444 124.351 36.7333 122.765C39.1 116.389 45.4701 108.064 49.7909 103.396C52.0814 100.921 53.7189 96.9912 55.0927 92.6719C55.9486 89.9808 56.7235 87.0622 57.488 84.1823C57.9508 82.4393 58.4097 80.7104 58.8807 79.0547C60.1459 74.6065 61.5024 70.6635 63.2744 68.0367C64.155 66.7314 65.106 65.8008 66.1508 65.2804ZM102.545 173.507C102.545 173.506 102.545 173.508 102.546 173.511C102.545 173.508 102.545 173.507 102.545 173.507ZM53.6873 92.2215C52.3174 96.5287 50.7584 100.175 48.7102 102.388C44.3534 107.095 37.8212 115.593 35.3509 122.248C34.7306 123.919 34.3477 125.521 34.3428 126.946C34.3378 128.381 34.718 129.691 35.6812 130.673C36.6376 131.649 38.0668 132.197 39.9454 132.332C41.1067 132.416 42.4659 132.344 44.0406 132.103C39.8537 135.476 34.6885 140.403 30.483 146.068C25.3876 152.933 21.5901 161.033 22.8787 168.831C24.1473 176.509 27.5505 180.411 31.4388 182.046C34.8257 183.471 38.4434 183.117 41.0528 182.265C41.2014 184.637 41.6674 187.199 42.5781 189.509C43.6202 192.152 45.2729 194.531 47.7676 195.853C50.2822 197.185 53.5188 197.373 57.5688 195.892C61.5035 194.454 66.2496 191.429 71.9638 186.269C74.5842 188.064 78.6569 190.103 82.9746 190.77C87.5962 191.485 92.5851 190.632 96.2778 186.129C99.7715 181.87 101.779 178.868 102.866 176.832C103.409 175.816 103.734 175.017 103.895 174.407C103.933 174.264 103.963 174.126 103.985 173.995C106.764 174.111 110.656 173.664 114.268 171.972C118.288 170.09 121.972 166.654 123.332 160.775C124.73 154.73 121.255 149.876 116.651 146.356C112.488 143.172 107.249 140.946 103.281 139.737C105.218 137.734 107.203 134.729 107.708 131.289C108.004 129.267 107.786 127.101 106.75 124.929C105.717 122.761 103.888 120.629 101.026 118.634C97.5423 116.205 94.7346 114.342 92.4834 112.854C92.3455 112.763 92.2097 112.673 92.0761 112.585C90.0217 111.227 88.4711 110.203 87.2976 109.336C86.0436 108.411 85.285 107.711 84.8226 107.042C84.382 106.404 84.1861 105.758 84.1451 104.878C83.9765 98.6108 83.0982 89.0472 81.0024 80.7055C79.9548 76.5356 78.5934 72.632 76.8406 69.591C75.0962 66.5647 72.8957 64.2766 70.1207 63.5556C68.404 63.1096 66.8639 63.2722 65.4951 63.9539C64.1446 64.6265 63.0182 65.7754 62.0529 67.2064C60.1333 70.052 58.7249 74.2085 57.4621 78.6482C56.9751 80.3606 56.5102 82.1126 56.0456 83.8636C55.2902 86.7107 54.5355 89.555 53.6873 92.2215Z"
            fill="#111111"
          />
          <path
            d="M54.2402 111.807C54.8242 116.849 58.4776 120.566 62.4004 120.108C66.3232 119.65 69.0299 115.192 68.4459 110.15C67.862 105.108 64.2086 101.392 60.2858 101.849C56.363 102.307 53.6563 106.766 54.2402 111.807Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M62.23 118.637C59.4331 118.963 56.2371 116.225 55.7056 111.636C55.1742 107.048 57.6593 103.647 60.4562 103.32C63.2531 102.994 66.4491 105.732 66.9806 110.321C67.512 114.91 65.0269 118.311 62.23 118.637ZM62.4004 120.108C58.4776 120.566 54.8242 116.849 54.2402 111.807C53.6563 106.766 56.363 102.307 60.2858 101.849C64.2086 101.392 67.862 105.108 68.4459 110.15C69.0299 115.192 66.3232 119.65 62.4004 120.108Z"
            fill="black"
          />
          <path
            d="M54.9536 108.638C55.3344 112.171 58.0883 114.769 61.1047 114.441C64.1211 114.114 66.2577 110.984 65.877 107.452C65.4962 103.919 62.7422 101.321 59.7258 101.649C56.7094 101.976 54.5728 105.106 54.9536 108.638Z"
            fill="#111111"
          />
          <path
            d="M64.9325 111.709C66.0733 116.654 69.9268 119.982 73.5394 119.142C77.1521 118.302 79.1558 113.613 78.0149 108.668C76.8741 103.723 73.0206 100.395 69.408 101.234C65.7954 102.074 63.7916 106.764 64.9325 111.709Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M69.2712 116.472C67.9754 115.353 66.8768 113.573 66.3697 111.375C65.8626 109.177 66.0697 107.093 66.7435 105.516C67.4177 103.938 68.5023 102.965 69.7408 102.677C70.9793 102.389 72.3796 102.785 73.6762 103.904C74.972 105.023 76.0706 106.804 76.5778 109.002C77.0849 111.2 76.8778 113.284 76.204 114.861C75.5297 116.438 74.4451 117.411 73.2066 117.699C71.9681 117.987 70.5678 117.592 69.2712 116.472ZM73.5394 119.142C69.9268 119.982 66.0733 116.654 64.9325 111.709C63.7916 106.764 65.7954 102.074 69.408 101.234C73.0206 100.395 76.8741 103.723 78.0149 108.668C79.1558 113.613 77.1521 118.302 73.5394 119.142Z"
            fill="black"
          />
          <path
            d="M64.6157 108.936C64.9965 112.469 67.7504 115.067 70.7668 114.739C73.7832 114.411 75.9198 111.282 75.5391 107.75C75.1583 104.217 72.4043 101.619 69.3879 101.947C66.3715 102.274 64.2349 105.404 64.6157 108.936Z"
            fill="#111111"
          />
          <path
            d="M58.0056 129.095C61.7567 127.527 60.3914 129.626 59.2398 130.872C59.6598 133.956 61.6151 140.696 66.0762 142.989C70.5373 145.282 74.3635 136.8 73.9922 131.546C73.3913 131.439 71.5021 130.774 72.1035 129.963C72.5112 129.414 74.2279 128.477 76.0843 128.498C77.9436 128.519 76.1382 131.101 75.194 131.762C76.067 134.408 74.6874 139.77 71.7091 143.967C67.9863 149.212 63.7373 145.682 61.5695 142.182C59.8352 139.381 58.185 133.899 57.5767 131.508C56.1567 131.357 54.2545 130.664 58.0056 129.095Z"
            fill="#111111"
          />
          <path
            d="M33.0005 2.52276C24.3118 1.51434 22.8982 6.11226 23.2774 8.53727C20.6116 23.5211 15.6433 55.2343 17.0971 62.2163C18.5509 69.1984 93.7581 76.1504 131.18 78.7536C133.179 59.7546 136.845 20.7289 135.512 16.6181C133.846 11.4796 43.8615 3.78329 33.0005 2.52276Z"
            fill="#FCEB51"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M44.5324 4.21387C38.933 3.67155 34.7929 3.27057 32.942 3.05575C28.6826 2.5614 26.3426 3.45644 25.1094 4.6316C23.8725 5.81025 23.6395 7.37408 23.8084 8.45402L23.8223 8.54296L23.8065 8.63158C22.4746 16.1179 20.5675 27.7836 19.1753 38.4472C18.4791 43.7795 17.9125 48.855 17.6106 53.0294C17.3068 57.2295 17.2775 60.4463 17.6232 62.1065C17.6699 62.3307 17.8989 62.6646 18.5094 63.0798C19.0999 63.4813 19.9569 63.8978 21.074 64.323C23.3043 65.1717 26.4761 66.0195 30.3875 66.8548C38.2043 68.5242 48.8926 70.1269 60.7189 71.5944C84.1515 74.5022 112.001 76.8734 130.705 78.1823C131.701 68.6819 133.084 54.473 134.065 42.0603C134.565 35.7401 134.96 29.8906 135.147 25.367C135.241 23.1045 135.282 21.1802 135.259 19.6973C135.247 18.9557 135.22 18.3306 135.175 17.8322C135.13 17.3243 135.07 16.9809 135.006 16.7841C135.007 16.7854 135 16.7642 134.964 16.7214C134.928 16.6787 134.871 16.6237 134.784 16.5583C134.609 16.4262 134.348 16.2775 133.99 16.1165C133.275 15.795 132.25 15.457 130.94 15.1074C128.324 14.4095 124.65 13.6857 120.235 12.9546C111.409 11.4931 99.6762 10.0111 87.6473 8.64937C75.6203 7.28783 63.3051 6.04735 53.3165 5.06835C50.1232 4.75536 47.1663 4.46898 44.5324 4.21387ZM135.426 15.6999C135.679 15.8909 135.921 16.1366 136.023 16.452C136.126 16.7691 136.193 17.2123 136.24 17.7369C136.288 18.2711 136.316 18.9246 136.328 19.6806C136.351 21.193 136.309 23.1404 136.215 25.4115C136.028 29.9551 135.631 35.8203 135.131 42.1452C134.131 54.7965 132.714 69.3076 131.714 78.81L131.66 79.3246L131.146 79.2889C112.43 77.9869 84.262 75.5973 60.5878 72.6595C48.7529 71.1909 38.028 69.5837 30.1651 67.9045C26.2367 67.0656 23.002 66.2044 20.695 65.3264C19.5434 64.8882 18.599 64.4369 17.9098 63.9683C17.2407 63.5133 16.7118 62.9746 16.5767 62.326C16.1955 60.4953 16.2421 57.1296 16.5443 52.9516C16.8483 48.7478 17.4178 43.6494 18.1152 38.3077C19.5048 27.6639 21.4056 16.0295 22.7388 8.52881C22.5552 7.18802 22.8608 5.29457 24.3733 3.85326C25.9243 2.37531 28.6355 1.4756 33.0648 1.98967C34.9052 2.20328 39.0264 2.60243 44.6147 3.14367C47.2517 3.39907 50.2155 3.68612 53.4204 4.00024C63.4106 4.97941 75.7321 6.22051 87.767 7.58294C99.8 8.94515 111.555 10.4295 120.409 11.8957C124.834 12.6284 128.548 13.3588 131.214 14.0702C132.545 14.4253 133.635 14.7807 134.427 15.1372C134.822 15.3151 135.162 15.5014 135.426 15.6999Z"
            fill="#111111"
          />
          <path
            d="M19.9229 7.79279C30.3435 7.72361 116.363 4.49449 118.532 9.26469C120.268 13.0809 121.305 51.2444 121.606 69.8491C85.9024 71.7696 13.9493 73.9662 11.7679 67.3885C9.58654 60.8109 10.6261 29.5624 11.4185 14.7603C11.0639 13.4837 11.1548 11.494 12.7325 9.96701C13.9965 8.74369 16.2148 7.8174 19.9229 7.79279Z"
            fill="#51C6FF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M31.5508 8.59628C26.1939 8.73581 22.2327 8.83898 20.4576 8.85076C17.2263 8.87221 15.2372 9.59328 14.0431 10.5236C19.2006 15.7675 28.4471 23.3623 37.6128 29.8308C42.311 33.1464 46.9763 36.1579 51.0469 38.4004C55.1413 40.6559 58.5616 42.0917 60.7948 42.3291C61.8595 42.4423 63.3258 42.2026 65.1481 41.6282C66.9587 41.0575 69.0709 40.1729 71.4074 39.0439C76.0798 36.7861 81.6037 33.5728 87.3291 30.0067C94.7186 25.4041 102.405 20.2386 109.009 15.8014C112.389 13.53 115.485 11.4494 118.112 9.73289C117.949 9.65491 117.742 9.57438 117.487 9.49336C116.777 9.26844 115.771 9.06375 114.493 8.88142C111.941 8.51749 108.386 8.25372 104.128 8.07062C95.6157 7.70462 84.3531 7.66314 72.8235 7.77286C61.296 7.88257 49.5098 8.14332 39.9534 8.38101C36.8986 8.45699 34.0703 8.53066 31.5508 8.59628ZM118.705 10.6162C116.101 12.318 113.015 14.3911 109.641 16.6588C103.025 21.1044 95.2961 26.2977 87.896 30.9069C82.1596 34.4798 76.5979 37.7167 71.8742 39.9993C69.5126 41.1404 67.3492 42.0487 65.4708 42.6407C63.6041 43.2291 61.968 43.5221 60.6812 43.3853C58.2113 43.1228 54.6224 41.5844 50.5293 39.3295C46.4124 37.0616 41.7122 34.0263 36.9946 30.697C27.8017 24.2093 18.4992 16.5735 13.279 11.2658C12.226 12.557 12.1831 14.1064 12.47 15.1391L12.4932 15.2224L12.4886 15.3088C12.0929 22.6973 11.6355 34.1906 11.5494 44.655C11.5063 49.8877 11.5561 54.8571 11.7522 58.9249C11.9495 63.0176 12.2929 66.1287 12.8115 67.692C12.8811 67.9019 13.1333 68.1942 13.7539 68.5205C14.3553 68.8366 15.2106 69.1366 16.3144 69.4146C18.518 69.9694 21.6122 70.4123 25.4058 70.7557C32.9869 71.4418 43.2755 71.7236 54.6255 71.7401C77.1043 71.7727 103.694 70.7647 121.528 69.8136C121.374 60.5197 121.042 46.6365 120.538 34.5348C120.282 28.3713 119.98 22.6746 119.635 18.2832C119.463 16.0869 119.28 14.2233 119.087 12.7937C118.99 12.0786 118.892 11.4781 118.793 11.0018C118.763 10.8596 118.734 10.7312 118.705 10.6162ZM118.827 8.90949C119.092 9.06591 119.351 9.27708 119.485 9.57103C119.619 9.865 119.734 10.2848 119.838 10.7858C119.945 11.296 120.047 11.9236 120.145 12.6523C120.342 14.11 120.527 15.9958 120.7 18.2004C121.047 22.611 121.349 28.3226 121.605 34.4908C122.119 46.8284 122.454 61.0116 122.605 70.3078L122.613 70.8191L122.099 70.8468C104.254 71.8064 77.3463 72.8352 54.6239 72.8023C43.2649 72.7858 32.9383 72.504 25.3089 71.8135C21.4974 71.4685 18.3375 71.0197 16.0521 70.4443C14.9114 70.157 13.9635 69.8322 13.2546 69.4595C12.5651 69.097 12 68.6363 11.7971 68.0248C11.2258 66.3024 10.8816 63.0469 10.6853 58.9758C10.4879 54.8798 10.4382 49.8882 10.4813 44.6464C10.5673 34.2012 11.0223 22.7384 11.4175 15.3361C11.053 13.9228 11.1802 11.7713 12.896 10.1112C14.2928 8.75973 16.6648 7.81371 20.4506 7.78858C22.2148 7.77687 26.1565 7.6742 31.5019 7.53498C34.0246 7.46927 36.86 7.39542 39.9268 7.31914C49.485 7.0814 61.2776 6.82049 72.8134 6.71071C84.3472 6.60094 95.6327 6.64215 104.174 7.0094C108.442 7.19294 112.04 7.45844 114.645 7.82998C115.945 8.01538 117.018 8.22998 117.811 8.48133C118.207 8.60678 118.552 8.74741 118.827 8.90949Z"
            fill="#111111"
          />
          <path
            d="M116.618 105.267C116.08 112.024 106.922 118.52 101.208 120.494C100.542 123.708 100.53 129.581 105.808 127.364C112.404 124.593 118.373 119.706 122.165 116.71C125.957 113.714 125.398 87.9904 123.625 82.3144C122.207 77.7737 121.409 72.6292 119.763 71.0525C118.731 70.9475 116.321 70.8229 114.939 71.1653C113.211 71.5933 112.134 70.9402 109.778 69.251C107.422 67.5617 100.556 67.0439 104.819 71.8864C108.23 75.7604 112.748 76.5786 114.58 76.5035C116.285 77.8849 117.156 98.5101 116.618 105.267Z"
            fill="#FDFBEF"
          />
          <path
            d="M22.1328 68.2684C20.3558 71.566 17.6377 71.4745 16.5008 71.0165C11.0618 76.2603 11.7456 101.361 12.2457 105.268C12.7457 109.175 13.9429 120.555 23.7801 125.131C33.6173 129.708 38.6533 129.271 42.8567 127.364C47.0601 125.457 43.2604 119.796 41.2409 120.134C39.2214 120.472 35.4808 122.335 25.6256 116.983C15.7704 111.632 17.1014 81.6014 19.6218 76.5035C23.8179 78.4404 22.2676 74.0796 25.0275 72.3677C27.7874 70.6558 28.5054 68.3133 28.1912 67.2547C27.877 66.1961 24.3541 64.1465 22.1328 68.2684Z"
            fill="#FDFBEF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M120.088 70.3428L120.271 70.5182C120.791 71.017 121.197 71.745 121.538 72.5502C121.885 73.3678 122.193 74.3354 122.487 75.3702C122.725 76.208 122.952 77.0794 123.183 77.9674C123.535 79.3243 123.898 80.72 124.327 82.0942C124.799 83.6032 125.17 86.3523 125.412 89.6081C125.656 92.8877 125.774 96.751 125.718 100.53C125.661 104.304 125.43 108.016 124.969 110.985C124.739 112.468 124.449 113.788 124.085 114.847C123.731 115.876 123.269 116.78 122.619 117.293C122.389 117.475 122.151 117.664 121.904 117.859C118.109 120.869 112.389 125.403 106.091 128.048C104.679 128.641 103.476 128.755 102.497 128.368C101.503 127.975 100.914 127.137 100.583 126.218C99.9388 124.428 100.143 121.99 100.484 120.345L100.569 119.933L100.966 119.796C103.725 118.842 107.36 116.776 110.364 114.12C113.391 111.444 115.635 108.296 115.881 105.21C116.146 101.883 116.065 95.0786 115.702 88.9144C115.521 85.8367 115.271 82.9401 114.961 80.7348C114.807 79.6298 114.64 78.7171 114.464 78.0486C114.376 77.7134 114.291 77.4584 114.213 77.2787C114.208 77.268 114.203 77.2579 114.199 77.2482C112.009 77.2044 107.626 76.1953 104.265 72.378C103.705 71.7426 103.301 71.1648 103.046 70.6382C102.793 70.1147 102.665 69.5935 102.731 69.097C102.878 67.9945 103.851 67.541 104.685 67.3917C105.555 67.2358 106.608 67.3253 107.574 67.549C108.54 67.7727 109.511 68.1521 110.205 68.6497C111.398 69.5048 112.186 70.0358 112.872 70.3183C113.505 70.5789 114.047 70.6246 114.76 70.4477C115.542 70.254 116.565 70.2005 117.482 70.202C118.413 70.2035 119.298 70.2624 119.836 70.3172L120.088 70.3428ZM117.479 71.6828C116.588 71.6814 115.714 71.7368 115.114 71.8854C114.1 72.1366 113.239 72.0697 112.312 71.6884C111.439 71.3291 110.511 70.6889 109.348 69.8547C108.864 69.5077 108.093 69.189 107.242 68.9919C106.391 68.7947 105.552 68.7406 104.944 68.8495C104.3 68.9648 104.208 69.1842 104.193 69.2938C104.179 69.4033 104.195 69.623 104.373 69.9915C104.55 70.3568 104.864 70.8222 105.37 71.3974C108.606 75.0725 112.891 75.8329 114.548 75.7649L114.826 75.7536L115.042 75.9285C115.291 76.1304 115.452 76.4284 115.564 76.6837C115.685 76.9612 115.793 77.2976 115.891 77.6717C116.088 78.4219 116.264 79.4 116.422 80.5285C116.739 82.7901 116.993 85.7312 117.175 88.8271C117.539 95.0102 117.625 101.897 117.352 105.328C117.059 108.998 114.456 112.476 111.34 115.231C108.343 117.88 104.742 119.978 101.851 121.051C101.585 122.562 101.51 124.437 101.971 125.715C102.214 126.39 102.57 126.805 103.038 126.99C103.519 127.181 104.294 127.198 105.521 126.682C111.625 124.119 117.198 119.702 121.012 116.679C121.251 116.49 121.483 116.307 121.707 116.129C122.006 115.893 122.356 115.338 122.69 114.364C123.014 113.421 123.289 112.196 123.512 110.757C123.957 107.883 124.187 104.247 124.243 100.507C124.299 96.771 124.182 92.9519 123.941 89.7184C123.699 86.461 123.335 83.8662 122.92 82.5372C122.486 81.1469 122.1 79.6652 121.736 78.2696C121.507 77.3894 121.286 76.5434 121.068 75.7762C120.78 74.7602 120.491 73.8623 120.181 73.1299C119.922 72.5181 119.666 72.0673 119.415 71.7653C118.915 71.7231 118.212 71.684 117.479 71.6828ZM24.3362 66.8666C23.8321 67.1554 23.2841 67.6863 22.7798 68.622C21.8085 70.4243 20.5397 71.3628 19.2978 71.7579C18.3316 72.0653 17.4143 72.0332 16.7188 71.8626C16.2507 72.4114 15.8133 73.1685 15.4141 74.1218C14.936 75.2632 14.5301 76.643 14.1896 78.1919C13.5084 81.2902 13.1027 84.9985 12.8806 88.6894C12.4359 96.0805 12.7334 103.283 12.9755 105.175L12.2439 105.269L12.9755 105.175C12.988 105.272 13.0009 105.374 13.0142 105.479C13.2708 107.508 13.7196 111.055 15.1924 114.669C16.7378 118.462 19.3895 122.275 24.0885 124.461C28.9611 126.728 32.5896 127.726 35.4839 127.942C38.3585 128.156 40.5456 127.601 42.5511 126.691C43.42 126.296 43.8035 125.753 43.9454 125.199C44.096 124.611 43.9995 123.907 43.701 123.196C43.4041 122.489 42.9349 121.845 42.4444 121.407C41.9172 120.937 41.5253 120.838 41.3604 120.866C41.1699 120.897 40.9446 120.95 40.6828 121.011C39.734 121.232 38.3065 121.564 36.3211 121.432C33.7668 121.262 30.2643 120.346 25.2729 117.636C22.5593 116.162 20.715 113.059 19.4745 109.355C18.225 105.625 17.5394 101.14 17.2451 96.6988C16.9504 92.2519 17.0458 87.8142 17.3743 84.1613C17.5386 82.3349 17.7619 80.6963 18.0264 79.3455C18.2878 78.0105 18.5991 76.9043 18.9593 76.1756L19.2777 75.5317L19.9282 75.832C20.9337 76.2962 21.402 76.2848 21.6136 76.214C21.7939 76.1537 21.9672 75.9898 22.1902 75.4983C22.2816 75.2969 22.3657 75.0778 22.4629 74.8244C22.4818 74.7753 22.5011 74.725 22.5211 74.6732C22.6398 74.3653 22.7763 74.0216 22.947 73.6788C23.2919 72.9861 23.792 72.2639 24.638 71.7391C25.9135 70.9479 26.6872 70.0302 27.1066 69.2245C27.5407 68.3909 27.5652 67.7461 27.4825 67.4674C27.4827 67.468 27.4826 67.4678 27.4821 67.4667C27.4787 67.459 27.4548 67.4054 27.376 67.3153C27.2925 67.22 27.1701 67.1101 27.0106 67.0022C26.69 66.7855 26.2636 66.6068 25.7964 66.5563C25.3377 66.5067 24.8371 66.5796 24.3362 66.8666ZM27.8347 65.774C28.3009 66.0892 28.7461 66.5385 28.8963 67.0446C29.1278 67.8244 28.9505 68.8802 28.4141 69.9104C27.8631 70.9686 26.8978 72.0781 25.4135 72.9988C24.8796 73.33 24.5384 73.7949 24.2666 74.3408C24.129 74.6172 24.0133 74.9057 23.8967 75.2079C23.8792 75.2533 23.8616 75.2994 23.8437 75.3461C23.7468 75.5987 23.6441 75.8667 23.5327 76.1121C23.2739 76.6826 22.8755 77.3528 22.08 77.6188C21.4881 77.8169 20.8076 77.7458 20.023 77.4692C19.8358 78.0132 19.6487 78.7386 19.474 79.6311C19.2217 80.9193 19.0045 82.505 18.8436 84.2945C18.5217 87.8733 18.4277 92.2336 18.7171 96.6005C19.0068 100.973 19.6788 105.318 20.8728 108.883C22.0757 112.474 23.7608 115.131 25.9748 116.333C30.8386 118.974 34.134 119.803 36.4187 119.955C38.1591 120.07 39.3009 119.807 40.2457 119.589C40.5526 119.518 40.8387 119.452 41.1178 119.405C41.9627 119.264 42.803 119.746 43.4249 120.301C44.0835 120.889 44.6802 121.716 45.0603 122.621C45.4387 123.522 45.6302 124.569 45.3741 125.568C45.1094 126.601 44.3916 127.481 43.1587 128.04C40.9609 129.037 38.5282 129.654 35.3747 129.419C32.2409 129.185 28.4328 128.114 23.4682 125.804C18.33 123.414 15.4645 119.248 13.827 115.23C12.2784 111.43 11.8092 107.713 11.5526 105.681C11.5386 105.57 11.5252 105.464 11.5123 105.363C11.2544 103.349 10.96 96.047 11.4081 88.6001C11.6324 84.872 12.0443 81.0778 12.749 77.8728C13.1014 76.2701 13.5305 74.7981 14.0541 73.5479C14.5749 72.3046 15.207 71.2368 15.9881 70.4838L16.3316 70.1526L16.7737 70.3307C17.1942 70.5 17.9821 70.6231 18.8521 70.3463C19.6978 70.0772 20.6765 69.4127 21.4823 67.9174C22.0886 66.7922 22.814 66.0336 23.605 65.5805C24.3992 65.1255 25.2155 65.0041 25.9544 65.084C26.6849 65.1629 27.3369 65.4375 27.8347 65.774Z"
            fill="black"
          />
          <path
            d="M114.812 60.4113L115.746 60.3579L115.972 64.335L115.038 64.3884L114.812 60.4113ZM115.254 59.8202C115.157 59.8258 115.065 59.8077 114.98 59.7661C114.895 59.7244 114.826 59.6659 114.772 59.5906C114.719 59.5152 114.69 59.4312 114.685 59.3384C114.68 59.2481 114.699 59.1624 114.744 59.0815C114.788 59.0006 114.85 58.9358 114.93 58.8871C115.01 58.836 115.099 58.8077 115.196 58.8021C115.293 58.7966 115.385 58.8146 115.47 58.8563C115.555 58.8955 115.624 58.9528 115.678 59.0281C115.731 59.1035 115.76 59.1863 115.765 59.2766C115.77 59.3694 115.751 59.4562 115.706 59.5372C115.662 59.6181 115.6 59.6841 115.52 59.7352C115.44 59.7863 115.351 59.8146 115.254 59.8202Z"
            fill="black"
          />
          <path
            d="M110.856 59.3066L111.79 59.2532L111.956 62.1756L112.022 62.1719L113.354 60.4938L114.441 60.4316L113.003 62.2334L114.762 64.4033L113.653 64.4668L112.338 62.8299L112.016 63.2157L112.092 64.5561L111.158 64.6095L110.856 59.3066Z"
            fill="black"
          />
          <path
            d="M109.294 60.7277L110.228 60.6743L110.454 64.6514L109.52 64.7048L109.294 60.7277ZM109.736 60.1366C109.639 60.1422 109.548 60.1241 109.463 60.0825C109.377 60.0408 109.308 59.9823 109.255 59.907C109.202 59.8316 109.173 59.7476 109.167 59.6548C109.162 59.5645 109.182 59.4788 109.226 59.3979C109.27 59.317 109.332 59.2522 109.413 59.2036C109.493 59.1524 109.581 59.1241 109.679 59.1185C109.776 59.113 109.867 59.131 109.953 59.1727C110.038 59.2119 110.107 59.2692 110.16 59.3445C110.213 59.4199 110.242 59.5027 110.247 59.593C110.253 59.6858 110.233 59.7727 110.189 59.8536C110.145 59.9345 110.083 60.0005 110.002 60.0516C109.922 60.1027 109.834 60.1311 109.736 60.1366Z"
            fill="black"
          />
          <path
            d="M103.164 61.0791L104.113 61.0249L104.972 63.7827L105.009 63.7806L105.557 60.9422L106.499 60.8884L107.372 63.6308L107.408 63.6287L107.943 60.8058L108.892 60.7515L107.994 64.7929L107.024 64.8484L106.126 62.1956L106.075 62.1985L105.484 64.9365L104.514 64.992L103.164 61.0791Z"
            fill="black"
          />
          <path
            d="M100.241 61.2443L101.174 61.1909L101.4 65.168L100.466 65.2214L100.241 61.2443ZM100.683 60.6532C100.585 60.6588 100.494 60.6407 100.409 60.5991C100.323 60.5574 100.254 60.4989 100.201 60.4236C100.148 60.3482 100.119 60.2642 100.114 60.1714C100.109 60.0811 100.128 59.9954 100.172 59.9145C100.216 59.8336 100.279 59.7688 100.359 59.7202C100.439 59.669 100.528 59.6407 100.625 59.6351C100.722 59.6296 100.814 59.6476 100.899 59.6893C100.984 59.7285 101.053 59.7858 101.106 59.8611C101.159 59.9365 101.188 60.0193 101.194 60.1096C101.199 60.2024 101.179 60.2893 101.135 60.3702C101.091 60.4511 101.029 60.5171 100.949 60.5682C100.869 60.6193 100.78 60.6477 100.683 60.6532Z"
            fill="black"
          />
          <path
            d="M98.6071 61.3386L99.5338 61.2856L99.7597 65.2627L98.8622 65.3141L98.8223 64.6109L98.7785 64.6134C98.6967 64.8483 98.5563 65.0401 98.3573 65.1886C98.1608 65.337 97.919 65.4194 97.632 65.4358C97.3693 65.4509 97.135 65.4055 96.9289 65.2997C96.7228 65.1939 96.5574 65.0319 96.4328 64.8137C96.3081 64.5955 96.2369 64.3301 96.2192 64.0176L96.0752 61.4834L97.0092 61.43L97.1448 63.8177C97.1542 63.9837 97.193 64.1285 97.261 64.252C97.3313 64.3729 97.4243 64.4643 97.5401 64.5263C97.6581 64.5856 97.7926 64.611 97.9434 64.6024C98.0844 64.5943 98.2175 64.5524 98.3425 64.4767C98.4698 64.3984 98.5697 64.2886 98.6422 64.1473C98.7172 64.0058 98.7491 63.8386 98.7382 63.6458L98.6071 61.3386Z"
            fill="black"
          />
          <path
            d="M89.8047 61.8423L90.6949 61.7914L90.7331 62.4652L90.7842 62.4623C90.854 62.2305 90.9802 62.0457 91.1627 61.9079C91.345 61.7677 91.5675 61.69 91.8302 61.675C92.0953 61.6598 92.3252 61.7116 92.5198 61.8303C92.7143 61.9465 92.8557 62.116 92.944 62.3388L92.9878 62.3363C93.0627 62.1091 93.2011 61.9248 93.4029 61.7835C93.607 61.6395 93.8514 61.5594 94.136 61.5431C94.3816 61.5291 94.5998 61.5693 94.7906 61.6637C94.9838 61.7555 95.1372 61.9011 95.251 62.1003C95.3647 62.2971 95.4297 62.5395 95.4461 62.8276L95.5979 65.501L94.6713 65.554L94.5277 63.0271C94.5143 62.7903 94.4409 62.6157 94.3076 62.5033C94.1766 62.3883 94.0102 62.3366 93.8083 62.3481C93.5846 62.3609 93.4122 62.4406 93.2912 62.5871C93.1702 62.7337 93.1162 62.9217 93.1293 63.1512L93.2703 65.6341L92.3655 65.6859L92.2199 63.1224C92.2058 62.9174 92.1332 62.7562 92.0021 62.6388C91.8734 62.5212 91.7093 62.4682 91.5099 62.4796C91.3761 62.4872 91.2553 62.5297 91.1475 62.6069C91.0419 62.6815 90.9599 62.7841 90.9014 62.9149C90.8428 63.0431 90.8181 63.1878 90.8273 63.349L90.9646 65.766L90.0306 65.8194L89.8047 61.8423Z"
            fill="black"
          />
          <path
            d="M85.8634 64.9322C85.8403 64.5245 85.9609 64.2212 86.2253 64.0224C86.4922 63.8234 86.8401 63.6982 87.2691 63.6467C87.4895 63.6169 87.8277 63.5792 88.2839 63.5335L88.2621 63.2151C88.2509 63.0174 88.1802 62.8683 88.05 62.768C87.9222 62.6651 87.7427 62.6203 87.5117 62.6335C87.3098 62.645 87.1468 62.6972 87.0228 62.79C86.8987 62.8828 86.8226 63.0035 86.7945 63.1521L85.897 63.2034C85.906 62.9751 85.9747 62.7679 86.1032 62.5818C86.2316 62.3932 86.4145 62.2406 86.6519 62.1242C86.8893 62.0077 87.1697 61.9403 87.4932 61.9218C87.7705 61.9059 88.0332 61.935 88.2814 62.0089C88.5319 62.0804 88.7409 62.2141 88.9082 62.4103C89.0778 62.6039 89.172 62.8667 89.1909 63.1988L89.3419 65.8575L88.4517 65.9084L88.4205 65.3591L88.3913 65.3608C88.3046 65.5519 88.1672 65.7116 87.9793 65.8399C87.7914 65.9682 87.5515 66.0407 87.2596 66.0574C87.0043 66.072 86.773 66.0387 86.5659 65.9575C86.3611 65.8761 86.1966 65.7496 86.0721 65.5779C85.9476 65.4038 85.878 65.1885 85.8634 64.9322ZM86.7605 64.8735C86.7699 65.0395 86.838 65.1642 86.9648 65.2476C87.0939 65.3309 87.2595 65.3667 87.4613 65.3552C87.6437 65.3447 87.8034 65.2989 87.9403 65.2176C88.0772 65.1362 88.1798 65.0312 88.2482 64.9023C88.3188 64.7709 88.3499 64.6308 88.3414 64.4818L88.3192 64.1561C88.1979 64.168 88.0537 64.1848 87.8865 64.2066C87.7217 64.2258 87.5763 64.2439 87.4504 64.2609C87.2253 64.2934 87.051 64.3609 86.9275 64.4635C86.8065 64.566 86.7508 64.7026 86.7605 64.8735Z"
            fill="black"
          />
          <path
            d="M82.8687 66.2271L81.9347 66.2803L81.708 62.3032L82.5982 62.2525L82.6366 62.9263L82.6877 62.9234C82.7672 62.6911 82.903 62.5058 83.0952 62.3674C83.2897 62.2265 83.5317 62.1478 83.8211 62.1313C84.096 62.1157 84.3389 62.1606 84.5499 62.2662C84.7609 62.3717 84.9275 62.5337 85.0497 62.752C85.1744 62.9703 85.2457 63.2356 85.2635 63.5481L85.4079 66.0823L84.4812 66.1352L84.3451 63.7474C84.3298 63.4789 84.2498 63.274 84.1051 63.1329C83.9603 62.9893 83.7663 62.9256 83.5233 62.9419C83.3577 62.9489 83.2138 62.9926 83.0915 63.0731C82.9691 63.1511 82.8766 63.2617 82.8139 63.4049C82.7512 63.5456 82.7252 63.71 82.7359 63.8979L82.8687 66.2271Z"
            fill="black"
          />
        </svg>
        <h2 className="text-mainTitle2-bold mt-6 mb-5">
          남의위키가 도착했어요
        </h2>
        <p className="text-subTitle2-medium text-text-sub-gray4f ">
          남의위키를 통해
          <br />
          내가 본 친구의 모습을 알려주세요
        </p>
      </div>
      <div className="relative mt-10 mb-8 text-center">
        <div className="w-full h-full bg-white shadow-chat-bubble py-5 px-4  rounded-lg flex-1 relative">
          <p className="text-body3-medium text-black">
            <b>비회원</b>으로 시작하면 <br />
            내가 작성한 <b>남의위키를 볼 수 없어요!</b>
          </p>
        </div>
        <div className="absolute bottom-0 left-1/2">
          <div className=" w-0 h-0 border-l-[18px] border-l-transparent border-t-[15px] border-white border-r-[15px] border-r-transparent transform -translate-x-1/2 translate-y-full"></div>
        </div>
      </div>
      <a
        // href= 로그인 리다이렉트 페이지 연결후 nextStep 넘어가는 버튼 연동 필요, 일단은 비회원에 nextStep 연결하고 작업 시도함.
        className="w-full h-13 p-2 px-4 flex items-center justify-center bg-brand-sub1-yellow500 rounded-md"
      >
        <svg
          width="22"
          height="20"
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 0C4.92484 0 0 3.82543 0 8.54421C0 11.595 2.05893 14.2719 5.15604 15.7836C4.98754 16.356 4.0733 19.4663 4.03686 19.7107C4.03686 19.7107 4.015 19.8942 4.13566 19.9642C4.25638 20.0343 4.39828 19.9799 4.39828 19.9799C4.74437 19.9323 8.41149 17.3946 9.04626 16.954C9.68034 17.0424 10.3333 17.0884 11 17.0884C17.0752 17.0884 22 13.2631 22 8.54421C22 3.82543 17.0752 0 11 0Z"
            fill="black"
          />
        </svg>
        <p className="ml-3 p-2 text-center font-bold text-subTitle2 leading-subTitle2">
          카카오 로그인
        </p>
      </a>
      <button
        onClick={toNextStep}
        className="mt-4 text-text-sub-gray76 text-body3 leading-body3 text-medium underline"
      >
        비회원으로 시작하기
      </button>
    </>
  )
}

export default WriterLanding
