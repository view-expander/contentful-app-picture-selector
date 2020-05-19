import { FieldExtensionSDK } from 'contentful-ui-extensions-sdk'
import React from 'react'
import { Dump } from './Dump'

export const Field: React.FC<{ sdk: FieldExtensionSDK }> = ({ sdk }) => {
  console.log(sdk.field.getValue())
  return <Dump sdk={sdk} />
}
