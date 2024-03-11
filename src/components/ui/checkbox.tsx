export const Checkbox = ({
  name,
  children,
  onChange,
  checked,
  disabled,
}: {
  name: string
  children: string
  onChange: (name: string, checked: boolean) => void
  checked: boolean
  disabled?: boolean
}) => {
  return (
    <div className='checkbox-wrapper-4'>
      <input
        className='inp-cbx'
        id={name}
        type='checkbox'
        checked={checked}
        disabled={disabled}
        name={name}
        onChange={(e) => onChange(name, e.target.checked)}
      />
      <label className='cbx' htmlFor={name}>
        <span>
          <svg width='12px' height='10px'></svg>
        </span>
        <span>{children}</span>
      </label>
      <svg className='inline-svg'>
        <symbol id='check-4' viewBox='0 0 12 10'>
          <polyline points='1.5 6 4.5 9 10.5 1'></polyline>
        </symbol>
      </svg>
    </div>
  )
}
