import React from 'react'
import styled from 'styled-components'
import type { NSSourceRepository } from '../repositories/source/types'
import { FlexWrapper } from './index'
import { PictureItem } from './PictureItem'

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
`

export const PictureList: React.FC<{
  onMountItem: onMountPictureItem
  items: NSSourceRepository.ListItem[]
}> = ({ items, onMountItem }) => (
  <FlexWrapper>
    <List>
      {items.map(({ Key }) => (
        <PictureItem onMount={onMountItem} key={Key} />
      ))}
    </List>
  </FlexWrapper>
)
