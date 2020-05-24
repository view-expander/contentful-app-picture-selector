import React, { useEffect } from 'react'
import styled from 'styled-components'

const ListItem = styled.li`
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #333;
`

const THUMB_RECT = {
  height: 128,
  width: 128,
} as const

const ThumbWrapper = styled.div`
  width: ${THUMB_RECT.width}px;
  height: ${THUMB_RECT.height}px;
`

const ThumbImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
`

const Skeleton: React.FC<{ height?: number; width?: number }> = ({
  height = THUMB_RECT.height,
  width = THUMB_RECT.width,
}) => (
  <svg viewBox="0 0 1 1" width={width} height={height}>
    <rect x={0} y={0} width={1} height={1} fill="#ccc" />
  </svg>
)

export const SourceItem: React.FC<{
  img?: HTMLImageElement
  objectKey: string
  onMount: FetchImageHandler
}> = ({ img, objectKey, onMount }) => {
  useEffect(() => {
    onMount(objectKey)
  }, [objectKey, onMount])

  return (
    <ListItem>
      <ThumbWrapper>
        {img === undefined ? (
          <Skeleton />
        ) : (
          <ThumbImage src={img.src} width={img.width} height={img.height} />
        )}
      </ThumbWrapper>
    </ListItem>
  )
}
