export const AddIcon = ({ size = 26, className }: { size?: number; className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      className={className}
      height={size}
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0' />
      <path d='M9 12h6' />
      <path d='M12 9v6' />
    </svg>
  )
}
