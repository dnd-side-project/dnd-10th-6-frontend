import Button from '@/components/button'
import Carousel from '@/components/carousel'
import Inputbox from '@/components/inputbox'
import { media } from '@/components/media'
import { useSession } from '@/provider/session-provider'
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
    </div>
  )
}

export default Page
