import React from 'react'

const buttonVariants = {
  primary: `bg-gradient-to-br from-breakerbay-800 to-breakerbay-500 hover:bg-gradient-to-tr [&>span]:bg-slate-950`,
  secondary:
    'bg-gradient-to-br from-slate-900 to-slate-700 hover:bg-gradient-to-tr [&>span]:bg-slate-950',
  tertiary: 'bg-transparent [&>span]:transparent hover:[&>span]:bg-breakerbay-900'
} as const

const buttonSizes = {
  sm: 'text-sm min-w-20 max-w-max [&>span]:px-4 [&>span]:py-2',
  md: 'text-lg min-w-28 max-w-max [&>span]:px-5 [&>span]:py-3',
  lg: 'text-xl min-w-full [&>span]:px-6 [&>span]:py-4'
} as const

type ButtonSizes = keyof typeof buttonSizes

type ButtonVariants = keyof typeof buttonVariants

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants
  size?: ButtonSizes
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const variantClass = variant ? buttonVariants[variant] : ''
    const defSize = size ? buttonSizes[size] : 'text-base'
    return (
      <button ref={ref} className={`${variantClass} ${defSize}`} {...props}>
        <span className=''>{children}</span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
