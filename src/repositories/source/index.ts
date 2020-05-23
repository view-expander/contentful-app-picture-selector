import { Repository } from '../__internal__'
import type { RepositoryResponseData } from '../types'
import type { NSSourceRepository as This } from './types'

export class SourceRepository extends Repository {
  private readonly PATH = '/source'

  list<T = This.Response>(params: This.Params): RepositoryResponseData<T> {
    return this.http.get<T>(this.PATH, { params })
  }

  getObjectThumb<T = This.Object.GetResponse>(
    objectKey: This.Object.GetParams
  ): RepositoryResponseData<T> {
    return this.http.get<T>(`${this.PATH}/${objectKey}`, {
      params: { size: 'thumb' },
      responseType: 'arraybuffer',
    })
  }
}
