import React from 'react'
import { ThumbItem, ThumbList } from './index'
import { Thumb } from './Thumb'

export const SelectedList: React.FC<{
  items: PreviewItem[]
  onClickItem: ItemClickHandler
}> = ({ items, onClickItem }) => (
  <ThumbList>
    {items.map(({ img, objectKey }) => (
      <ThumbItem key={objectKey}>
        <Thumb
          img={img}
          inView={true}
          objectKey={objectKey}
          onClick={onClickItem}
          onInView={(): Promise<void> => Promise.resolve()}
        />
      </ThumbItem>
    ))}
  </ThumbList>
)
