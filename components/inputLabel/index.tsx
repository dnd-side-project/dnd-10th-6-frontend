import { PropsWithChildren, forwardRef } from 'react'

interface InputLabelProps {
  label: string
  errorMessage?: string
  className?: string
  required?: boolean
}

const InputLabel = forwardRef<
  HTMLLabelElement,
  PropsWithChildren<InputLabelProps>
>(({ children, label, required, errorMessage, className }, ref) => {
  return (
    <label ref={ref} className="w-full">
      <div className="mb-2 flex items-center">
        <h3 className={className}>{label}</h3>
        {required && (
          <span className="text-brand-main-green400 ml-2 text-body3-medium">
            필수
          </span>
        )}
      </div>
      <div className="relative h-fit w-full ">
        {children}
        {errorMessage && (
          <p className="text-caption1 mt-1 text-red-500">{errorMessage}</p>
        )}
      </div>
    </label>
  )
})

InputLabel.displayName = 'InputLabel'

export default InputLabel
