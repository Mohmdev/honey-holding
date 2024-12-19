import React from 'react'

import { ReusableContent } from '@payload-typess'

import { Gutter } from '@components/Gutter'
import { RichText } from '@components/RichText'

type Props = Extract<ReusableContent['layout'][0], { blockType: 'blogContent' }>

export const BlogContent: React.FC<Props & { disableGutter: boolean }> = ({
  blogContentFields,
  disableGutter
}) => {
  return (
    <>
      {disableGutter ? (
        <RichText content={blogContentFields.richText} />
      ) : (
        <Gutter>
          <RichText content={blogContentFields.richText} />
        </Gutter>
      )}
    </>
  )
}
