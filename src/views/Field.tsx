import { Button, Icon } from '@contentful/forma-36-react-components'
import { FieldExtensionSDK } from 'contentful-ui-extensions-sdk'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { SelectedList } from '../components/SelectedList'
import { useAutoResize } from '../hooks/useAutoResize'
import { useFieldValue } from '../hooks/useFieldValue'
import { sourceRepository } from '../repositories'
import { createImage } from '../utilities/create-image'

type DialogResponse = {
  height: number | undefined
  objectKey: string
  width: number | undefined
}

const ButtonToAdd = styled(Button)`
  margin-top: 1rem;
`

const ButtonLabel = styled.div`
  display: inline-flex;
  align-items: center;
  vertical-align: top;
`

const useItems = (keys: ItemList): [PreviewItem[]] => {
  const [items, setItems] = useState<PreviewItem[]>([])

  useEffect(() => {
    Promise.all(
      keys.map(async ({ featured, key }) => {
        const res = await sourceRepository.getObjectThumb(key)
        const img = await createImage(res.data, res.headers['content-type'])

        return {
          objectKey: key,
          img,
        }
      })
    ).then((items: PreviewItem[]) => setItems(items))
  }, [keys])

  return [items]
}

export const Field: React.FC<{ sdk: FieldExtensionSDK }> = ({ sdk }) => {
  const [value, pushValue, removeValue, setFeaturedItem] = useFieldValue(sdk)
  const [items] = useItems(value)
  const onClickSelectedItem: ItemClickHandler = useCallback(removeValue, [
    removeValue,
  ])
  const onClickDialogOpener = useCallback(
    () =>
      sdk.dialogs
        .openCurrentApp({
          title: 'Picture Selector',
          width: 'medium',
        })
        .then(async ({ objectKey }: Pick<DialogResponse, 'objectKey'>) => {
          const res = await sourceRepository.getObjectMeta(objectKey)
          const { PixelHeight, PixelWidth } = res.data

          return pushValue({
            featured: items.length === 0,
            height: PixelHeight || 0,
            key: objectKey,
            width: PixelWidth || 0,
          })
        }),
    [sdk, pushValue, items]
  )
  const onChangeFeatured = useCallback(setFeaturedItem, [setFeaturedItem])

  useAutoResize(sdk)

  return (
    <React.Fragment>
      <SelectedList
        items={items}
        onClickItem={onClickSelectedItem}
        onChangeFeatured={onChangeFeatured}
      />
      <ButtonToAdd
        buttonType="muted"
        size="small"
        onClick={onClickDialogOpener}
      >
        <ButtonLabel>
          <Icon color="muted" icon="Asset" />
          &nbsp;
          <span>Add a picture</span>
        </ButtonLabel>
      </ButtonToAdd>
    </React.Fragment>
  )
}
