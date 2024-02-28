import Head from 'next/head'

interface MetaHeadProps {
  title?: string
  description?: string
  url?: string
  image?: string
}
const MetaHead = ({
  title,
  description = '남이 써주는 나의 소개서',
  url,
  image,
}: MetaHeadProps) => {
  return (
    <Head>
      <title>{title || 'namuiwiki | 남의위키'}</title>
      <meta name="description" content={description || ''} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title || 'namuiwiki | 남의위키'} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || 'https://namui-wiki.life/'} />
      <meta property="og:description" content={description || ''} />

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
      <script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
        integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
        crossOrigin="anonymous"
        defer
      ></script>
      <meta
        name="viewport"
        content="initial-scale=1.0; maximum-scale=1.0; minimum-scale=1.0; user-scalable=no;"
      />

      <meta name="HandheldFriendly" content="true" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff"></meta>
    </Head>
  )
}
export default MetaHead
