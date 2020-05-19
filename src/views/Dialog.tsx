import React from 'react'
import { DialogExtensionSDK } from 'contentful-ui-extensions-sdk'
import { useAutoResize } from '../hooks/useAutoResize'
import { Dump } from './Dump'

export const Dialog: React.FC<{ sdk: DialogExtensionSDK }> = ({ sdk }) => {
  useAutoResize(sdk)
  return <Dump sdk={sdk} />
}
