import React, { useEffect } from 'react'
import { DialogExtensionSDK } from 'contentful-ui-extensions-sdk'
import { useAutoResize } from '../hooks/useAutoResize'
import { Dump } from './Dump'

export const Dialog: React.FC<{ sdk: DialogExtensionSDK }> = ({ sdk }) => {
  useAutoResize(sdk)
  useEffect(() => {
    console.log('Dialog', sdk.parameters.invocation)
  }, [sdk.parameters])
  return <Dump sdk={sdk} />
}
