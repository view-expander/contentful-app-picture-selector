import React, { useEffect } from 'react'
import styled from 'styled-components'
import { DIALOG_REDUCER_ACTION_TYPES } from '../reducers/dialog/action-types'
import { NSDialogReducer } from '../reducers/dialog/types'
import { sourceRepository } from '../repositories'

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
  dispatch: React.Dispatch<NSDialogReducer.Action>
  objectKey: string
  src: string | void
}> = ({ dispatch, objectKey, src }) => {
  useEffect(() => {
    const fetchThumb = async (): Promise<void> => {
      const response = await sourceRepository.getObjectThumb(objectKey)
      dispatch({
        type: DIALOG_REDUCER_ACTION_TYPES.MOUNT_THUMB,
        payload: { objectKey, response },
      })
    }
    fetchThumb()
  }, [dispatch, objectKey])
  useEffect(() => console.log('<SourceItem />', 'src:', src), [src])

  return (
    <li>
      <Thumb>
        <Skeleton />
      </Thumb>
    </li>
  )
}
