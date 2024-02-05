import Button from '@/components/button'
import Carousel from '@/components/carousel'
import Inputbox from '@/components/inputbox'
import { media } from '@/components/media'
import { Modal } from '@/components/modal'
import { Typography } from '@/components/typography'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const Page = () => {
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
      <Link href="/signin">
        <Button>Signin</Button>
      </Link>

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

      <Modal
        title="Modal Title"
        description="Modal Description"
        trigger={<Button>Open Modal</Button>}
      >
        <Typography hierarchy="mainTitle1" as="h1">
          Modal Content
        </Typography>
      </Modal>
    </div>
  )
}

export default Page
