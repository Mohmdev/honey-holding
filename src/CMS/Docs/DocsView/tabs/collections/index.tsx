import React from 'react'

export const Collections: React.FC = () => {
  return (
    <div>
      <h3>Working with Collections</h3>
      <p>Collections are the foundation of your content structure in Nexweb.</p>

      <h4>Key Concepts</h4>
      <ul>
        <li>Collection Configuration</li>
        <li>Fields and Validations</li>
        <li>Access Control</li>
      </ul>

      <h4>Basic Example</h4>
      <pre>
        <code>{`export const Posts: CollectionConfig = {
  slug: 'posts',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    }
  ]
}`}</code>
      </pre>
    </div>
  )
}
