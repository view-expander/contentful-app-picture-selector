import React from 'react'
import styled from 'styled-components'
import { NSDialogReducer } from '../reducers/dialog/types'
import { FlexWrapper } from './index'
import { SourceItem } from './SourceItem'

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
`

export const SourceList: React.FC<{
  dispatch: React.Dispatch<NSDialogReducer.Action>
  items: NSDialogReducer.StateItem[]
}> = ({ dispatch, items }) => (
  <FlexWrapper>
    <List>
      {items.map(({ objectKey, src }) => (
        <SourceItem
          dispatch={dispatch}
          key={objectKey}
          objectKey={objectKey}
          src={src}
        />
      ))}
    </List>
  </FlexWrapper>
)
