import type { AppExtensionSDK } from 'contentful-ui-extensions-sdk'
import React, { useEffect } from 'react'
import { HelloWord } from './HelloWorld'

export const Config: React.FC<{ sdk: AppExtensionSDK }> = ({ sdk }) => {
  useEffect(() => {
    sdk.app.setReady()
  })

  return <HelloWord sdk={sdk} />
}
