export function Checkbox({
  name,
  children,
  onChange,
  checked,
  disabled
}: {
  name: string
  children: string
  onChange: (name: string, checked: boolean) => void
  checked: boolean
  disabled?: boolean
}) {
  return (
    <div className='checkbox-wrapper-4'>
      <input
        checked={checked}
        className='inp-cbx'
        disabled={disabled}
        id={name}
        name={name}
        type='checkbox'
        onChange={(e) => onChange(name, e.target.checked)}
      />
      <label className='cbx' htmlFor={name}>
        <span>
          <svg height='10px' width='12px' />
        </span>
        <span>{children}</span>
      </label>
      <svg className='inline-svg'>
        <symbol id='check-4' viewBox='0 0 12 10'>
          <polyline points='1.5 6 4.5 9 10.5 1' />
        </symbol>
      </svg>
    </div>
  )
}
