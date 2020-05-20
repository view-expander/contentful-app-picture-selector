import { AxiosResponse } from 'axios'

type PromisifiedAxiosResponse<T = unknown> = Promise<AxiosResponse<T>>
