import { Button } from '@contentful/forma-36-react-components'
import { FieldExtensionSDK } from 'contentful-ui-extensions-sdk'
import React, { useEffect, useState } from 'react'
import { useAutoResize } from '../hooks/useAutoResize'

export const Field: React.FC<{ sdk: FieldExtensionSDK }> = ({ sdk }) => {
  const [selectedItemList, setSelectedItemList] = useState<SelectedItemList>([])
  const onClickDialogOpener = (): Promise<void> =>
    sdk.field.setValue({ items: selectedItemList }).then(() =>
      sdk.dialogs.openCurrentApp({
        title: 'Picture Selector',
        width: 'large',
      })
    )

  useEffect(() => {
    const value = sdk.field.getValue() as
      | { items: SelectedItemList }
      | undefined

    if (value === undefined) {
      return
    }

    setSelectedItemList(value.items)
  }, [selectedItemList, sdk.field])

  useAutoResize(sdk)

  return (
    <React.Fragment>
      <ul>
        {selectedItemList.map(({ key }) => (
          <li key={key}>{key}</li>
        ))}
      </ul>
      <Button buttonType="muted" size="small" onClick={onClickDialogOpener}>
        Add pictures
      </Button>
    </React.Fragment>
  )
}
