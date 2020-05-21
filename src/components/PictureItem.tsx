import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PromisifiedAxiosResponse } from '../@types/repositories'

const ListItem = styled.li`
  width: 128px;
  height: 128px;
`

const Image = styled.img`
  object-fit: contain;
`

export const PictureItem: React.FC<{
  fetchThumb: (key: string) => PromisifiedAxiosResponse<ArrayBuffer>
  pictureKey: string
}> = ({ fetchThumb, pictureKey }) => {
  const [src, setSrc] = useState<string>(
    'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
  )
  useEffect(() => {
    const _fetchThumb = async (): Promise<void> => {
      const res = await fetchThumb(pictureKey)
      const blob = new Blob([res.data], { type: 'application/octet-binary' })
      setSrc(URL.createObjectURL(blob))
    }
    _fetchThumb()
  }, [fetchThumb, pictureKey, src])

  return (
    <ListItem>
      <Image src={src} alt="" />
    </ListItem>
  )
}
