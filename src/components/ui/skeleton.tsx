import { cn } from '@/lib/utils/cn'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-primary/10 animate-pulse rounded-md',
        'bg-gray-700',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }