import { Repository } from '../__internal__'
import type { RepositoryResponseData } from '../types'
import type { NSSourceRepository as This } from './types'

export class SourceRepository extends Repository {
  private readonly PATH = '/source'
  private next: This.Response['NextContinuationToken']

  list<T = This.Response>(reset?: boolean): RepositoryResponseData<T> {
    const params: This.Params | undefined = Boolean(reset)
      ? undefined
      : { ContinuationToken: this.next }
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
