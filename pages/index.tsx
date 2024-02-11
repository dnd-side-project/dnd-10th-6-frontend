import Button from '@/components/button'
import Carousel from '@/components/carousel'
import Inputbox from '@/components/inputbox'
import { media } from '@/components/media'
import { useSession } from '@/provider/session-provider'
import { Modal } from '@/components/modal'

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

      <Modal
        title="Modal Title"
        description="Modal Description"
        trigger={<Button>Open Modal</Button>}
      >
        Modal Content
      </Modal>
    </div>
  )
}

export default Page
