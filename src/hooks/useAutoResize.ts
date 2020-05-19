import {
  DialogExtensionSDK,
  FieldExtensionSDK,
} from 'contentful-ui-extensions-sdk'
import { useEffect } from 'react'

export const useAutoResize = (sdk: DialogExtensionSDK | FieldExtensionSDK) =>
  useEffect(() => {
    sdk.window.startAutoResizer()
    return () => sdk.window.stopAutoResizer()
  })
