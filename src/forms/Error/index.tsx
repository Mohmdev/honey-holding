import React from 'react'

import classes from './index.module.scss'
import { Props } from './types.js'

const Error: React.FC<Props> = (props) => {
  const { showError, message, className } = props

  if (showError) {
    return (
      <p className={[classes.error, className].filter(Boolean).join(' ')}>
        {message}
      </p>
    )
  }

  return null
}

export default Error
