import '@contentful/forma-36-fcss/dist/styles.css'
import '@contentful/forma-36-react-components/dist/styles.css'
import type {
  DialogExtensionSDK,
  FieldExtensionSDK,
  KnownSDK,
} from 'contentful-ui-extensions-sdk'
import { AppExtensionSDK, init, locations } from 'contentful-ui-extensions-sdk'
import React from 'react'
import { render } from 'react-dom'
import './styles.css'
import { Config } from './views/Config'
import { Dialog } from './views/Dialog'
import { Dump } from './views/Dump'
import { Field } from './views/Field'

const isConfig = (sdk: KnownSDK): sdk is AppExtensionSDK =>
  sdk.location.is(locations.LOCATION_APP_CONFIG)
const isDialog = (sdk: KnownSDK): sdk is DialogExtensionSDK =>
  sdk.location.is(locations.LOCATION_DIALOG)
const isField = (sdk: KnownSDK): sdk is FieldExtensionSDK =>
  sdk.location.is(locations.LOCATION_ENTRY_FIELD)

const Root: React.FC<{ sdk: KnownSDK }> = ({ sdk }) =>
  isConfig(sdk) ? (
    <Config sdk={sdk} />
  ) : isDialog(sdk) ? (
    <Dialog sdk={sdk} />
  ) : isField(sdk) ? (
    <Field sdk={sdk} />
  ) : (
    <Dump sdk={sdk} />
  )

init((sdk) => render(<Root sdk={sdk} />, document.getElementById('root')))
