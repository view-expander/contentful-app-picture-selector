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

const useItems = (keys: ItemList): [Item[]] => {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    Promise.all(
      keys.map(async (key) => {
        const res = await sourceRepository.getObjectThumb(key)
        const img = await createImage(res.data, res.headers['content-type'])

        return {
          objectKey: key,
          img,
        }
      })
    ).then((items: Item[]) => setItems(items))
  }, [keys])

  return [items]
}

export const Field: React.FC<{ sdk: FieldExtensionSDK }> = ({ sdk }) => {
  const [value, pushValue, removeValue] = useFieldValue(sdk)
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
        .then(({ height, objectKey, width }: DialogResponse) => {
          console.log(width, height)
          return pushValue(objectKey)
        }),
    [sdk, pushValue]
  )

  useAutoResize(sdk)

  return (
    <React.Fragment>
      <SelectedList items={items} onClickItem={onClickSelectedItem} />
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
