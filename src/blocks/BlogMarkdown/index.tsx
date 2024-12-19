import React from 'react'
import Dynamic from 'next/dynamic'

const Block = Dynamic(() => import('./Block'))

export function BlogMarkdown(props) {
  return (
    <React.Suspense>
      <Block {...props} />
    </React.Suspense>
  )
}
