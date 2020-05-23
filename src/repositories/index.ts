import { AxiosResponse } from 'axios'
import { SourceRepository } from './source'

export type PromisifiedAxiosResponse<T = unknown> = Promise<AxiosResponse<T>>

const repositories = {
  source: new SourceRepository(),
}

export const RepositoryFactory = {
  get(name: keyof typeof repositories): typeof repositories[typeof name] {
    return repositories[name]
  },
}
