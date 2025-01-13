import * as React from "react"
import withEventLogging from '@/components/EventLogger';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const MyInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={className}
        ref={ref}
        {...props}
      />
    )
  }
)
MyInput.displayName = "Input"

const Input = withEventLogging(MyInput)

export { Input }
