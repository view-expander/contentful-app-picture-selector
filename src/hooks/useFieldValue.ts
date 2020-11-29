import { FieldExtensionSDK } from 'contentful-ui-extensions-sdk'
import { useCallback, useEffect, useState } from 'react'

export const useFieldValue = (
  sdk: FieldExtensionSDK
): [
  ItemList,
  (key: string) => Promise<ItemList>,
  (key: string) => Promise<ItemList>
] => {
  const getValidValue = (value: ItemList | undefined) =>
    Array.isArray(value) ? value : []

  const currentValue = sdk.field.getValue() as ItemList | undefined
  const [value, setValue] = useState<ItemList>(getValidValue(currentValue))

  const pushItem = useCallback(
    (key: string) => sdk.field.setValue([...value, key]),
    [sdk, value]
  )
  const removeItem = useCallback(
    (key: string) => sdk.field.setValue(value.filter((k) => k !== key)),
    [sdk, value]
  )

  useEffect(() => {
    sdk.field.onValueChanged((value: ItemList) =>
      setValue(getValidValue(value))
    )
  }, [sdk])

  return [value, pushItem, removeItem]
}
