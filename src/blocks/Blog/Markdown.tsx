import React from 'react'
import Dynamic from 'next/dynamic'

const Block = Dynamic(() => import('./Block.jsx'))

export function BlogMarkdown(props) {
  return (
    <React.Suspense>
      <Block {...props} />
    </React.Suspense>
  )
}
