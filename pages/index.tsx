import Button from '@/components/button'
import Carousel from '@/components/carousel'
import Inputbox from '@/components/inputbox'
import { media } from '@/components/media'
import { useSession } from '@/provider/session-provider'
import { Typography } from '@/components/typography'
import Image from 'next/image'
import React from 'react'
const Page = () => {
  const { signin, signout, data, status } = useSession()
  return (
    <div className="p-4">
      <Inputbox />
      <Carousel
        slides={media}
        renderItem={(item, index) => (
          <Image
            key={index}
            height={300}
            width={600}
            src={item.src}
            placeholder="blur"
            blurDataURL={item.blurDataURL}
            alt={item.src}
          />
        )}
      />

      <Button
        disabled={status === 'loading' || !!data}
        onClick={() => signin({ provider: 'kakao' })}
      >
        {data ? '접속중' : 'Signin'}
      </Button>
      <Button onClick={() => signout()}>Signout</Button>

      <Typography hierarchy="mainTitle1" as="h1">
        Main Title 1
      </Typography>

      <Typography
        hierarchy="mainTitle2"
        as="h2"
        className="text-main-green-green400"
      >
        Main Title 2
      </Typography>
    </div>
  )
}

export default Page
