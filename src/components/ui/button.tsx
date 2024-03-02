import React from 'react'

const buttonVariants = {
  primary: `bg-gradient-to-br from-breakerbay-800 to-breakerbay-500 hover:bg-gradient-to-tr [&>span]:bg-slate-950`,
  secondary:
    'bg-gradient-to-br from-slate-900 to-slate-700 hover:bg-gradient-to-tr [&>span]:bg-slate-950',
  tertiary: 'bg-transparent [&>span]:transparent hover:[&>span]:bg-breakerbay-900'
} as const

const buttonSizes = {
  sm: 'text-sm min-w-20 max-w-max [&>span]:px-3 [&>span]:py-1',
  md: 'text-lg min-w-28 max-w-max [&>span]:px-5 [&>span]:py-2',
  lg: 'text-xl min-w-full [&>span]:w-full [&>span]:py-4 [&>span]:px-6'
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
      <button
        ref={ref}
        className={`${className} grid h-fit cursor-pointer touch-manipulation whitespace-nowrap rounded-lg border-0 p-1 text-white transition-all duration-300 hover:outline-0 active:scale-90 active:outline-0 [&>span]:hover:bg-transparent ${variantClass} ${defSize}`}
        {...props}
      >
        <span className='h-full w-full rounded-md duration-200'>{children}</span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
