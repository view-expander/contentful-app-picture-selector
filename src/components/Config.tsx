import {
  Form,
  Heading,
  Note,
  TextField,
} from '@contentful/forma-36-react-components'
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

const useParameters = (sdk: AppExtensionSDK) => {
  const [parameters, setParameters] = useState<AppConfig>({
    apiPath: undefined,
  })
  const fetchParameters = async () => {
    return setParameters({
      ...parameters,
      ...((await sdk.app.getParameters()) || {}),
    })
  }

  fetchParameters()
  return [parameters, setParameters] as const
}

export const Config: React.FC<{ sdk: AppExtensionSDK }> = ({ sdk }) => {
  const [parameters, setParameters] = useParameters(sdk)
  const onChangeApiPath = (ev: React.ChangeEvent<HTMLInputElement>) =>
    setParameters({
      ...parameters,
      apiPath: ev.target.value,
    })

  useEffect(() => {
    sdk.app.onConfigure(() => onConfigure(sdk, parameters))
  })
  useEffect(() => {
    sdk.app.setReady()
  })

  console.log('<Config />', parameters)

  return (
    <Form id="app-config">
      <Heading>Picture selector</Heading>
      <Note noteType="primary" title="About the app">
        Make editors in this space a little bit happier with a cute animal
        picture in the entry editor sidebar.
      </Note>
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
