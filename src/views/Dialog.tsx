import React, { useEffect, useState } from 'react'
import { DialogExtensionSDK } from 'contentful-ui-extensions-sdk'
import { useAutoResize } from '../hooks/useAutoResize'
import { Dump } from './Dump'

export const Dialog: React.FC<{ sdk: DialogExtensionSDK }> = ({ sdk }) => {
  const [selectedItemList, setSelectedItemList] = useState<SelectedItemList>([])

  useEffect(() => {
    const value = sdk.parameters.invocation as { items?: SelectedItemList }
    console.log('Dialog', value)

    if (value.items == undefined) {
      return
    }

    setSelectedItemList(value.items)
  }, [sdk.parameters])

  useAutoResize(sdk)

  return <Dump sdk={sdk} />
}
