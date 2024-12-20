import React from 'react'

import ReactMarkdown from 'react-markdown'
import remarkGFM from 'remark-gfm'

import { ReusableContent } from '@payload-types'

import Table from '@components/MDX/components/Table'

const components = {
  table: Table as any
}

const remarkPlugins = [remarkGFM]

type Props = Extract<
  ReusableContent['layout'][0],
  { blockType: 'blogMarkdown' }
>

const BlogMarkdown: React.FC<Props> = ({
  blogMarkdownFields: { markdown }
}) => {
  return (
    <ReactMarkdown remarkPlugins={remarkPlugins} components={components}>
      {markdown}
    </ReactMarkdown>
  )
}

export default BlogMarkdown
