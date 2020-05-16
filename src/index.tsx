import '@contentful/forma-36-fcss/dist/styles.css'
import '@contentful/forma-36-react-components/dist/styles.css'
import { init, locations, AppExtensionSDK } from 'contentful-ui-extensions-sdk'
import type { DialogExtensionSDK, KnownSDK } from 'contentful-ui-extensions-sdk'
import React from 'react'
import { render } from 'react-dom'
import { Config } from './components/Config'
import { HelloWord } from './components/HelloWorld'

const isConfig = (sdk: KnownSDK): sdk is AppExtensionSDK => sdk.location.is(locations.LOCATION_APP_CONFIG)
const isDialog = (sdk: KnownSDK): sdk is DialogExtensionSDK =>
  sdk.location.is(locations.LOCATION_DIALOG)

init((sdk) => {
  console.log('init', sdk)
  const Component = isConfig(sdk) ? Config : HelloWord
  render(<Component sdk={sdk as any} />, document.getElementById('root'))

  if (isDialog(sdk)) {
    sdk.window.startAutoResizer()
  }
})
