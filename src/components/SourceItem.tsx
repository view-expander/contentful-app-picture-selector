import { Card } from '@contentful/forma-36-react-components'
import React, { useEffect } from 'react'
import styled from 'styled-components'

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

const Skeleton: React.FC<{ height: number; width: number }> = ({
  height,
  width,
}) => (
  <svg viewBox="0 0 1 1" width={width} height={height}>
    <rect x={0} y={0} width={1} height={1} fill="#ccc" />
  </svg>
)

export const SourceItem: React.FC<{
  height: number
  img?: HTMLImageElement
  inView: boolean
  isLast: boolean
  objectKey: string
  onInView: FetchImageHandler
  width: number
}> = ({ height, img, inView, isLast, objectKey, onInView, width }) => {
  useEffect(() => {
    if (inView) {
      onInView(objectKey)
      if (isLast) {
        console.log('<SourceItem />', 'last item', objectKey)
      }
    }
  }, [inView, isLast, objectKey, onInView])

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
