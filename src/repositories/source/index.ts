import { Repository } from '../__internal__'
import type { RepositoryResponseData } from '../types'
import type { NSSourceRepository } from './types'

export class SourceRepository extends Repository {
  private readonly PATH = '/source'

  list<T = NSSourceRepository.ListResponse>(
    params: NSSourceRepository.ListParams
  ): RepositoryResponseData<T> {
    return this.http.get<T>(this.PATH, { params })
  }

  getThumb<T = NSSourceRepository.GetThumbResponse>(
    key: NSSourceRepository.GetThumbParams
  ): RepositoryResponseData<T> {
    return this.http.get<T>(`${this.PATH}/${key}`, {
      params: { size: 'thumb' },
      responseType: 'arraybuffer',
    })
  }
}
