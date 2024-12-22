import * as React from 'react'

export const SquareLogo: React.FC = () => {
  return (
    <svg
      width="100%"
      fill="none"
      height="96"
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="a">
        <path d="m0 0h96v96h-96z" />
      </clipPath>
      <g clip-path="url(#a)">
        <path
          clip-rule="evenodd"
          d="m48 0h-48l48 48h-48l48 48h48l-48-48h48z"
          fill="var(--theme-elevation-1000)"
          fill-rule="evenodd"
        />
      </g>
    </svg>
  )
}
