export function AddIcon({ size = 26, className }: { size?: number; className?: string }) {
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
      <path d='M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0' />
      <path d='M9 12h6' />
      <path d='M12 9v6' />
    </svg>
  )
}
