import Image from 'next/image'
import logo from '@/assets/logo/logo.svg'
import ManyTrees from '../../svgs/many-trees'

const Loading = () => {
  return (
    <div className="h-calc-h flex flex-col px-5 py-4 ">
      <section className="flex flex-col flex-1 justify-center">
        <h2 className="text-mainTitle2-medium">남이 써주는</h2>
        <h1 className="text-[40px] font-bold mb-2">나의 소개서</h1>
        <Image src={logo} alt="logo" />
      </section>
      <div className="ml-5 mt-5">
        <ManyTrees />
      </div>
    </div>
  )
}

export default Loading
