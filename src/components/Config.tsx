import { Form, Heading, TextField } from '@contentful/forma-36-react-components'
import type { AppExtensionSDK } from 'contentful-ui-extensions-sdk'
import React, { useEffect, useState } from 'react'

type AppConfig = {
  apiPath: string | undefined
}

const onConfigure = async (
  sdk: AppExtensionSDK,
  parameters: AppConfig
): Promise<{
  parameters: AppConfig
  targetState: {
    EditorInterface: unknown[]
  }
}> => {
  const { items: contentTypes } = await sdk.space.getContentTypes()
  const contentTypeIds = contentTypes.map((ct: any) => ct.sys.id)
  const EditorInterface = contentTypeIds.reduce((acc, id) => {
    return { ...acc, [id]: { sidebar: { position: 0 } } }
  }, {})
  console.log('onConfigure:contentTypeIds', contentTypeIds)
  console.log('onConfigure:EditorInterface', EditorInterface)

  return {
    parameters,
    targetState: { EditorInterface },
  }
}

export const Config: React.FC<{ sdk: AppExtensionSDK }> = ({ sdk }) => {
  const [parameters, setParameters] = useState<AppConfig>({
    apiPath: undefined,
  })
  const onChangeApiPath = (ev: React.ChangeEvent<HTMLInputElement>) =>
    setParameters({
      ...parameters,
      apiPath: ev.target.value,
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
  }, [parameters.apiPath])
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
    </Form>
  )
}
