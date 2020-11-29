import { FieldExtensionSDK } from 'contentful-ui-extensions-sdk'
import { useEffect, useState } from 'react'

export const useFieldValue = (
  sdk: FieldExtensionSDK
): [SelectedItemList, (item: SelectedItem) => Promise<SelectedItemList>] => {
  const currentValue = sdk.field.getValue() as SelectedItemList | undefined
  const [value] = useState<SelectedItemList>(
    Array.isArray(currentValue) ? currentValue : []
  )

  useEffect(() => {
    sdk.field.onValueChanged((value: SelectedItemList) => console.log(value))
  }, [sdk])

  return [value, (item: SelectedItem) => sdk.field.setValue([...value, item])]
}
