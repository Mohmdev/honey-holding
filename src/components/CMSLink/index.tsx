import React from 'react'
import Link from 'next/link'

import { getServerSideURL } from '@utils/getURL'

import type { Page, Portfolio, Post } from '@payload-types'

import { Button, ButtonProps } from '@components/ButtonComponent'

const relationSlugs = {
  portfolio: 'portfolio'
}

type PageReference = {
  value: number | Page
  relationTo: 'pages'
}

type PostsReference = {
  value: number | Post
  relationTo: 'posts'
}

type PortfolioReference = {
  value: number | Portfolio
  relationTo: (typeof relationSlugs)['portfolio']
}

export type LinkType = 'reference' | 'custom' | null
export type Reference =
  | PageReference
  | PostsReference
  | PortfolioReference
  | null

export type CMSLinkType = {
  type?: LinkType | null
  newTab?: boolean | null
  reference?: Reference | null
  customId?: string | null
  url?: string | null
  label?: string | null
  appearance?: 'default' | 'primary' | 'secondary' | 'text' | null
  children?: React.ReactNode
  fullWidth?: boolean
  mobileFullWidth?: boolean
  className?: string
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  buttonProps?: ButtonProps
}

type GenerateSlugType = {
  type?: LinkType | null
  url?: string | null
  reference?: Reference | null
}
const generateHref = (args: GenerateSlugType): string => {
  const { reference, url, type } = args

  if ((type === 'custom' || type === undefined) && url) {
    return url
  }

  // TODO: Refactor the hardcoded slugs to become dynamic

  if (type === 'reference' && reference?.value) {
    // Check both number and object types
    if (typeof reference.value === 'number') {
      // Handle ID-only case (when value is just the ID number)
      return `/${reference.relationTo}/${reference.value}`
    }

    // Handle populated reference case (when value is the full object)
    if (typeof reference.value === 'object') {
      if (reference.relationTo === 'pages') {
        const value = reference.value as Page
        const breadcrumbs = value?.breadcrumbs
        const hasBreadcrumbs =
          breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0
        if (hasBreadcrumbs) {
          return breadcrumbs[breadcrumbs.length - 1]?.url as string
        }
      }

      if (reference.relationTo === 'posts') {
        return `/blog/${reference.value.slug}`
      }

      if (reference.relationTo === 'portfolio') {
        return `/portfolio/${reference.value.slug}`
      }

      return `/${reference.relationTo}/${reference.value.slug}`
    }
  }

  return ''
}

export const CMSLink: React.FC<CMSLinkType> = ({
  type,
  url,
  newTab,
  reference,
  customId,
  label,
  appearance,
  children,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  fullWidth = false,
  mobileFullWidth = false,
  buttonProps: buttonPropsFromProps
}) => {
  let href = generateHref({ type, url, reference })

  if (!href) {
    return (
      <span
        className={className}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        id={customId ?? ''}
      >
        {label}
        {children}
      </span>
    )
  }

  if (!appearance) {
    const hrefIsLocal = ['tel:', 'mailto:', '/'].some((prefix) =>
      href.startsWith(prefix)
    )

    if (!hrefIsLocal && href !== '#') {
      try {
        const objectURL = new URL(href)
        if (objectURL.origin === getServerSideURL()) {
          href = objectURL.href.replace(getServerSideURL(), '')
        }
      } catch (e) {
        // Do not throw error if URL is invalid
        // This will prevent the page from building
        console.log(`Failed to format url: ${href}`, e)
      }
    }

    const newTabProps = newTab
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {}

    if (href.indexOf('/') === 0) {
      return (
        <Link
          href={href}
          {...newTabProps}
          className={className}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          prefetch={false}
          id={customId ?? ''}
        >
          {label && label}
          {children && children}
        </Link>
      )
    }

    return (
      <a
        href={href}
        {...newTabProps}
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        id={customId ?? ''}
      >
        {label && label}
        {children && children}
      </a>
    )
  }

  const buttonProps: ButtonProps = {
    ...buttonPropsFromProps,
    newTab,
    href,
    appearance,
    label,
    onClick,
    onMouseEnter,
    onMouseLeave,
    fullWidth,
    mobileFullWidth
  }

  if (appearance === 'default') {
    buttonProps.icon = 'arrow'
  }

  return (
    <Button
      {...buttonProps}
      className={className}
      el="link"
      id={customId ?? ''}
    />
  )
}
