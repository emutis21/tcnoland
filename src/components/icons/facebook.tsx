export function FacebookIcon({ size = 26, className }: { size?: number; className?: string }) {
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
      <path d='M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3' />
    </svg>
  )
}