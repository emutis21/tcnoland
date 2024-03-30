export function TwitterIcon({ size = 26, className }: { size?: number; className?: string }) {
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
      <path d='M4 4l11.733 16h4.267l-11.733 -16z' />
      <path d='M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772' />
    </svg>
  )
}
