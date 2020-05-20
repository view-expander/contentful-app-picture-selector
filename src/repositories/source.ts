import type { PromisifiedAxiosResponse } from '../@types/repositories'
import { Repository } from './__internal__'

export class SourceRepository extends Repository {
  private readonly PATH = '/source'

  list<T = SourceRepository.ListResponse>(
    params: SourceRepository.ListParams
  ): PromisifiedAxiosResponse<T> {
    console.log('SourceRepository.list()', process.env)
    return this.http.get<T>(this.PATH, { params })
  }
}
