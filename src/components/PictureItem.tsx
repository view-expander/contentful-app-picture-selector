import React, { useState } from 'react'
import styled from 'styled-components'
import { RepositoryResponseData } from '../repositories/types'

const ListItem = styled.li`
  width: 128px;
  height: 128px;
`

const Image = styled.img`
  object-fit: contain;
`

export const PictureItem: React.FC<{
  fetchThumb: (key: string) => RepositoryResponseData<ArrayBuffer>
  pictureKey: string
}> = ({ pictureKey }) => {
  const [src] = useState<string>(
    'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
  )

  return (
    <ListItem>
      {pictureKey}
      <br />
      {src}
    </ListItem>
  )
}
