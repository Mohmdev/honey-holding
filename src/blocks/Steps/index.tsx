import React from 'react'

import { Page } from '@payload-types.js'

import { BackgroundGrid } from '@components/BackgroundGrid/index.js'
import { BlockWrapper } from '@components/BlockWrapper/index.js'
import { Gutter } from '@components/Gutter'

import classes from './index.module.scss'
import { Step } from './Step/index.js'

type Props = Extract<Page['layout'][0], { blockType: 'steps' }>

export const Steps: React.FC<Props> = ({ stepsFields }) => {
  const { steps, settings } = stepsFields

  return (
    <BlockWrapper settings={settings}>
      <Gutter>
        <ul className={classes.steps}>
          {steps.map((step, i) => {
            return <Step key={step.id} i={i} step={step} />
          })}
        </ul>
        <BackgroundGrid />
      </Gutter>
    </BlockWrapper>
  )
}
