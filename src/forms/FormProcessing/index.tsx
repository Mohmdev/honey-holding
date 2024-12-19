import React from 'react'

import { useDebounce } from '@utils/useDebounce'

import { useFormProcessing } from '@forms/Form/context'

const FormProcessing: React.FC<{
  className?: string
  message?: string
  delay?: number
}> = (props) => {
  const { className, message = 'Processing...', delay = 250 } = props

  const isProcessing = useFormProcessing()
  const debouncedIsProcessing = useDebounce(isProcessing, delay || 0)

  if (debouncedIsProcessing) {
    return <p className={[className].filter(Boolean).join(' ')}>{message}</p>
  }

  return null
}

export default FormProcessing
