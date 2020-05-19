import { FieldExtensionSDK } from 'contentful-ui-extensions-sdk'
import React, { useEffect, useState } from 'react'
import { useAutoResize } from '../hooks/useAutoResize'

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
  }, [pictureList, pictureList.items, sdk.field])

  useAutoResize(sdk)

  return (
    <ul>
      {pictureList.items.map(({ key }) => (
        <li key={key}>{key}</li>
      ))}
    </ul>
  )
}
