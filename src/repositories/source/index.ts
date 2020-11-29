import { Repository } from '../__internal__'
import type { RepositoryResponseData } from '../types'
import type { NSSourceRepository as This } from './types'

export class SourceRepository extends Repository {
  private readonly PATH = '/source'
  private next: This.Response['NextContinuationToken']

  list(reset?: boolean): RepositoryResponseData<This.Response> {
    const params: This.Params | undefined = reset
      ? undefined
      : { ContinuationToken: this.next }
    return this.http
      .get<This.Response>(this.PATH, { params })
      .then((res) => {
        this.next = res.data.NextContinuationToken
        return res
      })
  }

  getObjectThumb(
    objectKey: This.Object.GetParams
  ): RepositoryResponseData<This.Object.GetResponse> {
    return this.http.get<This.Object.GetResponse>(`${this.PATH}/${objectKey}`, {
      params: { size: 'thumb' },
      responseType: 'arraybuffer',
    })
  }

  getObjectMeta(objectKey: This.Object.Meta.GetParams): RepositoryResponseData<This.Object.Meta.GetResponse> {
    return this.http.get<This.Object.Meta.GetResponse>(`${this.PATH}/${objectKey}/meta`)
  }
}
