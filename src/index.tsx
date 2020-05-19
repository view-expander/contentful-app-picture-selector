import '@contentful/forma-36-fcss/dist/styles.css'
import '@contentful/forma-36-react-components/dist/styles.css'
import type { DialogExtensionSDK, KnownSDK } from 'contentful-ui-extensions-sdk'
import { AppExtensionSDK, init, locations } from 'contentful-ui-extensions-sdk'
import React from 'react'
import { render } from 'react-dom'
import { Config } from './views/Config'
import { HelloWord } from './views/HelloWorld'

const isConfig = (sdk: KnownSDK): sdk is AppExtensionSDK =>
  sdk.location.is(locations.LOCATION_APP_CONFIG)
const isDialog = (sdk: KnownSDK): sdk is DialogExtensionSDK =>
  sdk.location.is(locations.LOCATION_DIALOG)

const Root: React.FC<{ sdk: KnownSDK }> = ({ sdk }) =>
  isConfig(sdk) ? <Config sdk={sdk} /> : <HelloWord sdk={sdk} />

init((sdk) => {
  render(<Root sdk={sdk} />, document.getElementById('root'))

  if (isDialog(sdk)) {
    sdk.window.startAutoResizer()
  }
})
