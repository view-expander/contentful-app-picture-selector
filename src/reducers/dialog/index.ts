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
          ...action.payload.Contents.map(({ Key }, index) => ({
            objectKey: Key,
            isLast: index === action.payload.Contents.length - 1,
          })),
        ],
        next: action.payload.NextContinuationToken,
      }

    case DIALOG_REDUCER_ACTION_TYPES.RECEIVE_THUMB:
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
