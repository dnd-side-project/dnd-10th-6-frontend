import React from 'react'
import { motion } from 'framer-motion'
export interface ProgressBarProps {
  current: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current }) => {
  return (
    <motion.div
      initial={{ width: '0%' }}
      animate={{ width: '100%' }}
      exit={{ width: '0%' }}
      transition={{
        duration: 0.5,
      }}
      className="mb-4 py-1"
    >
      <div className="h-2 w-full rounded-lg bg-bg-light">
        <div
          className="h-full rounded-lg bg-brand-main duration-300 ease-in-out"
          style={{ width: `${current}%` }}
        ></div>
      </div>
    </motion.div>
  )
}

export default ProgressBar
