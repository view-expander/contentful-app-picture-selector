import { AxiosResponse } from 'axios'

export type RepositoryResponseData<T = unknown> = Promise<AxiosResponse<T>>
