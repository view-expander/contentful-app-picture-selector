import React, { useEffect } from 'react'
import styled from 'styled-components'

const ListItem = styled.li`
  width: 128px;
  height: 128px;
`

// const Image = styled.img`
//   object-fit: contain;
// `

export const PictureItem: React.FC<{
  objectKey: string
  onMount: onMountPictureItem
  src: string | void
}> = ({ objectKey, onMount, src }) => {
  // const [src] = useState<string>(
  //   'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
  // )
  useEffect(() => onMount(objectKey), [objectKey])
  useEffect(() => console.log('<PictureItem />', src), [src])

  return <ListItem>{objectKey}</ListItem>
}
