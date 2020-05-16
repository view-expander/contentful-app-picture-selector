import '@contentful/forma-36-fcss/dist/styles.css'
import '@contentful/forma-36-react-components/dist/styles.css'
import { init, locations } from 'contentful-ui-extensions-sdk'
import type { DialogExtensionSDK, KnownSDK } from 'contentful-ui-extensions-sdk'
import React from 'react'
import { render } from 'react-dom'

const isDialog = (sdk: KnownSDK): sdk is DialogExtensionSDK =>
  sdk.location.is(locations.LOCATION_DIALOG)

init((sdk) => {
  const Component: React.FC<{ sdk: typeof sdk }> = () => (
    <div>Hello, world!</div>
  )
  render(<Component sdk={sdk} />, document.getElementById('root'))

  if (isDialog(sdk)) {
    sdk.window.startAutoResizer()
  }
})
