import { Card } from '@contentful/forma-36-react-components'
import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { THUMB_RECT } from '../constants'

const ThumbCard = styled(Card).attrs<{ width: number; height: number }>(
  ({ width, height }) => ({ width, height })
)<{ width: number; height: number }>`
  width: ${({ width }): typeof width => width}px;
  height: ${({ height }): typeof height => height}px;
  padding: 0.5rem;
`

const ThumbImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
`

const loading = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const SkeletonWrapper = styled.div`
  animation: ${loading} 1s alternate infinite;
`

const Skeleton: React.FC<{ height: number; width: number }> = ({
  height,
  width,
}) => (
  <SkeletonWrapper>
    <svg viewBox="0 0 1 1" width={width} height={height}>
      <rect x={0} y={0} width={1} height={1} fill="#ccc" />
    </svg>
  </SkeletonWrapper>
)

export const Thumb: React.FC<{
  img?: HTMLImageElement
  inView: boolean
  objectKey?: string
  onClick: ItemClickHandler
  onInView: ItemInViewHandler
}> = ({ img, inView, objectKey, onClick, onInView }) => {
  const _onClick = objectKey ? () => onClick(objectKey) : () => void 0

  useEffect(() => {
    if (inView) {
      onInView(objectKey)
    }
  }, [inView, objectKey, onInView])

  return (
    <ThumbCard
      height={THUMB_RECT.height}
      padding="none"
      width={THUMB_RECT.width}
      onClick={_onClick}
    >
      {img === undefined ? (
        <Skeleton height={THUMB_RECT.height} width={THUMB_RECT.width} />
      ) : (
        <ThumbImage src={img.src} width={img.width} height={img.height} />
      )}
    </ThumbCard>
  )
}
