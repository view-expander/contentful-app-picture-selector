import { DialogExtensionSDK } from 'contentful-ui-extensions-sdk'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FlexWrapper } from '../components'
import { PictureList } from '../components/PictureList'
import { useAutoResize } from '../hooks/useAutoResize'
import { sourceRepository } from '../repositories'
// import type { RepositoryResponseData } from '../repositories/types'

const SelectedPictureOnRight = styled(FlexWrapper)`
  flex: 0 0 160px;
`

// const fetchThumb = (key: string): RepositoryResponseData<ArrayBuffer> =>
//   sourceRepository.getThumb(key)

export const Dialog: React.FC<{ sdk: DialogExtensionSDK }> = ({ sdk }) => {
  const [itemList, setItemList] = useState<PictureItem[]>([])
  const [selectedItemList, setSelectedItemList] = useState<SelectedItemList>([])

  const onMountItem: onMountPictureItem = (key: string) =>
    console.log('<Dialog />', 'onMountItem() =>', key)

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      const res = await sourceRepository.list()
      setItemList(res.data.Contents.map(({ Key }) => ({ objectKey: Key })))
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
    <FlexWrapper>
      <PictureList onMountItem={onMountItem} items={itemList} />
      <SelectedPictureOnRight>
        <ul>
          {selectedItemList.map(({ key }) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
      </SelectedPictureOnRight>
    </FlexWrapper>
  )
}
