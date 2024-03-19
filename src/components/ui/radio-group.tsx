'use client'

interface RadioGroupProps {
  options: { label: string; value: string }[]
  name: string
  className?: string
  value: string
  onChange: (value: string) => void
  children?: React.ReactNode
}

export function RadioGroup({ options, name, className, value, onChange }: RadioGroupProps) {
  return (
    <div className={`${className} flex flex-col gap-3`}>
      {options.map((option, index) => (
        <RadioGroupItem
          key={index}
          checked={value === option.value}
          label={option.label}
          name={name}
          value={option.value}
          onChange={onChange}
        />
      ))}
    </div>
  )
}

interface RadioGroupItemProps {
  name: string
  value: string
  checked: boolean
  onChange: (value: string) => void
  label: string
}

export function RadioGroupItem({ name, value, checked, onChange, label }: RadioGroupItemProps) {
  return (
    <label className='flex w-fit cursor-pointer gap-2 text-xl font-semibold text-breakerbay-100 transition-colors hover:text-breakerbay-300'>
      <input
        checked={checked}
        className='checked:bg-red-900'
        name={name}
        type='radio'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {label}
    </label>
  )
}
