'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Tabs } from './tabs'

interface DocsWrapperProps {
  activeKey: string
}

export const DocsWrapper: React.FC<DocsWrapperProps> = ({ activeKey }) => {
  const router = useRouter()
  const ActiveComponent = Tabs[activeKey]?.component || Tabs['getting-started'].component

  const handleDocChange = (key: string) => {
    router.push(`?doc=${key}`)
  }

  return (
    <div className="before-dashboard">
      <div className="before-dashboard__content">
        <aside className="before-dashboard__sidebar">
          <ul>
            {Object.entries(Tabs).map(([key, { title }]) => (
              <li
                key={key}
                onClick={() => handleDocChange(key)}
                className={`before-dashboard__sidebar-item ${
                  key === activeKey ? 'before-dashboard__sidebar-item--active' : ''
                }`}
              >
                {title}
              </li>
            ))}
          </ul>
        </aside>
        <div>
          <ActiveComponent />
        </div>
      </div>
    </div>
  )
}
