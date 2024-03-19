export function CloseIcon({ size = 26, className }: { size?: number; className?: string }) {
  return (
    <svg
      className={className}
      fill='none'
      height={size}
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      viewBox='0 0 24 24'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M0 0h24v24H0z' fill='none' stroke='none' />
      <path d='M5 9l4 0l0 -4' />
      <path d='M3 3l6 6' />
      <path d='M5 15l4 0l0 4' />
      <path d='M3 21l6 -6' />
      <path d='M19 9l-4 0l0 -4' />
      <path d='M15 9l6 -6' />
      <path d='M19 15l-4 0l0 4' />
      <path d='M15 15l6 6' />
    </svg>
  )
}
