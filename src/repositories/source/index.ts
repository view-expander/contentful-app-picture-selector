import { Repository } from '../__internal__'
import type { PromisifiedAxiosResponse } from '../types'
import type { NSSourceRepository } from './types'

export class SourceRepository extends Repository {
  private readonly PATH = '/source'

  list<T = NSSourceRepository.ListResponse>(
    params: NSSourceRepository.ListParams
  ): PromisifiedAxiosResponse<T> {
    return this.http.get<T>(this.PATH, { params })
  }

  getThumb<T = NSSourceRepository.GetThumbResponse>(
    key: NSSourceRepository.GetThumbParams
  ): PromisifiedAxiosResponse<T> {
    return this.http.get<T>(`${this.PATH}/${key}`, {
      params: { size: 'thumb' },
      responseType: 'arraybuffer',
    })
  }
}
