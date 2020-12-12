import { RadioButton } from '@contentful/forma-36-react-components'
import React from 'react'
import styled from 'styled-components'
import { ThumbItem, ThumbList } from './index'
import { Thumb } from './Thumb'

const SelectedThumbItem = styled(ThumbItem)`
  position: relative;
`

const StyledRadioButton = styled(RadioButton)`
  position: absolute;
  bottom: 0;
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
          img={img}
          inView={true}
          objectKey={objectKey}
          onClick={onClickItem}
          onInView={(): Promise<void> => Promise.resolve()}
        />
        <StyledRadioButton
          checked={Boolean(featured)}
          name="featured"
          onChange={(ev) => onChangeFeatured(objectKey, ev.target.checked)}
        />
      </SelectedThumbItem>
    ))}
  </ThumbList>
)
