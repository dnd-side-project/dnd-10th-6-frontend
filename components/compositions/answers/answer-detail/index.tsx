interface AnswerDetailProps {
  questionTitle: string
  answer?: string | number | any
  reason: string
  index: number
  value: string | boolean
}

const AnswerDetail = ({
  index,
  questionTitle,
  answer,
  reason,
  value,
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
        <p className="text-body3-bold">
          {index + 1}.{' '}
          <span dangerouslySetInnerHTML={{ __html: questionTitle }}></span>
        </p>
        {answer && (
          <div
            className="w-fit text-body3-medium px-2 py-1 rounded-md"
            style={answerStyle}
          >
            {answer}
          </div>
        )}
        {reason && (
          <div className="text-body3-medium bg-bg-gray1 text-text-sub-gray76 px-2 py-4 rounded-md">
            {reason}
          </div>
        )}
      </div>
    </>
  )
}

export default AnswerDetail
