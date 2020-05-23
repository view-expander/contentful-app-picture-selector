import { AxiosResponse } from 'axios'
import { NSSourceRepository } from '../../repositories/source/types'
import { DIALOG_REDUCER_ACTION_TYPES } from './action-types'

export declare namespace NSDialogReducer {
  type Action =
    | {
        type: typeof DIALOG_REDUCER_ACTION_TYPES.MOUNT_THUMB
        payload: Pick<StateItem, 'objectKey'> & {
          response: AxiosResponse<NSSourceRepository.Object.GetResponse>
        }
      }
    | {
        type: typeof DIALOG_REDUCER_ACTION_TYPES.RECEIVE
        payload: NSSourceRepository.Response
      }

  type StateItem = {
    objectKey: string
    src?: string
  }

  type State = {
    items: StateItem[]
  }
}
