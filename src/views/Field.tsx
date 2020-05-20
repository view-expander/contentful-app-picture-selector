import { Button, Icon } from '@contentful/forma-36-react-components'
import { FieldExtensionSDK } from 'contentful-ui-extensions-sdk'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAutoResize } from '../hooks/useAutoResize'

const ButtonLabel = styled.div`
  display: inline-flex;
  align-items: center;
  vertical-align: top;
`

export const Field: React.FC<{ sdk: FieldExtensionSDK }> = ({ sdk }) => {
  const [selectedItemList, setSelectedItemList] = useState<SelectedItemList>([])
  const onClickDialogOpener = (): Promise<void> =>
    sdk.dialogs.openCurrentApp({
      title: 'Picture Selector',
      width: 'large',
      parameters: sdk.field.getValue(),
    })

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
        <ButtonLabel>
          <Icon color="muted" icon="Asset" />
          &nbsp;
          <span>Select pictures</span>
        </ButtonLabel>
      </Button>
    </React.Fragment>
  )
}
