interface AnswerDetailProps {
  questionTitle: string
  answer?: string | number
  reason: string
  index: number
}

const AnswerDetail = ({
  index,
  questionTitle,
  answer,
  reason,
}: AnswerDetailProps) => {
  return (
    <>
      <div className="py-4 px-1 flex flex-col space-y-4">
        <p className="text-body3-bold">
          {index + 1}.{' '}
          <span dangerouslySetInnerHTML={{ __html: questionTitle }}></span>
        </p>

        {answer && (
          <div className="w-fit text-body3-medium bg-bg-gray1 text-text-sub-gray76 px-2 py-1 rounded-md">
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
