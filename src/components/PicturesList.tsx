import React from 'react'
import { FlexWrapper } from './index'

export const PictureList: React.FC<{ items: SourceRepository.ListItem[] }> = ({
  items,
}) => (
  <FlexWrapper>
    <ul>
      {items.map(({ Key }) => (
        <li key={Key}>{Key}</li>
      ))}
    </ul>
  </FlexWrapper>
)
