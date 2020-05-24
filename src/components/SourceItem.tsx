import { Card } from '@contentful/forma-36-react-components'
import React, { useEffect } from 'react'
import styled from 'styled-components'

const ListItem = styled.li`
  margin-top: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`

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
  objectKey: string
  onMount: FetchImageHandler
  width: number
}> = ({ height, img, objectKey, onMount, width }) => {
  useEffect(() => {
    onMount(objectKey)
  }, [objectKey, onMount])

  return (
    <ListItem>
      <ThumbCard height={height} padding="none" width={width}>
        {img === undefined ? (
          <Skeleton height={height} width={width} />
        ) : (
          <ThumbImage src={img.src} width={img.width} height={img.height} />
        )}
      </ThumbCard>
    </ListItem>
  )
}
