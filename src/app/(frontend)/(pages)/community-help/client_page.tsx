'use client'

import React from 'react'
import Link from 'next/link'

import { Cell, Grid } from '@faceless-ui/css-grid'

// import { AlgoliaPagination } from '@adapters/AlgoliaPagination'
// import { useInstantSearch } from 'react-instantsearch'

import getRelativeDate from '@utils/get-relative-date'

import { CommentsIcon } from '@graphics/CommentsIcon'
import { DiscordIcon } from '@graphics/DiscordIcon'
import { GithubIcon } from '@graphics/GithubIcon'
import { ArrowIcon } from '@icons/ArrowIcon'
import { BackgroundGrid } from '@components/Background/Grid'
import { Banner } from '@components/Banner'
import { DiscordGitCTA } from '@components/DiscordGitCTA'
import { Gutter } from '@components/Gutter'
import { Heading } from '@components/Heading'

import { AlgoliaProvider } from './AlgoliaProvider'
import { ArchiveSearchBar } from './ArchiveSearchBar'
import classes from './index.module.scss'

export const CommunityHelp: React.FC = () => {
  // const { results } = useInstantSearch()

  // const hasResults =
  //   results.hits && Array.isArray(results.hits) && results.hits.length > 0

  // const hasQuery = results.query && results.query.length > 0

  return (
    <div className={classes.communityHelpWrap}>
      <BackgroundGrid className={classes.bg} />
      <Gutter>
        <div className={['grid', classes.grid].join(' ')}>
          <div className="start-1 cols-12">
            <Heading className={classes.heading} element="h1">
              Community Help
            </Heading>
            <div className={classes.searchBarWrap}>
              <ArchiveSearchBar className={classes.searchBar} />
            </div>
            <h3>Under Development...</h3>
            {/* {hasResults && (
              <ul className={classes.postsWrap}>
                {hasResults &&
                  results.hits.map((hit, i) => {
                    const { name, slug, author, createdAt, platform } = hit
                    return (
                      <li className={classes.post} key={i}>
                        <Link
                          className={classes.postContent}
                          href={`/community-help/${platform.toLowerCase()}/${slug}`}
                          prefetch={false}
                          style={{ textDecoration: 'none' }}
                        >
                          <div>
                            <h5 className={classes.title}>{name}</h5>
                            <div className={classes.titleMeta}>
                              <span className={classes.platform}>
                                {platform === 'Discord' && (
                                  <DiscordIcon className={classes.icon} />
                                )}
                                {platform === 'Github' && (
                                  <GithubIcon className={classes.icon} />
                                )}
                              </span>
                              <span className={classes.author}>{author}</span>
                              <span>—</span>
                              <span className={classes.date}>
                                &nbsp;{getRelativeDate(createdAt)}
                              </span>
                            </div>
                          </div>
                          <div className={classes.upvotes}>
                            {hit.upvotes > 0 && (
                              <span>
                                <ArrowIcon rotation={-45} /> {hit.upvotes || ''}
                              </span>
                            )}
                            {hit.messageCount > 0 && (
                              <span>
                                <CommentsIcon /> {hit.messageCount}
                              </span>
                            )}
                          </div>
                        </Link>
                      </li>
                    )
                  })}
              </ul>
            )}
            {!hasResults && hasQuery && (
              <React.Fragment>
                <Banner type="warning">
                  <h5>Sorry, no results were found...</h5>
                  <span>Search tips</span>
                  <ul>
                    <li>Make sure all words are spelled correctly</li>
                    <li>Try more general keywords</li>
                    <li>Try different keywords</li>
                  </ul>
                </Banner>
              </React.Fragment>
            )}
            {hasResults && <AlgoliaPagination className={classes.pagination} />} */}
          </div>
          <div className={['start-13 cols-4', classes.ctaWrap].join(' ')}>
            <DiscordGitCTA appearance="default" />
          </div>
        </div>
      </Gutter>
    </div>
  )
}

export const CommunityHelpPage = () => {
  return (
    <AlgoliaProvider>
      <CommunityHelp />
    </AlgoliaProvider>
  )
}
