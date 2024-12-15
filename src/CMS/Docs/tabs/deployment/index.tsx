import React from 'react'

export const Deployment: React.FC = () => {
  return (
    <div>
      <h3>Deployment Guide</h3>
      <p>Follow these steps to deploy your Nexweb application:</p>

      <h4>Prerequisites</h4>
      <ul>
        <li>Node.js 16 or higher</li>
        <li>MongoDB instance</li>
        <li>Environment variables configured</li>
      </ul>

      <h4>Deployment Steps</h4>
      <ol>
        <li>Build your application</li>
        <li>Configure environment variables</li>
        <li>Set up your database</li>
        <li>Deploy to your hosting provider</li>
      </ol>
    </div>
  )
}
