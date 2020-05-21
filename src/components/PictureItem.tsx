import React, { useEffect } from 'react'
import { PromisifiedAxiosResponse } from '../@types/repositories'

export const PictureItem: React.FC<{
  fetchThumb: (key: string) => PromisifiedAxiosResponse<ArrayBuffer>
  pictureKey: string
}> = ({ fetchThumb, pictureKey }) => {
  useEffect(() => {
    const _fetchThumb = async (): Promise<void> => {
      const res = await fetchThumb(pictureKey)
      console.log('fetchThumb()', pictureKey, res.data)
    }
    _fetchThumb()
  }, [fetchThumb, pictureKey])

  return <li>{{ pictureKey }}</li>
}
