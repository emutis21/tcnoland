import React from 'react'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`
          ${className}
          rounded-lg border-2 border-slate-500 bg-slate-900 px-6
          py-3 text-base text-breakerbay-50 outline-none transition-all duration-300 
          hover:border-breakerbay-700 focus:border-breakerbay-700
        `}
        type={type}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }
