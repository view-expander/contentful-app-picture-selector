import { Heading } from '@contentful/forma-36-react-components'
import React from 'react'
import styled from 'styled-components'
import { NSDialogReducer } from '../reducers/dialog/types'
import { SourceItem } from './SourceItem'

const THUMB_RECT = {
  height: 128,
  width: 128,
} as const

const Wrapper = styled.div`
  margin: 1rem;
`

const ListWrapper = styled.div`
  overflow-y: scroll;
  height: calc(2rem + ((${THUMB_RECT.height}px + 1rem + 2px) * 4.5));
  margin-top: 0.5rem;
`

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  padding: 0;
`

export const SourceList: React.FC<{
  items: NSDialogReducer.StateItem[]
  onChangeItemInView: FetchImageHandler
  onMountItem: MountHandler
}> = ({ items, onChangeItemInView, onMountItem }) => (
  <Wrapper>
    <Heading element="h2">Source list</Heading>
    <ListWrapper>
      <List>
        {items.map(({ img, objectKey }) => (
          <SourceItem
            height={THUMB_RECT.height}
            img={img}
            inView={false}
            key={objectKey}
            objectKey={objectKey}
            onChangeInView={onChangeItemInView}
            onMount={onMountItem}
            width={THUMB_RECT.width}
          />
        ))}
      </List>
    </ListWrapper>
  </Wrapper>
)
