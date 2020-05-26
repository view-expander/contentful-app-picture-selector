import { Card } from '@contentful/forma-36-react-components'
import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

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
  animation: ${loading} 2s alternate infinite;
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

export const SourceItem: React.FC<{
  height: number
  img?: HTMLImageElement
  inView: boolean
  isLast: boolean
  objectKey: string
  onInView: ItemInViewHandler
  width: number
}> = ({ height, img, inView, isLast, objectKey, onInView, width }) => {
  useEffect(() => {
    if (img === undefined && inView) {
      onInView(objectKey, isLast)
    }
  }, [img, inView, isLast, objectKey, onInView])

  return (
    <ThumbCard height={height} padding="none" width={width}>
      {img === undefined ? (
        <Skeleton height={height} width={width} />
      ) : (
        <ThumbImage src={img.src} width={img.width} height={img.height} />
      )}
    </ThumbCard>
  )
}
