import React from 'react'
import { ThumbItem, ThumbList } from './index'
import { Thumb } from './Thumb'

export const SelectedList: React.FC<{
  items: Item[]
}> = ({ items }) => (
  <ThumbList>
    {items.map(({ img, objectKey }) => (
      <ThumbItem key={objectKey}>
        <Thumb
          img={img}
          inView={true}
          objectKey={objectKey}
          onClick={() => undefined}
          onInView={(key) => new Promise(() => console.log(key))}
        />
      </ThumbItem>
    ))}
  </ThumbList>
)
