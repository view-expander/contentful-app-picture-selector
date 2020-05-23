import React, { useEffect } from 'react'
import styled from 'styled-components'

const THUMB = {
  height: 128,
  width: 128,
} as const

const Thumb = styled.div`
  width: ${THUMB.width}px;
  height: ${THUMB.height}px;
`

// const Image = styled.img`
//   background-color: #ccc;
//   object-fit: contain;
// `

const Skeleton: React.FC<{ height?: number; width?: number }> = ({
  height = THUMB.height,
  width = THUMB.width,
}) => (
  <svg viewBox="0 0 1 1" width={width} height={height}>
    <rect x={0} y={0} width={1} height={1} fill="#ccc" />
  </svg>
)

export const SourceItem: React.FC<{
  objectKey: string
  onMount: onMountPictureItem
  src: string | void
}> = ({ objectKey, onMount, src }) => {
  useEffect(() => onMount(objectKey), [objectKey])
  useEffect(() => console.log('<SourceItem />', 'src:', src), [src])

  return (
    <li>
      <Thumb>
        <Skeleton />
      </Thumb>
    </li>
  )
}
