import React, { useEffect } from 'react'
import styled from 'styled-components'
import { DIALOG_REDUCER_ACTION_TYPES } from '../reducers/dialog/action-types'
import { NSDialogReducer } from '../reducers/dialog/types'
import { sourceRepository } from '../repositories'

const THUMB = {
  height: 128,
  width: 128,
} as const

const ThumbWrapper = styled.div`
  width: ${THUMB.width}px;
  height: ${THUMB.height}px;
`

const Thumb = styled.img`
  background-color: #ccc;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
`

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
      const res = await sourceRepository.getObjectThumb(objectKey)
      const createImage = (
        arrayBuffer: ArrayBuffer,
        type = 'application/octet-stream'
      ): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
          const src = URL.createObjectURL(new Blob([arrayBuffer], { type }))
          const img = new Image()

          img.onload = (): void => resolve(img)
          img.onerror = (err): void => reject(err)

          img.src = src
        })
      const img = await createImage(res.data).catch((err) => {
        throw err
      })

      dispatch({
        type: DIALOG_REDUCER_ACTION_TYPES.MOUNT_THUMB,
        payload: { objectKey, img },
      })
    }
    fetchThumb()
  }, [dispatch, objectKey])
  useEffect(() => console.log('<SourceItem />', 'src:', src), [src])

  return (
    <li>
      <ThumbWrapper>
        {typeof src === 'string' ? <Thumb src={src} /> : <Skeleton />}
      </ThumbWrapper>
    </li>
  )
}
