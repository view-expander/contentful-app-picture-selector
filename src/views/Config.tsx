import { Form, Heading, TextField } from '@contentful/forma-36-react-components'
import type { AppExtensionSDK } from 'contentful-ui-extensions-sdk'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

type DraftAppConfig = {
  [K in keyof AppConfig]: AppConfig[K] | undefined
}

type InputEventHandler = (ev: React.ChangeEvent<HTMLInputElement>) => void

const ConfigForm = styled(Form)`
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
`

export const Config: React.FC<{ sdk: AppExtensionSDK }> = ({ sdk }) => {
  const [parameters, setParameters] = useState<DraftAppConfig>({
    apiPath: undefined,
    contentTypeId: undefined,
    fieldId: undefined,
  })

  const onChangeApiPath: InputEventHandler = (ev) =>
    setParameters({
      ...parameters,
      apiPath: ev.target.value,
    })
  const onChangeContentTypeId: InputEventHandler = (ev) =>
    setParameters({
      ...parameters,
      contentTypeId: ev.target.value,
    })
  const onChangeFieldId: InputEventHandler = (ev) =>
    setParameters({
      ...parameters,
      fieldId: ev.target.value,
    })
  const onConfigure = useCallback((): ConfiguringResponse | false => {
    const isValid = (p: DraftAppConfig): p is AppConfig =>
      Array.from(Object.values(p)).every(
        (val) => typeof val === 'string' && val.length > 0
      )

    if (!isValid(parameters)) {
      sdk.notifier.error('All parameters are required')
      return false
    }

    return {
      parameters,
      targetState: {
        EditorInterface: {
          [parameters.contentTypeId]: {
            controls: [{ fieldId: parameters.fieldId }],
          },
        },
      },
    }
  }, [sdk.notifier, parameters])

  useEffect(() => {
    const fetchParameters = async (): Promise<void> => {
      const definedParameters: AppConfig | null = await sdk.app.getParameters()
      console.log('fetchParameters', definedParameters)
      setParameters((parameters) => definedParameters || parameters)
    }
    fetchParameters()
  }, [sdk])

  useEffect(() => {
    sdk.app.onConfigure(() => onConfigure())
    sdk.app.setReady()
    console.log('onConfigure, setReady')
  }, [onConfigure, sdk])

  return (
    <ConfigForm className="f36-content-width--text">
      <Heading>Picture selector</Heading>
      {[
        {
          id: 'app-config-api-path',
          name: 'apiPath',
          labelText: 'API Path',
          value: parameters.apiPath,
          onChange: onChangeApiPath,
        },
        {
          id: 'app-config-content-type-id',
          name: 'contentTypeId',
          labelText: 'Content Type ID',
          helpText: 'Please enter Content Type ID',
          value: parameters.contentTypeId,
          onChange: onChangeContentTypeId,
        },
        {
          id: 'app-config-field-id',
          name: 'fieldId',
          labelText: 'Field ID',
          helpText: 'Please enter Field ID',
          value: parameters.fieldId,
          onChange: onChangeFieldId,
        },
      ].map((props) => (
        <TextField key={props.id} {...props} required />
      ))}
    </ConfigForm>
  )
}
