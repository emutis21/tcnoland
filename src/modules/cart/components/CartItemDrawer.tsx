import type { CartItem } from '../types'

import { useState, useMemo } from 'react'

import { parseCurrency } from '~/currency/utils'

import { Button } from '@/components/ui/button'

import { getCartItemPrice } from '../utils'

function CartItemDrawer({
  item,
  onClose,
  onSubmit,
  ...props
}: {
  item: CartItem
  onClose: VoidFunction
  onSubmit: (item: CartItem) => void
}) {
  const [formData, setFormData] = useState<CartItem>(() => ({ ...item, options: {} }))
  const total = useMemo(() => parseCurrency(getCartItemPrice(formData)), [formData])
  const options = useMemo(
    () =>{},
    []
  )

  return (
    // <Sheet onOpenChange={(isOpen) => !isOpen && onClose()} {...props}>
    //   <SheetContent className='grid grid-rows-[auto_1fr_auto]'>
    //     <SheetHeader>
    //       <SheetClose className='border-border bg-background z-20 -mx-6 ml-auto h-12 w-14 rounded-l-lg border py-2 pl-2 pr-4 shadow-lg'>
    //         <X className='h-8 w-8' />
    //       </SheetClose>
    //     </SheetHeader>

    //     <div
    //       className={cn('overflow-y-auto', { '-mt-16': item.image })}
    //       data-testid='cart-item-drawer'
    //     >
    //       <div className='flex flex-col gap-8'>
    //         <div className='flex flex-col gap-2'>
    //           {Boolean(item.image) && (
    //             <img
    //               alt={item.title}
    //               className='bg-secondary h-[240px] w-full object-contain sm:h-[320px]'
    //               src={item.image}
    //             />
    //           )}
    //           <SheetTitle className='text-2xl font-medium'>{item.title}</SheetTitle>
    //           <SheetDescription className='text-md text-muted-foreground whitespace-pre-wrap sm:text-lg'>
    //             {item.description}
    //           </SheetDescription>
    //         </div>
    //         {Boolean(options.length) && (
    //           <div className='flex flex-col gap-8'>
    //             {options.map((category) => {
    //               return (
    //                 <div key={category.title} className='flex w-full flex-col gap-4'>
    //                   <p className='text-lg font-medium'>{category.title}</p>
    //                   <RadioGroup value={formData.options?.[category.title]?.[0]?.title}>
    //                     <div className='flex flex-col gap-4'>
    //                       {category.options.map((option) => (
    //                         <div key={option.title} className='flex items-center gap-x-3'>
    //                           <RadioGroupItem
    //                             id={option.title}
    //                             value={option.title}
    //                             onClick={() => {
    //                               handleSelectOption(option)
    //                             }}
    //                           />
    //                           <Label className='w-full' htmlFor={option.title}>
    //                             <div className='flex w-full items-center justify-between gap-2'>
    //                               <p>{option.title}</p>
    //                               {Boolean(option.price) && (
    //                                 <div className='flex items-center gap-1'>
    //                                   <p className='text-muted-foreground'>
    //                                     {option.price < 0 ? '-' : '+'}
    //                                   </p>
    //                                   <p className='font-medium'>
    //                                     {parseCurrency(Math.abs(option.price))}
    //                                   </p>
    //                                 </div>
    //                               )}
    //                             </div>
    //                           </Label>
    //                         </div>
    //                       ))}
    //                     </div>
    //                   </RadioGroup>
    //                 </div>
    //               )
    //             })}
    //           </div>
    //         )}
    //       </div>
    //     </div>

    //     <SheetFooter>
    //       <div className='flex w-full flex-col gap-4'>
    //         <hr />
    //         <div className='flex items-center justify-between text-lg font-medium'>
    //           <p>Total</p>
    //           <p>{total}</p>
    //         </div>
    //         <Button
    //           className='w-full'
    //           size='lg'
    //           variant='brand'
    //           onClick={() => {
    //             onSubmit(formData)
    //           }}
    //         >
    //           Agregar al pedido
    //         </Button>
    //       </div>
    //     </SheetFooter>
    //   </SheetContent>
    // </Sheet>
    <main
      className='bg-red-500'
      data-testid='cart-item-drawer'
    >
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-2'>
          {Boolean(item.image) && (
            <img
              alt={item.brand}
              className='bg-secondary h-[240px] w-full object-contain sm:h-[320px]'
              src={item.image}
            />
          )}
          <h2 className='text-2xl font-medium'>{item.model}</h2>
          <p className='text-md text-muted-foreground whitespace-pre-wrap sm:text-lg'>
            {item.model}
          </p>
        </div>
        {/* {Boolean(options.length) && (
          <div className='flex flex-col gap-8'>
            {options.map((category) => {
              return (
                <div key={category.title} className='flex w-full flex-col gap-4'>
                  <p className='text-lg font-medium'>{category.title}</p>
                  <div className='flex flex-col gap-4'>
                    {category.options.map((option) => (
                      <div key={option.title} className='flex items-center gap-x-3'>
                        <input
                          id={option.title}
                          type='radio'
                          name={category.title}
                          value={option.title}
                          // onClick={() => {
                          //   handleSelectOption(option)
                          // }}
                        />
                        <label htmlFor={option.title}>
                          <div className='flex w-full items-center justify-between gap-2'>
                            <p>{option.title}</p>
                            {Boolean(option.price) && (
                              <div className='flex items-center gap-1'>
                                <p className='text-muted-foreground'>
                                  {option.price < 0 ? '-' : '+'}
                                </p>
                                <p className='font-medium'>
                                  {parseCurrency(Math.abs(option.price))}
                                </p>
                              </div>
                            )}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )} */}
      </div>
      <div className='flex w-full flex-col gap-4'>
        <hr />
        <div className='flex items-center justify-between text-lg font-medium'>
          <p>Total</p>
          <p>{total}</p>
        </div>
        <Button
          className='w-full'
          size='lg'
          variant='primary'
          onClick={() => {
            onSubmit(formData)
          }}
        >
          Agregar al pedido
        </Button>
      </div>
    </main>
  )
}

export default CartItemDrawer
