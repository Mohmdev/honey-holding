import React from 'react'

import { Loader2 } from 'lucide-react'

const Loading = () => {
  return (
    <div className="loading">
      <Loader2 className="loading__spinner" />
      <span className="loading__text">Loading...</span>
    </div>
  )
}

export default Loading
