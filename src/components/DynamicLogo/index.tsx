import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utilities/cn'
import Link from 'next/link'

interface DynamicLogoProps {
  logoUrl?: string
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const DynamicLogo = (props: DynamicLogoProps) => {
  const { logoUrl, loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'eager'
  const priority = priorityFromProps || 'low'

  const color = 'white'

  return (
    <Link href="/">
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt="Site Logo"
          width={193}
          height={34}
          loading={loading}
          fetchPriority={priority}
          decoding="async"
          className={cn('max-w-[9.375rem] w-full h-[34px]', className)}
        />
      ) : (
        <div
          className={cn(
            // 'max-w-[9.375rem] w-full h-[34px]',
            'flex items-center gap-2',
          )}
        >
          <span className={cn('text-2xl font-bold')} style={{ color }}>
            Placeholder
          </span>
          <svg
            width="50"
            height="39"
            viewBox="0 0 50 39"
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
            className={cn('w-10')}
            aria-label="Logoipsum"
          >
            <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" stopColor={color}></path>
            <path
              d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
              stopColor={color}
            ></path>
          </svg>
        </div>
      )}
    </Link>
  )
}
