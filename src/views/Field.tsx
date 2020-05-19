import { FieldExtensionSDK } from 'contentful-ui-extensions-sdk'
import React from 'react'
import { HelloWord } from './HelloWorld'

export const Field: React.FC<{ sdk: FieldExtensionSDK }> = ({ sdk }) => {
  console.log(sdk.field.getValue())
  return <HelloWord />
}
