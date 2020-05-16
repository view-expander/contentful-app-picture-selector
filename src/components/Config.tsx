import type { AppExtensionSDK } from 'contentful-ui-extensions-sdk'
import React, { useEffect } from 'react'

export const Config: React.FC<{ sdk: AppExtensionSDK }> = ({ sdk }) => {
  useEffect(() => {
    sdk.app.setReady()
  })

  return <div>Hello, world!</div>
}
