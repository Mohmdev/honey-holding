import React from 'react'

import { Page } from '@payload-types'

import { BackgroundGrid } from '@components/Background/Grid'
import { BlockWrapper } from '@components/BlockWrapper'
import { Gutter } from '@components/Gutter'

import classes from './index.module.scss'
import { Step } from './Step'

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
