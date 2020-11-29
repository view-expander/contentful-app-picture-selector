import { FieldExtensionSDK } from 'contentful-ui-extensions-sdk'
import { useEffect, useState } from 'react'

export const useFieldValue = (
  sdk: FieldExtensionSDK
): [SelectedItemList, (key: string) => Promise<SelectedItemList>] => {
  const getValidValue = (value: SelectedItemList | undefined) => Array.isArray(value) ? value : []

  const currentValue = sdk.field.getValue() as SelectedItemList | undefined
  const [value, setValue] = useState<SelectedItemList>(getValidValue(currentValue))

  useEffect(() => {
    sdk.field.onValueChanged((value: SelectedItemList) => {
      console.log('onValueChanged', value)
      setValue(getValidValue(value))
    })
  }, [sdk])

  return [value, (key: string) => sdk.field.setValue([...value, key])]
}
