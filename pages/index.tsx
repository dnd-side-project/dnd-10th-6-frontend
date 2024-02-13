<<<<<<< HEAD
import Button from '@/components/button'
import Carousel from '@/components/carousel'
import Inputbox from '@/components/inputbox'
import { media } from '@/components/media'
import { useSession } from '@/provider/session-provider'
import { Modal } from '@/components/modal'

import Image from 'next/image'
import React from 'react'
=======
import { GetServerSideProps } from 'next'

>>>>>>> 1c5d4b42b14c7562006a04157c89769a340a9aa7
const Page = () => {
  return (
<<<<<<< HEAD
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
=======
    <div className="min-h-[100dvh] flex flex-col pb-[50px] px-5">INDEX</div>
>>>>>>> 1c5d4b42b14c7562006a04157c89769a340a9aa7
  )
}

export default Page

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
  return { props: {} }
}) satisfies GetServerSideProps
