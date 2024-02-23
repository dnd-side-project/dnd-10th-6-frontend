import { ReactNode } from 'react'

import { TreeType, treeCardAsset } from '@/model/tree.entity'
import TreeCard from '@/components/compositions/tree-card'
import FormLayout from '@/layout/form-layout'
import Button from '@/components/button'
import { render } from 'react-dom'
const Page = () => {
  const treeType = new TreeType(treeCardAsset)
  

  return (
    <>
      <FormLayout
        header={
        {
         
          leftIcon: <></>,
          center: <h3 className="text-bod1y-bold">내 정원</h3>,
          rightIcon: (
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.58398 11.7539C7.10073 11.7539 6.70898 12.1457 6.70898 12.6289V22.7505C6.70898 23.2338 7.10074 23.6255 7.58398 23.6255H20.4173C20.9006 23.6255 21.2923 23.2338 21.2923 22.7505V12.6289C21.2923 12.1457 20.9006 11.7539 20.4173 11.7539H17.5007C17.0174 11.7539 16.6257 11.3622 16.6257 10.8789C16.6257 10.3957 17.0174 10.0039 17.5007 10.0039H20.4173C21.8671 10.0039 23.0423 11.1792 23.0423 12.6289V22.7505C23.0423 24.2003 21.8671 25.3755 20.4173 25.3755H7.58398C6.13424 25.3755 4.95898 24.2003 4.95898 22.7505V12.6289C4.95898 11.1792 6.13424 10.0039 7.58398 10.0039H10.5007C10.9839 10.0039 11.3757 10.3957 11.3757 10.8789C11.3757 11.3622 10.9839 11.7539 10.5007 11.7539H7.58398Z"
                fill="#111111"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 3.79297C14.4832 3.79297 14.875 4.18472 14.875 4.66797V17.5013C14.875 17.9846 14.4832 18.3763 14 18.3763C13.5168 18.3763 13.125 17.9846 13.125 17.5013V4.66797C13.125 4.18472 13.5168 3.79297 14 3.79297Z"
                fill="#111111"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.3892 2.87286C13.7288 2.54238 14.2699 2.54238 14.6095 2.87286L18.6929 6.84584C19.0392 7.18283 19.0468 7.7368 18.7098 8.08316C18.3728 8.42952 17.8189 8.43711 17.4725 8.10011L13.9993 4.72083L10.5262 8.10011C10.1798 8.43711 9.62588 8.42952 9.28888 8.08316C8.95188 7.7368 8.95947 7.18283 9.30583 6.84584L13.3892 2.87286Z"
                fill="#111111"
              />
            </svg>
          ),
        }}
        className=" bg-gray-gray50 w-full"
        content={
          <div className="space-y-2">
            
              <div className=" flex justify-between items-center">
                <div className="flex flex-col justify-center w-full">
                  <p className="text-body1-medium text-text-sub-gray4f text-left">
                    내 정원에 심어진 나무는
                  </p>
                  <h3 className="text-mainTitle1-bold">총 0그루</h3>
                </div>
                <div className="w-40 h-12 flex justify-center items-center">
                  <Button className="">내 결과보기</Button>
                </div>
              </div>
            
            <section className="bg-white">
              <p className="p-2 text-subTitle2-bold text-text-sub-gray4f">
                받은 친구
              </p>
              <div className="w-full p-1  overflow-y-scroll">
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(30)].map((_, index) => (
                    <TreeCard 
                   />
                  ))}
                </div>
              </div>
            </section>
          </div>
        }
        button={<></>}
      />
    </>
  )
}

export default Page
Page.getLayout = (page: ReactNode) => page
