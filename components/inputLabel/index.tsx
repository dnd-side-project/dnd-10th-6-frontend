import { PropsWithChildren } from 'react'

interface InputLabelProps {
  label: string
  errorMessage?: string
  className?: string
  required?: boolean
}

const InputLabel = ({
  children,
  label,
  required,
  errorMessage,
  className,
}: PropsWithChildren<InputLabelProps>) => {
  return (
    <label>
      <div className="flex items-center mb-2">
        <h3 className={className}>{label}</h3>
        {required && (
          <span className="ml-2 text-body3-medium text-brand-main-green400">
            필수
          </span>
        )}
      </div>
      <div className="w-full h-fit relative ">
        {children}
        {errorMessage && (
          <p className="text-caption1 text-red-500 mt-1">{errorMessage}</p>
        )}
      </div>
    </label>
  )
}

export default InputLabel
