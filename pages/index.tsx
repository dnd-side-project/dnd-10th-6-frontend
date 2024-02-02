import Button from '@/components/button'
import Carousel from '@/components/carousel'
import Inputbox from '@/components/inputbox'
import { media } from '@/components/media'
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
    </div>
  )
}

export default Page
