import React from 'react'
import { PromisifiedAxiosResponse } from '../@types/repositories'
import { FlexWrapper } from './index'
import { PictureItem } from './PictureItem'

export const PictureList: React.FC<{
  fetchThumb: (key: string) => PromisifiedAxiosResponse<ArrayBuffer>
  items: SourceRepository.ListItem[]
}> = ({ fetchThumb, items }) => (
  <FlexWrapper>
    <ul>
      {items.map(({ Key }) => (
        <PictureItem fetchThumb={fetchThumb} key={Key} pictureKey={Key} />
      ))}
    </ul>
  </FlexWrapper>
)
