import { Reducer, useReducer } from 'react'
import { DIALOG_REDUCER_ACTION_TYPES } from './action-types'
import { NSDialogReducer } from './types'

const initialState: NSDialogReducer.State = {
  items: [],
}

const reducer: Reducer<NSDialogReducer.State, NSDialogReducer.Action> = (
  state,
  action
) => {
  switch (action.type) {
    case DIALOG_REDUCER_ACTION_TYPES.RECEIVE:
      return {
        ...state,
        items: [
          ...state.items,
          ...action.payload.Contents.map(({ Key }) => ({
            objectKey: Key,
          })),
        ],
      }

    case DIALOG_REDUCER_ACTION_TYPES.RECEIVE_THUMB:
      console.log(
        'DialogReducer',
        DIALOG_REDUCER_ACTION_TYPES.RECEIVE_THUMB,
        action.payload
      )
      return {
        ...state,
        items: state.items.map((item) =>
          item.objectKey === action.payload.objectKey
            ? {
                ...item,
                img: action.payload.img,
              }
            : item
        ),
      }

    default:
      throw new Error('unknown action')
  }
}

export const useDialogReducer: ReducerCreator<
  NSDialogReducer.State,
  NSDialogReducer.Action
> = () => useReducer(reducer, initialState)
