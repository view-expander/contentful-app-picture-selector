import { DialogExtensionSDK } from 'contentful-ui-extensions-sdk'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FlexWrapper } from '../components'
import { SourceList } from '../components/SourceList'
import { useAutoResize } from '../hooks/useAutoResize'
import { useDialogReducer } from '../reducers/dialog'
import { DIALOG_REDUCER_ACTION_TYPES } from '../reducers/dialog/action-types'
import { sourceRepository } from '../repositories'

const SelectedPictureOnRight = styled(FlexWrapper)`
  flex: 0 0 160px;
`

export const Dialog: React.FC<{ sdk: DialogExtensionSDK }> = ({ sdk }) => {
  const [state, dispatch] = useDialogReducer()
  const [selectedItemList, setSelectedItemList] = useState<SelectedItemList>([])

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
      <SourceList items={state.items} />
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
