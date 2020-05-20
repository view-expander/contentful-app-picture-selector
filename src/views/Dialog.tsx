import { DialogExtensionSDK } from 'contentful-ui-extensions-sdk'
import React, { useEffect, useState } from 'react'
import { useAutoResize } from '../hooks/useAutoResize'
import { RepositoryFactory } from '../repositories'
const sourceRepository = RepositoryFactory.get('source')

export const Dialog: React.FC<{ sdk: DialogExtensionSDK }> = ({ sdk }) => {
  const [itemList, setItemList] = useState<SourceRepository.ListItem[]>([])
  const [, setSelectedItemList] = useState<SelectedItemList>([])

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      const res = await sourceRepository.list()
      console.log('res', res)
      setItemList(res.data.Contents)
    }

    fetch()
  }, [])

  useEffect(() => {
    const value = sdk.parameters.invocation as { items?: SelectedItemList }

    if (value.items === undefined) {
      return
    }

    setSelectedItemList(value.items)
  }, [sdk.parameters])

  useAutoResize(sdk)

  return (
    <ul>
      {itemList.map(({ Key }) => (
        <li key={Key}>{Key}</li>
      ))}
    </ul>
  )
}
