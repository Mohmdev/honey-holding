'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import styles from './index.module.scss'
import { Tabs } from './tabs'

interface DocsViewProps {
  activeKey: string
}

export const DocsView: React.FC<DocsViewProps> = ({
  activeKey: initialKey
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeKey, setActiveKey] = React.useState(initialKey)

  const ActiveComponent =
    Tabs[activeKey]?.component || Tabs['getting-started'].component

  const handleDocChange = (key: string) => {
    setActiveKey(key)
    const params = new URLSearchParams(searchParams.toString())
    params.set('doc', key)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className={styles.docsContainer}>
      <nav className={styles.nav}>
        <ul className={styles.tabsList}>
          {Object.entries(Tabs).map(([key, { title }]) => (
            <li
              key={key}
              onClick={() => handleDocChange(key)}
              className={`${styles.tabItem} ${key === activeKey ? styles.active : ''}`}
            >
              {title}
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.content}>
        <ActiveComponent />
      </div>
    </div>
  )
}
