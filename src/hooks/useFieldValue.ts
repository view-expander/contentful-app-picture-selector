import { FieldExtensionSDK } from 'contentful-ui-extensions-sdk'
import { useCallback, useEffect, useState } from 'react'

type PushItem = (item: Item) => Promise<ItemList>
type RemoveItem = (key: string) => Promise<ItemList>
type SetFeaturedItem = (key: string) => Promise<ItemList>

export const useFieldValue = (
  sdk: FieldExtensionSDK
): [ItemList, PushItem, RemoveItem, SetFeaturedItem] => {
  const getValidValue = (value: ItemList | undefined): ItemList =>
    Array.isArray(value) ? value : []

  const currentValue = sdk.field.getValue() as ItemList | undefined
  const [value, setValue] = useState<ItemList>(getValidValue(currentValue))

  const pushItem = useCallback(
    (item: Item) => sdk.field.setValue([...value, item]),
    [sdk, value]
  )
  const removeItem = useCallback(
    (key: string) =>
      sdk.field.setValue(value.filter((item) => item.key !== key)),
    [sdk, value]
  )
  const setFeaturedItem = useCallback(
    (key: string) => {
      const newValue = value.map((item) => ({
        ...item,
        featured: item.key === key
      }))
      console.log(newValue)
      return sdk.field.setValue(newValue)
    }
      ,
    [sdk, value]
  )

  useEffect(() => {
    sdk.field.onValueChanged((value: ItemList) =>
      setValue(getValidValue(value))
    )
  }, [sdk])

  return [value, pushItem, removeItem, setFeaturedItem]
}
