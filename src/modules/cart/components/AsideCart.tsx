export const AsideCart = ({
  children,
  className
}: {
  children?: React.ReactNode
  className?: string
}) => {
  return <aside className={className}>Hola{children}</aside>
}
