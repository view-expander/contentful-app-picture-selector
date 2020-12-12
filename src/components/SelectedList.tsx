import { IconButton } from '@contentful/forma-36-react-components'
import React from 'react'
import styled from 'styled-components'
import { ThumbItem, ThumbList } from './index'
import { Thumb } from './Thumb'

const SelectedThumbItem = styled(ThumbItem)`
  position: relative;
`

const RemoveIconButton = styled(IconButton).attrs((attrs) => ({
  ...attrs,
  iconProps: {
    icon: 'Delete'
  },
  buttonType: 'negative'
}))`
  position: absolute;
  bottom: 2px;
  right: calc(1rem + 2px);
  background-color: rgba(255, 255, 255, 0.67);
  border-radius: 2px
`

export const SelectedList: React.FC<{
  items: PreviewItem[]
  onClickItem: ItemClickHandler
  onChangeFeatured: (objectKey: string) => unknown
}> = ({ items, onClickItem, onChangeFeatured }) => (
  <ThumbList>
    {items.map(({ featured, img, objectKey }) => (
      <SelectedThumbItem key={objectKey}>
        <Thumb
          featured={featured}
          img={img}
          inView={true}
          objectKey={objectKey}
          onClick={() => onChangeFeatured(objectKey)}
          onInView={(): Promise<void> => Promise.resolve()}
        />
        <RemoveIconButton onClick={() => onClickItem(objectKey)} />
      </SelectedThumbItem>
    ))}
  </ThumbList>
)
