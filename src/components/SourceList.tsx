import { Heading } from '@contentful/forma-36-react-components'
import React from 'react'
import styled from 'styled-components'
import { NSDialogReducer } from '../reducers/dialog/types'
import { SourceItem } from './SourceItem'

const THUMB_RECT = {
  height: 128,
  width: 128,
} as const

const ListWrapper = styled.div`
  overflow-y: scroll;
  height: calc(1.5rem + ((${THUMB_RECT.height}px + 1rem + 2px) * 4));
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
`

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
`

export const SourceList: React.FC<{
  items: NSDialogReducer.StateItem[]
  onMountItem: FetchImageHandler
}> = ({ items, onMountItem }) => (
  <div>
    <Heading element="h2">Source list</Heading>
    <ListWrapper>
      <List>
        {items.map(({ img, objectKey }) => (
          <SourceItem
            height={THUMB_RECT.height}
            img={img}
            key={objectKey}
            objectKey={objectKey}
            onMount={onMountItem}
            width={THUMB_RECT.width}
          />
        ))}
      </List>
    </ListWrapper>
  </div>
)
