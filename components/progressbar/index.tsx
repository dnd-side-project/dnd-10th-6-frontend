import React from 'react'

export interface ProgressBarProps {
  current: number
  max: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, max }) => {
  return (
    <div className="py-1 mb-4">
      <div className="w-full h-2 bg-gray-200 rounded-lg">
        <div
          className="h-full bg-brand-main-green400 rounded-lg"
          style={{ width: `${(current / max) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}

export default ProgressBar
