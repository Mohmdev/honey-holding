'use client'

import React from 'react'

import { useModal } from '@faceless-ui/modal'

import { Button } from '@components/ButtonComponent'

import { deletePlanModalSlug } from '../DeletePlanModal'

export const DeletePlanButton: React.FC = () => {
  const { openModal } = useModal()

  return (
    <Button
      appearance="danger"
      label="Delete"
      onClick={() => openModal(deletePlanModalSlug)}
    />
  )
}
