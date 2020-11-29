import { Button, Icon } from '@contentful/forma-36-react-components'
import { FieldExtensionSDK } from 'contentful-ui-extensions-sdk'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useAutoResize } from '../hooks/useAutoResize'
import { useFieldValue } from '../hooks/useFieldValue'

const ButtonLabel = styled.div`
  display: inline-flex;
  align-items: center;
  vertical-align: top;
`

export const Field: React.FC<{ sdk: FieldExtensionSDK }> = ({ sdk }) => {
  const [value, pushValue] = useFieldValue(sdk)
  const onClickDialogOpener = useCallback(
    () =>
      sdk.dialogs
        .openCurrentApp({
          title: 'Picture Selector',
          width: 'medium',
        })
        .then(({ objectKey }: { objectKey: string }) => pushValue(objectKey)),
    [sdk, pushValue]
  )

  useAutoResize(sdk)

  console.log('value', value)

  return (
    <React.Fragment>
      <ul>
        {value.map((key) => (
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
