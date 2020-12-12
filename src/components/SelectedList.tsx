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
  top: 0;
  right: 0;
`

export const SelectedList: React.FC<{
  items: PreviewItem[]
  onClickItem: ItemClickHandler
  onChangeFeatured: (objectKey: string, featured: boolean) => unknown
}> = ({ items, onClickItem, onChangeFeatured }) => (
  <ThumbList>
    {items.map(({ featured, img, objectKey }) => (
      <SelectedThumbItem key={objectKey}>
        <Thumb
          featured={featured}
          img={img}
          inView={true}
          objectKey={objectKey}
          onClick={() => onChangeFeatured(objectKey, !Boolean(featured))}
          onInView={(): Promise<void> => Promise.resolve()}
        />
        <RemoveIconButton onClick={() => onClickItem(objectKey)} />
      </SelectedThumbItem>
    ))}
  </ThumbList>
)
