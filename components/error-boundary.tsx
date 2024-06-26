import React, { ErrorInfo, PropsWithChildren } from 'react'
import { Button } from '@/components/ui'
import ErrorTree from './svgs/error-tree'
import { motion } from 'framer-motion'
import { fadeInProps } from '@/variants'

class ErrorBoundary extends React.Component<
  PropsWithChildren,
  { hasError: boolean }
> {
  constructor(props: PropsWithChildren) {
    super(props)

    this.state = { hasError: false }
  }
  static getDerivedStateFromError(_: Error) {
    return { hasError: true }
  }

  handleBack() {
    window.location.pathname = '/garden'
  }

  componentDidCatch(error: Error, _: ErrorInfo) {
    console.log(error)
  }
  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          {...fadeInProps}
          className="flex h-calc-h w-full flex-col items-center justify-center"
        >
          <ErrorTree />
          <div className="mb-14 mt-8 flex flex-col space-y-3 text-center">
            <p className="text-mainTitle2-bold text-text-main-black11">
              서버에 문제가 생겼어요
            </p>
            <p className="text-subTitle2-medium text-text-sub-gray4f">
              잠시 후 다시 시도해 주세요
            </p>
          </div>

          <Button onClick={this.handleBack} className="!w-fit px-4">
            내 정원가기
          </Button>
        </motion.div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
