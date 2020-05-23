import { NSSourceRepository } from '../../repositories/source/types'
import { DIALOG_REDUCER_ACTION_TYPES } from './action-types'

export declare namespace NSDialogReducer {
  type Action =
    | {
        type: typeof DIALOG_REDUCER_ACTION_TYPES.MOUNT_THUMB
        payload: Pick<StateItem, 'objectKey'> & {
          img: HTMLImageElement
        }
      }
    | {
        type: typeof DIALOG_REDUCER_ACTION_TYPES.RECEIVE
        payload: NSSourceRepository.Response
      }

  type StateItem =
    | {
        objectKey: string
        src?: string
      }
    | {
        objectKey: string
        src: string
        height: number
        width: number
      }

  type State = {
    items: StateItem[]
  }
}
