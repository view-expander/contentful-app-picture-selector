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

  const onItemInView: ItemInViewHandler = useCallback(
    async (objectKey) => {
      console.log('<Dialog />', 'onItemInView()', 'objectKey:', objectKey)
      if (typeof objectKey === 'string') {
        const res = await sourceRepository.getObjectThumb(objectKey)
        const img = await createImage(res.data, res.headers['content-type'])
        dispatch({
          type: DIALOG_REDUCER_ACTION_TYPES.RECEIVE_THUMB,
          payload: { objectKey, img },
        })

        return
      }

      if (state.isLoading) {
        return
      }

      dispatch({ type: DIALOG_REDUCER_ACTION_TYPES.NEXT })
    },
    [dispatch, state.isLoading]
  )

  useEffect(() => {
    console.log('<Dialog />', 'page:', state.page)
    const fetchList = async (): Promise<void> => {
      const reset = state.page === 0
      const res = await sourceRepository.list(reset)
      dispatch({ type: DIALOG_REDUCER_ACTION_TYPES.RECEIVE, payload: res.data })
    }

    if (state.page === undefined) {
      return
    }

    fetchList()
  }, [dispatch, state.page])

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
      <SourceList
        items={state.items}
        hasNext={state.hasNext}
        onItemInView={onItemInView}
      />
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
