import { PropsWithChildren } from 'react'

interface InputLabelProps {
  label: string
  errorMessage?: string
}

const InputLabel = ({
  children,
  label,
  errorMessage,
}: PropsWithChildren<InputLabelProps>) => {
  return (
    <label>
      <h3 className="text-body1-bold">{label}</h3>
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
