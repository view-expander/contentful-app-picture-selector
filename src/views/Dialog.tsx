import { DialogExtensionSDK } from 'contentful-ui-extensions-sdk'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FlexWrapper } from '../components'
import { PictureList } from '../components/PictureList'
import { useAutoResize } from '../hooks/useAutoResize'
import { PromisifiedAxiosResponse, RepositoryFactory } from '../repositories'

const sourceRepository = RepositoryFactory.get('source')

const SelectedPictureOnRight = styled(FlexWrapper)`
  flex: 0 0 160px;
`

const fetchThumb = (key: string): PromisifiedAxiosResponse<ArrayBuffer> =>
  sourceRepository.getThumb(key)

export const Dialog: React.FC<{ sdk: DialogExtensionSDK }> = ({ sdk }) => {
  const [itemList, setItemList] = useState<SourceRepository.ListItem[]>([])
  const [selectedItemList, setSelectedItemList] = useState<SelectedItemList>([])

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
    <FlexWrapper>
      <PictureList fetchThumb={fetchThumb} items={itemList} />
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
