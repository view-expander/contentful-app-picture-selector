import { KnownSDK } from 'contentful-ui-extensions-sdk'
import React from 'react'

export const Dump: React.FC<{ sdk: KnownSDK }> = ({ sdk }) => (
  <div>
    <pre>
      <code>{JSON.stringify(sdk, null, 2)}</code>
    </pre>
  </div>
)
