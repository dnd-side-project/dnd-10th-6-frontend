import { ReactNode, Suspense, useMemo, useRef, useState } from 'react'
import { Variants, motion, useAnimate } from 'framer-motion'
import Question from '@/components/survey'
import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { getQuestionQuery } from '@/queries/question'

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(getQuestionQuery)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const Page = ({ dehydratedState }: { dehydratedState: DehydratedState }) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Question />
    </HydrationBoundary>
  )
}

Page.getLayout = (page: ReactNode) => page
export default Page
