import { NSSourceRepository } from '../../repositories/source/types'
import { DIALOG_REDUCER_ACTION_TYPES } from './action-types'

export declare namespace NSDialogReducer {
  type Action = ReducerAction<
    | {
        type: typeof DIALOG_REDUCER_ACTION_TYPES.NEXT
      }
    | {
        type: typeof DIALOG_REDUCER_ACTION_TYPES.RECEIVE
        payload: NSSourceRepository.Response
      }
    | {
        type: typeof DIALOG_REDUCER_ACTION_TYPES.RECEIVE_THUMB
        payload: {
          objectKey: StateItem['objectKey']
          img: HTMLImageElement
        }
      }
  >

  type StateItem = {
    objectKey: string
    img?: HTMLImageElement
  }

  type State = {
    hasNext: boolean
    items: StateItem[]
    page: number | undefined
  }
}
