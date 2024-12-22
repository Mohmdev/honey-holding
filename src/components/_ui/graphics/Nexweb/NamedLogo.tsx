import * as React from 'react'

type Props = {
  className?: string
}
export const NamedLogo: React.FC<Props> = () => {
  return (
    <svg
      width="170"
      // height="63"
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 951 150"
    >
      <defs>
        <clipPath clipPathUnits="userSpaceOnUse" id="cp1">
          <path d="m150 0v150h-150v-150z" />
        </clipPath>
      </defs>
      <g id="Clip-Path" clip-path="url(#cp1)">
        <g>
          <path
            fill="var(--theme-elevation-900)"
            fill-rule="evenodd"
            d="m75 0h-75l75 75h-75l75 75h75l-75-75h75z"
          />
        </g>
      </g>
      <g id="Folder 1">
        <path
          fill="var(--theme-elevation-900)"
          id="NEXWEB"
          aria-label="NEXWEB"
          d="m294.7 6.9h-16.3v107.9h-1.3l-75-107.9h-16.1v137.1h16.6v-107.7h1.3l74.8 107.7h16zm33.2 137.1h83.9v-14.7h-67.3v-46.6h61.9v-14.7h-61.9v-46.4h66.2v-14.7h-82.8zm120.8-137.1h-19.5l44.2 68.5-44.2 68.6h19.5l35.4-56h1l35.4 56h19.5l-43.1-68.6 43.1-68.5h-19.5l-35.4 57h-1zm137.9 137.1h17.1l30.3-109.2h1.1l30.2 109.2h17.2l37.5-137.1h-16.9l-28.7 111.7h-1.3l-29.2-111.7h-18.7l-29.2 111.7h-1.4l-28.6-111.7h-16.9zm154 0h83.8v-14.7h-67.2v-46.6h61.8v-14.7h-61.8v-46.4h66.1v-14.7h-82.7zm112.7 0h49.6c32.4 0 45.8-15.8 45.8-36.4 0-21.7-15-33.5-27.6-34.3v-1.3c11.8-3.2 22.2-11 22.2-28.7 0-20.1-13.4-36.4-42-36.4h-48zm16.6-14.7v-47.7h33.8c17.9 0 29.2 12 29.2 26 0 12-8.3 21.7-30 21.7zm0-62.2v-45.5h31.3c18.2 0 26.2 9.6 26.2 21.7 0 14.5-11.7 23.8-26.7 23.8z"
        />
      </g>
    </svg>
  )
}
