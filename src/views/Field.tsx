import { FieldExtensionSDK } from 'contentful-ui-extensions-sdk'
import React, { useEffect, useState } from 'react'
import { Dump } from './Dump'

export const Field: React.FC<{ sdk: FieldExtensionSDK }> = ({ sdk }) => {
  const [pictureList, setPictureList] = useState<PictureList>({ items: [] })

  useEffect(() => {
    const value = sdk.field.getValue() as PictureList | undefined

    if (value === undefined) {
      return
    }

    setPictureList({
      ...pictureList,
      ...value,
    })
  })

  useEffect(() => {
    sdk.window.startAutoResizer()
    return () => sdk.window.stopAutoResizer()
  })

  return <Dump sdk={sdk} />
}
