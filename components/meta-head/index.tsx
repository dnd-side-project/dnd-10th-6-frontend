import Head from 'next/head'

interface MetaHeadProps {
  title?: string
  description?: string
  url?: string
  image?: string
}
const MetaHead = ({ title, description, url, image }: MetaHeadProps) => {
  return (
    <Head>
      <title>{title || '남의위키'}</title>
      <meta name="description" content={description || ''} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title || '남의위키'} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || 'https://namui-wiki.life/'} />

      <meta
        property="og:image"
        content={
          image ??
          'https://res.cloudinary.com/dzfrlb2nb/image/upload/v1708540884/sknjwgv3p5fp5al24lzo.png'
        }
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff"></meta>
    </Head>
  )
}
export default MetaHead
