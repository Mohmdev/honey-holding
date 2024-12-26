'use client'

import React from 'react'
import NextError from 'next/error'

import { Gutter } from '@components/Gutter'

export default function Error() {
  return (
    <Gutter>
      <h2>Something went wrong.</h2>
      <NextError statusCode={0} />
    </Gutter>
  )
}
