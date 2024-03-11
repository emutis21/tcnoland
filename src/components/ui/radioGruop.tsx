import { RadioGroup, RadioGroupItem } from './radio-group'

type RadioFieldProps = {
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
      value={value}
      onChange={onChange}
      options={radioOptions}
    >
      {options.map((option, index) => (
        <RadioGroupItem
          key={index}
          name='radiofield'
          value={option}
          checked={value === option}
          onChange={onChange}
          label={option}
        />
      ))}
    </RadioGroup>
  )
}
