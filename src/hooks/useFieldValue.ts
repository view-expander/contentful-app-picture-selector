import { FieldExtensionSDK } from 'contentful-ui-extensions-sdk'
import { useEffect, useState } from 'react'

export const useFieldValue = (
  sdk: FieldExtensionSDK
): [ItemList, (key: string) => Promise<ItemList>] => {
  const getValidValue = (value: ItemList | undefined) => Array.isArray(value) ? value : []

  const currentValue = sdk.field.getValue() as ItemList | undefined
  const [value, setValue] = useState<ItemList>(getValidValue(currentValue))

  useEffect(() => {
    sdk.field.onValueChanged((value: ItemList) => setValue(getValidValue(value)))
  }, [sdk])

  return [value, (key: string) => sdk.field.setValue([...value, key])]
}
