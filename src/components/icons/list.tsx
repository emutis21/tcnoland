export function ListLayoutIcon({ size = 26, className }: { size?: number; className?: string }) {
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
      <path d='M9 6l11 0' />
      <path d='M9 12l11 0' />
      <path d='M9 18l11 0' />
      <path d='M5 6l0 .01' />
      <path d='M5 12l0 .01' />
      <path d='M5 18l0 .01' />
    </svg>
  )
}
