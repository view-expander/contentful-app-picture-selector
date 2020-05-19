import { Form, Heading, TextField } from '@contentful/forma-36-react-components'
import type { AppExtensionSDK } from 'contentful-ui-extensions-sdk'
import React, { useEffect, useState } from 'react'

type DraftAppConfig = {
  [K in keyof AppConfig]: AppConfig[K] | undefined
}

type InputEventHandler = (ev: React.ChangeEvent<HTMLInputElement>) => void

const onConfigure = async (
  sdk: AppExtensionSDK,
  parameters: DraftAppConfig
): Promise<ConfiguringResponse | false> => {
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
}

export const Config: React.FC<{ sdk: AppExtensionSDK }> = ({ sdk }) => {
  const [apiPath, setApiPath] = useState<DraftAppConfig['apiPath']>()
  const [contentTypeId, setContentTypeId] = useState<
    DraftAppConfig['contentTypeId']
  >()
  const [fieldId, setFieldId] = useState<DraftAppConfig['fieldId']>()
  const onChangeApiPath: InputEventHandler = (ev) => setApiPath(ev.target.value)
  const onChangeContentTypeId: InputEventHandler = (ev) =>
    setContentTypeId(ev.target.value)
  const onChangeFieldId: InputEventHandler = (ev) => setFieldId(ev.target.value)

  useEffect(() => {
    const fetchParameters = async (): Promise<void> => {
      const definedParameters: AppConfig | null = await sdk.app.getParameters()
      if (definedParameters !== null) {
        const { apiPath, contentTypeId, fieldId } = definedParameters
        setApiPath(apiPath)
        setContentTypeId(contentTypeId)
        setFieldId(fieldId)
      }
    }

    fetchParameters()
  }, [apiPath, contentTypeId, fieldId, sdk.app])
  useEffect(() => {
    sdk.app.onConfigure(() =>
      onConfigure(sdk, {
        apiPath,
        contentTypeId,
        fieldId,
      })
    )
  })
  useEffect(() => {
    sdk.app.setReady()
  })

  return (
    <Form>
      <Heading>Picture selector</Heading>
      {[
        {
          id: 'app-config-api-path',
          name: 'apiPath',
          labelText: 'API Path',
          value: apiPath,
          onChange: onChangeApiPath,
        },
        {
          id: 'app-config-content-type-id',
          name: 'contentTypeId',
          labelText: 'Content Type ID',
          helpText: 'Please enter Content Type ID',
          value: contentTypeId,
          onChange: onChangeContentTypeId,
        },
        {
          id: 'app-config-field-id',
          name: 'fieldId',
          labelText: 'Field ID',
          helpText: 'Please enter Field ID',
          value: fieldId,
          onChange: onChangeFieldId,
        },
      ].map((props) => (
        <TextField key={props.id} {...props} required />
      ))}
    </Form>
  )
}
