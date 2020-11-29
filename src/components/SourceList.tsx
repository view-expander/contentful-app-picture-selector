import React from 'react'
import { InView } from 'react-intersection-observer'
import styled from 'styled-components'
import { THUMB_RECT } from '../constants'
import { NSDialogReducer } from '../reducers/dialog/types'
import { ThumbItem, ThumbList } from './index'
import { Thumb } from './Thumb'

const Wrapper = styled.div`
  margin: 1rem;
`

const ListWrapper = styled.div`
  overflow-y: scroll;
  height: calc(2rem + ((${THUMB_RECT.height}px + 1rem + 2px) * 4.5));
  margin-top: 0.5rem;
`

export const SourceList: React.FC<{
  hasNext: boolean
  items: NSDialogReducer.StateItem[]
  onClickItem: ItemClickHandler
  onItemInView: ItemInViewHandler
}> = ({ hasNext, items, onClickItem, onItemInView }) => (
  <Wrapper>
    <ListWrapper>
      <ThumbList>
        {items.map(({ img, objectKey }) => (
          <InView key={objectKey} triggerOnce={true}>
            {({ inView, ref }): React.ReactElement => (
              <ThumbItem ref={ref}>
                <Thumb
                  img={img}
                  inView={inView}
                  objectKey={objectKey}
                  onClick={onClickItem}
                  onInView={onItemInView}
                />
              </ThumbItem>
            )}
          </InView>
        ))}
        {hasNext && (
          <InView>
            {({ inView, ref }): React.ReactElement => (
              <ThumbItem ref={ref}>
                <Thumb
                  inView={inView}
                  onClick={onClickItem}
                  onInView={onItemInView}
                />
              </ThumbItem>
            )}
          </InView>
        )}
      </ThumbList>
    </ListWrapper>
  </Wrapper>
)
