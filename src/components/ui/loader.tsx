import '@/styles/loader.scss'

export function LoaderComponent({ className = '' }: { className?: string }) {
  return (
    <div className='absolute left-1/2 top-1/2 mx-auto flex h-full -translate-x-1/2 -translate-y-1/2 transform pt-40'>
      <div className={`newtons-cradle ${className}`}>
        <div className='newtons-cradle__dot' />
        <div className='newtons-cradle__dot' />
        <div className='newtons-cradle__dot' />
        <div className='newtons-cradle__dot' />
      </div>
    </div>
  )
}
