import React from 'react'

export interface ProgressBarProps {
  current: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current }) => {
  return (
    <div className="py-1 mb-4">
      <div className="w-full h-2 bg-gray-200 rounded-lg">
        <div
          className="h-full bg-brand-main-green400 rounded-lg duration-300 ease-in-out"
          style={{ width: `${current}%` }}
        ></div>
      </div>
    </div>
  )
}

export default ProgressBar
