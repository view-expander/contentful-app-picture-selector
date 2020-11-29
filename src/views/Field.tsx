import { Button, Icon } from '@contentful/forma-36-react-components'
import { FieldExtensionSDK } from 'contentful-ui-extensions-sdk'
import React from 'react'
import styled from 'styled-components'
import { useAutoResize } from '../hooks/useAutoResize'

const ButtonLabel = styled.div`
  display: inline-flex;
  align-items: center;
  vertical-align: top;
`

export const Field: React.FC<{ sdk: FieldExtensionSDK }> = ({ sdk }) => {
  const onClickDialogOpener = (): Promise<void> =>
    sdk.dialogs
      .openCurrentApp({
        title: 'Picture Selector',
        width: 'medium',
      })
      .then(({ objectKey }: { objectKey: string }) => console.log(objectKey))

  useAutoResize(sdk)

  console.log('current value', sdk.field.getValue())

  return (
    <React.Fragment>
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
