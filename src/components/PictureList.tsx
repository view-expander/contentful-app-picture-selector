import React from 'react'
import styled from 'styled-components'
import type { NSSourceRepository } from '../repositories/source/types'
import type { PromisifiedAxiosResponse } from '../repositories/types'
import { FlexWrapper } from './index'
import { PictureItem } from './PictureItem'

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
`

export const PictureList: React.FC<{
  fetchThumb: (key: string) => PromisifiedAxiosResponse<ArrayBuffer>
  items: NSSourceRepository.ListItem[]
}> = ({ fetchThumb, items }) => (
  <FlexWrapper>
    <List>
      {items.map(({ Key }) => (
        <PictureItem fetchThumb={fetchThumb} key={Key} pictureKey={Key} />
      ))}
    </List>
  </FlexWrapper>
)
