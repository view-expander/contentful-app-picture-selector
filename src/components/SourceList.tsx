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
  onMountItem: onMountPictureItem
  items: NSDialogReducer.StateItem[]
}> = ({ items, onMountItem }) => (
  <FlexWrapper>
    <List>
      {items.map(({ objectKey, src }) => (
        <SourceItem
          key={objectKey}
          onMount={onMountItem}
          objectKey={objectKey}
          src={src}
        />
      ))}
    </List>
  </FlexWrapper>
)
