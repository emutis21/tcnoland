import { Input } from '@/components/ui/input'
import type { Checkout, Field } from '../../types'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { RadioField } from '@/components/ui/radioGruop'

function TextField({
  value,
  onChange,
  ...props
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <Input
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
      }}
      {...props}
    />
  )
}

function Fields({
  fields,
  checkout,
  onChange
}: {
  fields: Field[]
  checkout: Checkout
  onChange: (id: string, value: string) => void
}) {
  return (
    <div className='flex flex-1 flex-col gap-8'>
      {fields.map((field) => (
        <div key={field.title} className='flex flex-col gap-4'>
          <p className='text-lg font-medium'>{field.title}</p>
          <div className='flex flex-col gap-4'>
            {field.type === 'text' && (
              <Input
                placeholder={field.placeholder}
                value={checkout.get(field.title) || ''}
                onChange={(e) => {
                  onChange(field.title, e.target.value)
                }}
              />
            )}
            {field.type === 'radio' && (
              <RadioField
                options={field.options}
                value={checkout.get(field.title) || ''}
                onChange={(value: string) => {
                  onChange(field.title, value)
                }}
              />
            )}
            {field.note && <p className='text-sm text-gray-500'>{field.note}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Fields
