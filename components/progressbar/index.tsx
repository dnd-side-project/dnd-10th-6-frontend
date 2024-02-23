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
      className="py-1 mb-4"
    >
      <div className="w-full h-2 bg-gray-200 rounded-lg">
        <div
          className="h-full bg-brand-main-green400 rounded-lg duration-300 ease-in-out"
          style={{ width: `${current}%` }}
        ></div>
      </div>
    </motion.div>
  )
}

export default ProgressBar
