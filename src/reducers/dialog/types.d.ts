import { DIALOG_REDUCER_ACTION_TYPES } from './action-types'
import { NSSourceRepository } from '../../repositories/source/types'

export declare namespace NSDialogReducer {
  type Action = {
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
