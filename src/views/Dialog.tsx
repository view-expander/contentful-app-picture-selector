import { DialogExtensionSDK } from 'contentful-ui-extensions-sdk'
import React, { useCallback, useEffect } from 'react'
import { SourceList } from '../components/SourceList'
import { useAutoResize } from '../hooks/useAutoResize'
import { useDialogReducer } from '../reducers/dialog'
import { DIALOG_REDUCER_ACTION_TYPES } from '../reducers/dialog/action-types'
import { sourceRepository } from '../repositories'
import { createImage } from '../utilities/create-image'

export const Dialog: React.FC<{ sdk: DialogExtensionSDK }> = ({ sdk }) => {
  const [state, dispatch] = useDialogReducer()

  const onItemInView: ItemInViewHandler = useCallback(
    async (objectKey) => {
      if (typeof objectKey === 'string') {
        const res = await sourceRepository.getObjectThumb(objectKey)
        const img = await createImage(res.data, res.headers['content-type'])
        dispatch({
          type: DIALOG_REDUCER_ACTION_TYPES.RECEIVE_THUMB,
          payload: { objectKey, img },
        })

        return
      }

      dispatch({ type: DIALOG_REDUCER_ACTION_TYPES.NEXT })
    },
    [dispatch]
  )

  useEffect(() => {
    const fetchList = async (): Promise<void> => {
      dispatch({ type: DIALOG_REDUCER_ACTION_TYPES.REQUEST })
      const res = await sourceRepository.list(state.page === 0)
      dispatch({ type: DIALOG_REDUCER_ACTION_TYPES.RECEIVE, payload: res.data })
    }

    if (state.page === undefined) {
      return
    }

    fetchList()
  }, [dispatch, state.page])

  useAutoResize(sdk)

  return (
    <SourceList
      items={state.items}
      hasNext={state.hasNext}
      onItemInView={onItemInView}
    />
  )
}
