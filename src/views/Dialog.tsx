import { DialogExtensionSDK } from 'contentful-ui-extensions-sdk'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FlexWrapper } from '../components'
import { SourceList } from '../components/SourceList'
import { useAutoResize } from '../hooks/useAutoResize'
import { useDialogReducer } from '../reducers/dialog'
import { DIALOG_REDUCER_ACTION_TYPES } from '../reducers/dialog/action-types'
import { sourceRepository } from '../repositories'
import { createImage } from '../utilities/create-image'

const SelectedPictureOnRight = styled(FlexWrapper)`
  flex: 0 0 160px;
`

export const Dialog: React.FC<{ sdk: DialogExtensionSDK }> = ({ sdk }) => {
  const [state, dispatch] = useDialogReducer()
  const [selectedItemList, setSelectedItemList] = useState<SelectedItemList>([])
  const onMountThumb: FetchImageHandler = useCallback(
    async (objectKey) => {
      const res = await sourceRepository.getObjectThumb(objectKey)
      const img = await createImage(res.data, res.headers['content-type'])
      dispatch({
        type: DIALOG_REDUCER_ACTION_TYPES.RECEIVE_THUMB,
        payload: { objectKey, img },
      })
      sdk.window.updateHeight()
    },
    [dispatch, sdk.window]
  )

  useEffect(() => {
    const fetchList = async (): Promise<void> => {
      const res = await sourceRepository.list()
      dispatch({ type: DIALOG_REDUCER_ACTION_TYPES.RECEIVE, payload: res.data })
    }

    fetchList()
  }, [dispatch])

  useEffect(() => {
    const value = sdk.parameters.invocation as { items?: SelectedItemList }

    if (value.items === undefined) {
      return
    }

    setSelectedItemList(value.items)
  }, [sdk.parameters])

  useAutoResize(sdk)

  return (
    <FlexWrapper>
      <SourceList items={state.items} onMountItem={onMountThumb} />
      <SelectedPictureOnRight>
        <ul>
          {selectedItemList.map(({ key }) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
      </SelectedPictureOnRight>
    </FlexWrapper>
  )
}
