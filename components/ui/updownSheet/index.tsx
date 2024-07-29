import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

interface UpDownSheetProps {
  isOpen: boolean
  onClose: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  isFirst: boolean
  isLast: boolean
}

const UpDownSheet: React.FC<UpDownSheetProps> = ({
  isOpen,
  onClose,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  if (!isOpen) return null

  return createPortal(
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 flex items-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        ref={ref}
        className="pointer-events-auto w-full rounded-t-lg bg-white p-4"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col items-center justify-between gap-3">
          <button
            className=" flex w-full items-center justify-center rounded-md bg-bg-regular py-4 text-but1-sb text-black disabled:text-font-gray-disabled"
            onClick={onMoveUp}
            disabled={isFirst}
          >
            올리기
            <svg
              className="ml-1"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.83318 13.3334L10.4998 6.66675L17.1665 13.3334"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            className=" flex w-full items-center justify-center rounded-md bg-bg-regular py-4 text-but1-sb text-black disabled:text-font-gray-disabled"
            onClick={onMoveDown}
            disabled={isLast}
          >
            내리기
            <svg
              className="ml-1"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.1668 6.66659L10.5002 13.3333L3.8335 6.66659"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-3 w-full rounded-md bg-white py-4 text-but1-sb text-brand-main"
        >
          완료
        </button>
      </motion.div>
    </motion.div>,
    document.body,
  )
}

export default UpDownSheet
