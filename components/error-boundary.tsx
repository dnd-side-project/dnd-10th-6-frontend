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
  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  handleBack() {
    window.location.pathname = '/garden'
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error)
  }
  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          {...fadeInProps}
          className="h-calc-h flex flex-col justify-center items-center w-full"
        >
          <ErrorTree />
          <div className="flex flex-col space-y-3 text-center mt-8 mb-14">
            <p className="text-text-main-black11 text-mainTitle2-bold">
              서버에 문제가 생겼어요
            </p>
            <p className="text-text-sub-gray4f text-subTitle2-medium">
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
