'use client'

type RadioGroupProps = {
  options: { label: string; value: string }[]
  name: string
  className?: string
  value: string
  onChange: (value: string) => void
  children?: React.ReactNode
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, name, className, value, onChange }) => {
  return (
    <div className={`${className} flex flex-col gap-3`}>
      {options.map((option, index) => (
        <RadioGroupItem
          key={index}
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={onChange}
          label={option.label}
        />
      ))}
    </div>
  )
}

type RadioGroupItemProps = {
  name: string
  value: string
  checked: boolean
  onChange: (value: string) => void
  label: string
}

const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
  name,
  value,
  checked,
  onChange,
  label
}) => {
  return (
    <label className='flex gap-2 text-xl font-semibold w-fit cursor-pointer text-breakerbay-100 hover:text-breakerbay-300 transition-colors'>
      <input
        type='radio'
        name={name}
        value={value}
        className='checked:bg-red-900'
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
      />
      {label}
    </label>
  )
}

export { RadioGroup, RadioGroupItem }
