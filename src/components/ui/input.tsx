import React from 'react'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`
          ${className}
          rounded-lg border-2 border-slate-300 bg-slate-50 px-6 py-3 text-base
          text-breakerbay-900 outline-none transition-all duration-300 hover:border-breakerbay-500 focus:border-breakerbay-500 dark:border-slate-500 
          dark:bg-slate-900 dark:text-breakerbay-50
          dark:hover:border-breakerbay-700 dark:focus:border-breakerbay-700
        `}
        type={type}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }
