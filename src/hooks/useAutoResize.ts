import {
  DialogExtensionSDK,
  FieldExtensionSDK,
} from 'contentful-ui-extensions-sdk'
import { useEffect } from 'react'

export const useAutoResize = (
  sdk: DialogExtensionSDK | FieldExtensionSDK
): React['useEffect'] =>
  useEffect(() => {
    sdk.window.startAutoResizer()
    return (): void => sdk.window.stopAutoResizer()
  })
