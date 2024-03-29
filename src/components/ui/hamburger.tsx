export function HamburgerComponent({
  className,
  isOpen,
  setIsOpen
}: {
  className?: string
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsOpen(event.target.checked)
  }

  return (
    <label className={`hamburger ${className}`} htmlFor='hamburger-checkbox'>
      <input
        checked={isOpen}
        id='hamburger-checkbox'
        name='hamburger-checkbox'
        type='checkbox'
        onChange={handleInputChange}
      />
      <svg className='hamburger-icon' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
        <path
          className='line line-top-bottom'
          d='M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22'
        />
        <path className='line' d='M7 16 27 16' />
      </svg>
    </label>
  )
}
