'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useMouseInfo } from '@faceless-ui/mouse-info'

import { getClientSideURL } from '@utils/getURL'

import { Portfolio, ReusableContent } from '@payload-types'

import { PayloadIcon } from '@graphics/PayloadIcon'
import { Gutter } from '@components/Gutter'
import { RichText } from '@components/RichText'

import classes from './index.module.scss'

type Props = Extract<
  ReusableContent['layout'][0],
  { blockType: 'portfolioHighlight' }
>

export const PortfolioHighlightBlock: React.FC<Props> = ({
  portfolioHighlightFields: { richText, portfolio: allPortfolio }
}) => {
  const { xPercentage } = useMouseInfo()

  const [portfolioRows] = useState(() => {
    const portfolio: Portfolio[] = [...(allPortfolio as Portfolio[])]

    let i = 0

    while (portfolio.length < 6) {
      portfolio.push(portfolio[i])
      i += 1
    }

    const rows: Portfolio[][] = []

    for (let n = 0; n < portfolio.length; n += 3) {
      rows.push((portfolio as Portfolio[]).slice(n, n + 3))
    }

    return rows
  })

  return (
    <React.Fragment>
      <Gutter>
        <RichText className={classes.content} content={richText} />
      </Gutter>
      <div className={classes.wrap}>
        <div className={classes.poweredByPayload}>
          <div className={classes.poweredByPayloadInner}>
            <PayloadIcon />
            Powered by Payload
          </div>
        </div>
        <div
          className={classes.inner}
          style={{
            transform: `translate3d(${(xPercentage - 50) * -0.1}%, 0, 0)`
          }}
        >
          <div data-theme="darks">
            {portfolioRows.map((row, i) => {
              return (
                <ul key={i} className={classes.row}>
                  {row.map((portfolio) => {
                    const { slug, featuredImage } = portfolio

                    let url
                    let alt

                    if (
                      typeof featuredImage === 'object' &&
                      featuredImage !== null
                    ) {
                      url = featuredImage.url
                      alt = featuredImage.alt
                    }

                    return (
                      <li key={slug} className={classes.imageWrap}>
                        <Link
                          href={`/portfolio/${slug}`}
                          className={classes.image}
                          prefetch={false}
                        >
                          <Image
                            src={`${getClientSideURL()}${url}`}
                            fill
                            alt={alt}
                          />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
