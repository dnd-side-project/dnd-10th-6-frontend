import { useFunnelContext } from '@/contexts/useFunnelContext'

interface FormHeaderProps {
  showStepOrTitle?: boolean
  showBackButton?: boolean
  showCloseButton?: boolean
  title: string
  step: React.ReactNode
}

const FormHeader = ({
  showBackButton,
  showCloseButton,
  showStepOrTitle,
  title,
  step,
}: FormHeaderProps) => {
  const { toPrevStep } = useFunnelContext()
  return (
    <>
      <FormNav
        className="w-full z-10 flex justify-between items-center px-5 h-14 bg-gray-400 sticky "
        leftButton={
          showBackButton && (
            <button onClick={toPrevStep}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          )
        }
        center={showStepOrTitle ? step : title}
        rightButton={
          showCloseButton && (
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          )
        }
      />
    </>
  )
}

export default FormHeader

interface FormNavProps {
  leftButton?: React.ReactNode
  center?: React.ReactNode
  rightButton?: React.ReactNode
  className?: string
}

const FormNav = ({
  leftButton,
  center,
  rightButton,
  className,
}: FormNavProps) => {
  return (
    <header className={className}>
      <div>{leftButton}</div>
      <h3 className="text-body1-bold">{center}</h3>
      <div>{rightButton}</div>
    </header>
  )
}
