import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { sourceRepository } from '../repositories'

type ThumbState = {
  src: string | undefined
  width: number | undefined
  height: number | undefined
}

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

const createURI = (
  arrayBuffer: ArrayBuffer,
  type = 'application/octet-stream'
): Promise<string> =>
  new Promise((resolve, reject) => {
    const blob = new Blob([arrayBuffer], { type })
    const reader = new FileReader()

    reader.onload = (): void => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
        return
      }
      reject(new Error('unexpected file'))
    }
    reader.onerror = (err): void => reject(err)

    reader.readAsDataURL(blob)
  })

const createImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = (): void => resolve(img)
    img.onerror = (err): void => reject(err)

    img.src = src
  })

export const SourceItem: React.FC<{ objectKey: string }> = ({ objectKey }) => {
  const [thumb, setThumb] = useState<ThumbState>({
    src: undefined,
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    const fetchThumb = async (): Promise<void> => {
      const res = await sourceRepository.getObjectThumb(objectKey)
      const uri = await createURI(res.data, res.headers['content-type']).catch(
        (err) => {
          throw err
        }
      )
      const { src, width, height } = await createImage(uri).catch((err) => {
        throw err
      })

      setThumb({ src, width, height })
    }

    fetchThumb()
  }, [objectKey])

  return (
    <ListItem>
      <ThumbWrapper>
        {thumb.src === undefined ? (
          <Skeleton />
        ) : (
          <ThumbImage
            src={thumb.src}
            width={thumb.width}
            height={thumb.height}
          />
        )}
      </ThumbWrapper>
    </ListItem>
  )
}
