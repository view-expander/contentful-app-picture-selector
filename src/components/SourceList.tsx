import React from 'react'
import { InView } from 'react-intersection-observer'
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
  padding: 0;
`

const ListItem = styled.li`
  margin-top: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`

export const SourceList: React.FC<{
  hasNext: boolean
  items: NSDialogReducer.StateItem[]
  onItemInView: ItemInViewHandler
}> = ({ hasNext, items, onItemInView }) => (
  <Wrapper>
    <ListWrapper>
      <List>
        {items.map(({ img, objectKey }) => (
          <InView key={objectKey} triggerOnce={true}>
            {({ inView, ref }): React.ReactElement => (
              <ListItem ref={ref}>
                <SourceItem
                  height={THUMB_RECT.height}
                  img={img}
                  inView={inView}
                  objectKey={objectKey}
                  onInView={onItemInView}
                  width={THUMB_RECT.width}
                />
              </ListItem>
            )}
          </InView>
        ))}
        {hasNext && (
          <InView>
            {({ inView, ref }): React.ReactElement => (
              <ListItem ref={ref}>
                <SourceItem
                  height={THUMB_RECT.height}
                  inView={inView}
                  onInView={onItemInView}
                  width={THUMB_RECT.width}
                />
              </ListItem>
            )}
          </InView>
        )}
      </List>
    </ListWrapper>
  </Wrapper>
)
