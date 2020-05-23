import React from 'react'
import styled from 'styled-components'
import { NSDialogReducer } from '../reducers/dialog/types'
import { FlexWrapper } from './index'
import { SourceItem } from './SourceItem'

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  padding: 0;
`

export const SourceList: React.FC<{
  items: NSDialogReducer.StateItem[]
}> = ({ items }) => (
  <FlexWrapper>
    <List>
      {items.map(({ objectKey }) => (
        <SourceItem
          key={objectKey}
          objectKey={objectKey}
        />
      ))}
    </List>
  </FlexWrapper>
)
