import { RadioGroup, RadioGroupItem } from './radio-group'

interface RadioFieldProps {
  options: string[]
  onChange: (value: string) => void
  value: string
}

export function RadioField({ value, onChange, options }: RadioFieldProps) {
  const radioOptions = options.map((option) => ({ label: option, value: option }))

  return (
    <RadioGroup
      className=''
      name='radiofield'
      options={radioOptions}
      value={value}
      onChange={onChange}
    >
      {options.map((option, index) => (
        <RadioGroupItem
          key={index}
          checked={value === option}
          label={option}
          name='radiofield'
          value={option}
          onChange={onChange}
        />
      ))}
    </RadioGroup>
  )
}
