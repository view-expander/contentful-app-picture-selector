import { Repository } from '../__internal__'
import { PromisifiedAxiosResponse } from '../types'

export class SourceRepository extends Repository {
  private readonly PATH = '/source'

  list<T = SourceRepository.ListResponse>(
    params: SourceRepository.ListParams
  ): PromisifiedAxiosResponse<T> {
    return this.http.get<T>(this.PATH, { params })
  }

  getThumb<T = SourceRepository.GetThumbResponse>(
    key: SourceRepository.GetThumbParams
  ): PromisifiedAxiosResponse<T> {
    return this.http.get<T>(`${this.PATH}/${key}`, {
      params: { size: 'thumb' },
      responseType: 'arraybuffer',
    })
  }
}
