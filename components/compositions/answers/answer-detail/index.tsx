import Reason from '@/components/compositions/answers/reason'

interface AnswerDetailProps {
  questionTitle: string
  questionName: string
  answer?: string | number | any
  reason: string
  index: number
  value: string | boolean
  onShareClick?: () => void
}

const AnswerDetail = ({
  index,
  questionTitle,
  answer,
  reason,
  value,
  onShareClick,
}: AnswerDetailProps) => {
  const trueValueStyle = {
    color: '#00BC68',
    backgroundColor: '#E9FAEF',
  }
  const falseValueStyle = {
    color: '#EB2A2A',
    backgroundColor: '#FFF8F8',
  }
  const remainValueStyle = {
    color: '#6B7280',
    backgroundColor: '#F7F7F7',
  }

  const answerStyle = (() => {
    if (value === true) {
      return trueValueStyle
    } else if (value === false) {
      return falseValueStyle
    } else {
      return remainValueStyle
    }
  })()
  return (
    <>
      <div className="py-4 px-1 flex flex-col space-y-4 ">
        <div className="flex justify-between">
          <p className="text-body3-bold">
            {index + 1}.{' '}
            <span dangerouslySetInnerHTML={{ __html: questionTitle }}></span>
          </p>
          {onShareClick && (
            <button
              onClick={onShareClick}
              className="shrink-0 self-baseline"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.41406 8.39453C5.06888 8.39453 4.78906 8.67435 4.78906 9.01953V16.2493C4.78906 16.5944 5.06888 16.8743 5.41406 16.8743H14.5807C14.9259 16.8743 15.2057 16.5944 15.2057 16.2493V9.01953C15.2057 8.67435 14.9259 8.39453 14.5807 8.39453H12.4974C12.1522 8.39453 11.8724 8.11471 11.8724 7.76953C11.8724 7.42435 12.1522 7.14453 12.4974 7.14453H14.5807C15.6163 7.14453 16.4557 7.984 16.4557 9.01953V16.2493C16.4557 17.2848 15.6163 18.1243 14.5807 18.1243H5.41406C4.37853 18.1243 3.53906 17.2848 3.53906 16.2493V9.01953C3.53906 7.984 4.37853 7.14453 5.41406 7.14453H7.4974C7.84257 7.14453 8.1224 7.42435 8.1224 7.76953C8.1224 8.11471 7.84257 8.39453 7.4974 8.39453H5.41406Z"
                  fill="#999999"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 2.70703C10.3452 2.70703 10.625 2.98685 10.625 3.33203V12.4987C10.625 12.8439 10.3452 13.1237 10 13.1237C9.65482 13.1237 9.375 12.8439 9.375 12.4987V3.33203C9.375 2.98685 9.65482 2.70703 10 2.70703Z"
                  fill="#999999"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.56676 2.05205C9.80938 1.81598 10.1958 1.81598 10.4385 2.05205L13.3551 4.88988C13.6025 5.1306 13.6079 5.52629 13.3672 5.77368C13.1265 6.02108 12.7308 6.0265 12.4834 5.78579L10.0026 3.37202L7.52178 5.78579C7.27439 6.0265 6.8787 6.02108 6.63798 5.77368C6.39727 5.52629 6.40269 5.1306 6.65009 4.88988L9.56676 2.05205Z"
                  fill="#999999"
                />
              </svg>
            </button>
          )}
        </div>
        {answer && (
          <div
            className="w-fit text-body3-medium px-2 py-1 rounded-md"
            style={answerStyle}
          >
            {answer}
          </div>
        )}
        {reason && <Reason reason={reason} />}
      </div>
    </>
  )
}

export default AnswerDetail
