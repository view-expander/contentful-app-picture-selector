import { AxiosResponse } from 'axios'

export type PromisifiedAxiosResponse<T = unknown> = Promise<AxiosResponse<T>>
