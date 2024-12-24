'use client'

import React, { useCallback, useEffect, useId, useMemo, useState } from 'react'

import { useModal } from '@faceless-ui/modal'

import { Drawer, DrawerToggler } from '@components/Drawer'

import { TeamDrawerContent } from './DrawerContent'
import { TeamDrawerProps, TeamDrawerTogglerProps, UseTeamDrawer } from './types'

const formatTeamDrawerSlug = ({
  uuid
}: {
  uuid: string // supply when creating a new document and no id is available
}) => `team-drawer_${uuid}`

export const TeamDrawerToggler: React.FC<TeamDrawerTogglerProps> = ({
  children,
  className,
  drawerSlug,
  disabled,
  ...rest
}) => {
  return (
    <DrawerToggler
      slug={drawerSlug || ''}
      className={className}
      disabled={disabled}
      {...rest}
    >
      {children}
    </DrawerToggler>
  )
}
TeamDrawerToggler.displayName = 'TeamDrawerToggler'

export const TeamDrawer: React.FC<TeamDrawerProps> = (props) => {
  const { drawerSlug } = props

  return (
    <Drawer slug={drawerSlug || ''} title="Create Team">
      <TeamDrawerContent {...props} />
    </Drawer>
  )
}

export const useTeamDrawer: UseTeamDrawer = ({ team } = {}) => {
  const uuid = useId()
  const { modalState, toggleModal, closeModal, openModal } = useModal()
  const [isOpen, setIsOpen] = useState(false)
  const drawerSlug = formatTeamDrawerSlug({
    uuid
  })

  useEffect(() => {
    setIsOpen(Boolean(modalState[drawerSlug]?.isOpen))
  }, [modalState, drawerSlug])

  const toggleDrawer = useCallback(() => {
    toggleModal(drawerSlug)
  }, [toggleModal, drawerSlug])

  const closeDrawer = useCallback(() => {
    closeModal(drawerSlug)
  }, [drawerSlug, closeModal])

  const openDrawer = useCallback(() => {
    openModal(drawerSlug)
  }, [drawerSlug, openModal])

  const MemoizedDrawer = useMemo(() => {
    const DrawerComponent = (props) => (
      <TeamDrawer
        {...props}
        drawerSlug={drawerSlug}
        closeDrawer={closeDrawer}
        key={drawerSlug}
        team={team}
      />
    )
    DrawerComponent.displayName = 'MemoizedTeamDrawer'
    return DrawerComponent
  }, [drawerSlug, closeDrawer, team])

  const MemoizedDrawerToggler = useMemo(() => {
    const TogglerComponent = (props) => (
      <TeamDrawerToggler {...props} drawerSlug={drawerSlug} />
    )
    TogglerComponent.displayName = 'MemoizedTeamDrawerToggler'
    return TogglerComponent
  }, [drawerSlug])

  const MemoizedDrawerState = useMemo(
    () => ({
      drawerSlug,
      isDrawerOpen: isOpen,
      toggleDrawer,
      closeDrawer,
      openDrawer
    }),
    [drawerSlug, isOpen, toggleDrawer, closeDrawer, openDrawer]
  )

  return [MemoizedDrawer, MemoizedDrawerToggler, MemoizedDrawerState]
}
