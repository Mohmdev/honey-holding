import React, { Fragment } from 'react'

import { ArchiveBlock } from '@blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@blocks/CallToAction/Component'
import { ContentBlock } from '@blocks/Content/Component'
import { FormBlock } from '@blocks/Form/Component'
import { MediaBlock } from '@blocks/MediaBlock/Component'

// First, define interfaces for each block type
interface BaseBlock {
  blockType: string
  id?: string
}

interface BlockComponents {
  archive: typeof ArchiveBlock
  content: typeof ContentBlock
  cta: typeof CallToActionBlock
  formBlock: typeof FormBlock
  mediaBlock: typeof MediaBlock
}

const blockComponents: BlockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock
}

type BlockType = keyof typeof blockComponents

// Type guard to ensure block type exists in components
function isValidBlockType(blockType: unknown): blockType is BlockType {
  return typeof blockType === 'string' && blockType in blockComponents
}

export const RenderBlocks: React.FC<{
  blocks: (BaseBlock & Record<string, unknown>)[]
}> = ({ blocks }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        if (!isValidBlockType(block.blockType)) return null

        const Block = blockComponents[block.blockType]

        // Type assertion to tell TypeScript this is safe
        return (
          <div className="my-16" key={index}>
            <Block {...(block as any)} />
          </div>
        )
      })}
    </Fragment>
  )
}
