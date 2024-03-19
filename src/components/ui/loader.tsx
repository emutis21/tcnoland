import '@/styles/loader.scss'

export function LoaderComponent({ className = '' }: { className?: string }) {
  return (
    <div className={`newtons-cradle ${className}`}>
      <div className='newtons-cradle__dot' />
      <div className='newtons-cradle__dot' />
      <div className='newtons-cradle__dot' />
      <div className='newtons-cradle__dot' />
    </div>
  )
}
