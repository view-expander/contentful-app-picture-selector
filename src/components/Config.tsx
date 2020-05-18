import { Form, Heading, TextField } from '@contentful/forma-36-react-components'
import type { AppExtensionSDK } from 'contentful-ui-extensions-sdk'
import React, { useEffect, useState } from 'react'

type AppConfig = {
  apiPath: string | undefined
  contentTypeId: string | undefined
  fieldId: string | undefined
}

const onConfigure = async (
  sdk: AppExtensionSDK,
  parameters: AppConfig
): Promise<
  | {
      parameters: AppConfig
      targetState: {
        EditorInterface: {
          [k: string]: {
            controls: { fieldId: string }[]
          }
        }
      }
    }
  | false
> => {
  const isValid = (
    p: typeof parameters
  ): p is { [k in keyof typeof parameters]: string } =>
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
  const [parameters, setParameters] = useState<AppConfig>({
    apiPath: undefined,
    contentTypeId: undefined,
    fieldId: undefined,
  })
  const onChangeApiPath = (ev: React.ChangeEvent<HTMLInputElement>) =>
    setParameters({
      ...parameters,
      apiPath: ev.target.value,
    })
  const onChangeContentTypeId = (ev: React.ChangeEvent<HTMLInputElement>) =>
    setParameters({
      ...parameters,
      contentTypeId: ev.target.value,
    })
  const onChangeFieldId = (ev: React.ChangeEvent<HTMLInputElement>) =>
    setParameters({
      ...parameters,
      fieldId: ev.target.value,
    })

  useEffect(() => {
    const fetchParameters = async () => {
      const definedParameters = await sdk.app.getParameters()
      return setParameters({
        ...parameters,
        ...(definedParameters || {}),
      })
    }

    fetchParameters()
  }, [parameters.apiPath, parameters.fieldId])
  useEffect(() => {
    sdk.app.onConfigure(() => onConfigure(sdk, parameters))
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
        <TextField {...props} required />
      ))}
    </Form>
  )
}
