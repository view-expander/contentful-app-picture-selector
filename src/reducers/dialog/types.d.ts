import { NSSourceRepository } from '../../repositories/source/types'
import { DIALOG_REDUCER_ACTION_TYPES } from './action-types'

export declare namespace NSDialogReducer {
  type Action = {
    type: typeof DIALOG_REDUCER_ACTION_TYPES.RECEIVE
    payload: NSSourceRepository.Response
  }

  type StateItem = {
    objectKey: string
    img?: HTMLImageElement
  }

  type State = {
    items: StateItem[]
  }
}
