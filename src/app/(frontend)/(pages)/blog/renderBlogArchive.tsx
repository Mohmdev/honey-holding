'use client'

import React from 'react'

import { Post } from '@payload-types'

import { BackgroundGrid } from '@components/Background/Grid'
import { BlockSpacing } from '@components/BlockSpacing'
import { BlockWrapper } from '@components/BlockWrapper'
import { ContentMediaCard } from '@components/cards/ContentMediaCard'
import { FeaturedBlogPost } from '@components/FeaturedBlogPost'
import { Gutter } from '@components/Gutter'

import classes from './index.module.scss'

export const RenderBlogArchive: React.FC<{ posts: Partial<Post>[] }> = ({
  posts
}) => {
  const latestPost = posts[0]
  return (
    <React.Fragment>
      <BlockWrapper settings={{}} padding={{ top: 'hero', bottom: 'large' }}>
        <BackgroundGrid zIndex={0} />
        <Gutter>
          <div className={[classes.hero].filter(Boolean).join(' ')}>
            <div>
              <h1 className={[classes.pageTitle].filter(Boolean).join(' ')}>
                Blog
              </h1>
            </div>
            <div
              className={[classes.heroContent, 'grid']
                .filter(Boolean)
                .join(' ')}
            >
              <h2
                className={[classes.title, 'cols-8 cols-m-8']
                  .filter(Boolean)
                  .join(' ')}
              >
                Keep tabs on Nexweb
              </h2>
              <p
                className={[
                  classes.description,
                  'cols-4 start-13 start-m-1 cols-m-8'
                ]
                  .filter(Boolean)
                  .join(' ')}
              >{`Here, you’ll find news about feature releases, happenings in the industry, and Nexweb announcements in general.`}</p>
            </div>
          </div>

          <FeaturedBlogPost {...latestPost} />
          <div className={[classes.cardGrid, 'grid'].filter(Boolean).join(' ')}>
            {(posts || []).slice(1).map((blogPost) => {
              const { id, title, publishedOn, slug, image, authors } = blogPost

              if (
                !id ||
                !title ||
                !publishedOn ||
                !slug ||
                !image ||
                !authors
              ) {
                return null
              }

              return (
                <div
                  key={id}
                  className={['cols-8 cols-m-8'].filter(Boolean).join(' ')}
                >
                  <ContentMediaCard
                    title={title}
                    publishedOn={publishedOn}
                    href={`/blog/${slug}`}
                    media={image}
                    authors={authors}
                  />
                </div>
              )
            })}
          </div>
        </Gutter>
      </BlockWrapper>
    </React.Fragment>
  )
}

export default RenderBlogArchive
