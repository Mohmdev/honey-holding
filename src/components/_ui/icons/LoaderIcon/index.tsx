import React from 'react'

import { IconProps } from '../types'

import classes from '../index.module.scss'

export const LoaderIcon: React.FC<IconProps> = (props) => {
  const { size, className } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={[
        className,
        classes.icon,
        classes.spinning,
        size && classes[size]
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.72962 3.7297C3.92488 3.53444 4.24146 3.53444 4.43672 3.7297L6.85339 6.14637C7.04865 6.34163 7.04865 6.65821 6.85339 6.85347C6.65813 7.04873 6.34155 7.04873 6.14628 6.85347L3.72962 4.43681C3.53436 4.24154 3.53436 3.92496 3.72962 3.7297ZM16.2701 3.7297C16.4653 3.92496 16.4653 4.24154 16.2701 4.43681L13.8534 6.85347C13.6581 7.04873 13.3415 7.04873 13.1463 6.85347C12.951 6.65821 12.951 6.34163 13.1463 6.14637L15.563 3.7297C15.7582 3.53444 16.0748 3.53444 16.2701 3.7297ZM1.1665 9.99992C1.1665 9.72378 1.39036 9.49992 1.6665 9.49992H4.99984C5.27598 9.49992 5.49984 9.72378 5.49984 9.99992C5.49984 10.2761 5.27598 10.4999 4.99984 10.4999H1.6665C1.39036 10.4999 1.1665 10.2761 1.1665 9.99992ZM14.4998 9.99992C14.4998 9.72378 14.7237 9.49992 14.9998 9.49992H18.3332C18.6093 9.49992 18.8332 9.72378 18.8332 9.99992C18.8332 10.2761 18.6093 10.4999 18.3332 10.4999H14.9998C14.7237 10.4999 14.4998 10.2761 14.4998 9.99992ZM6.85339 13.1464C7.04865 13.3416 7.04865 13.6582 6.85339 13.8535L4.43672 16.2701C4.24146 16.4654 3.92488 16.4654 3.72962 16.2701C3.53436 16.0749 3.53436 15.7583 3.72962 15.563L6.14628 13.1464C6.34155 12.9511 6.65813 12.9511 6.85339 13.1464ZM13.1463 13.1464C13.3415 12.9511 13.6581 12.9511 13.8534 13.1464L16.2701 15.563C16.4653 15.7583 16.4653 16.0749 16.2701 16.2701C16.0748 16.4654 15.7582 16.4654 15.563 16.2701L13.1463 13.8535C12.951 13.6582 12.951 13.3416 13.1463 13.1464ZM9.99984 14.4999C10.276 14.4999 10.4998 14.7238 10.4998 14.9999V18.3333C10.4998 18.6094 10.276 18.8333 9.99984 18.8333C9.72369 18.8333 9.49984 18.6094 9.49984 18.3333V14.9999C9.49984 14.7238 9.72369 14.4999 9.99984 14.4999Z"
        fill="currentColor"
        fillOpacity="0.5"
      />
      <path
        d="M10 1.16675C10.2761 1.16675 10.5 1.39061 10.5 1.66675V5.00008C10.5 5.27622 10.2761 5.50008 10 5.50008C9.72386 5.50008 9.5 5.27622 9.5 5.00008V1.66675C9.5 1.39061 9.72386 1.16675 10 1.16675Z"
        fill="currentColor"
      />
    </svg>
  )
}