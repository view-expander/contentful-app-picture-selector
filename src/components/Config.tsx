import { Form, Heading, TextField } from '@contentful/forma-36-react-components'
import type { AppExtensionSDK } from 'contentful-ui-extensions-sdk'
import React, { useEffect, useState } from 'react'

type AppConfig = {
  apiPath: string | undefined
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
            controls: { fieldId: typeof parameters.fieldId }[]
          }
        }
      }
    }
  | false
> => {
  if (
    !Array.from(Object.values(parameters)).every(
      (val) => typeof val === 'string' && val.length > 0
    )
  ) {
    sdk.notifier.error('Every parameters are required')
    return false
  }

  const { items } = await sdk.space.getContentTypes<{ sys: { id: string }}>()
  const contentTypeIds = items.map(({ sys }) => sys.id)

  return {
    parameters,
    targetState: {
      EditorInterface: contentTypeIds.reduce((acc, id) => ({
        ...acc,
        [id]: {
          controls: { fieldId: parameters.fieldId }
        }
      }), {}),
    },
  }
}

export const Config: React.FC<{ sdk: AppExtensionSDK }> = ({ sdk }) => {
  const [parameters, setParameters] = useState<AppConfig>({
    apiPath: undefined,
    fieldId: undefined,
  })
  const onChangeApiPath = (ev: React.ChangeEvent<HTMLInputElement>) =>
    setParameters({
      ...parameters,
      apiPath: ev.target.value,
    })
  const onChangeFieldId = (ev: React.ChangeEvent<HTMLInputElement>) =>
    setParameters({
      ...parameters,
      fieldId: ev.target.value,
    })

  useEffect(() => {
    const fetchParameters = async () => {
      const instlationParameters = await sdk.app.getParameters()
      return setParameters({
        ...parameters,
        ...(instlationParameters || {}),
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
      <TextField
        id="app-config-api-path"
        name="apiPath"
        labelText="API Path"
        helpText="Please enter API path"
        required
        value={parameters.apiPath}
        onChange={onChangeApiPath}
      />
      <TextField
        id="app-config-field-id"
        name="fieldId"
        labelText="Field ID"
        helpText="Please enter Field ID"
        required
        value={parameters.fieldId}
        onChange={onChangeFieldId}
      />
    </Form>
  )
}
