import { Reducer, useReducer } from 'react'
import { DIALOG_REDUCER_ACTION_TYPES } from './action-types'
import { NSDialogReducer } from './types'

const initialState: NSDialogReducer.State = {
  hasNext: true,
  items: [],
  isLoading: false,
  page: undefined,
}

const reducer: Reducer<NSDialogReducer.State, NSDialogReducer.Action> = (
  state,
  action
) => {
  switch (action.type) {
    case DIALOG_REDUCER_ACTION_TYPES.NEXT:
      return state.hasNext && !state.isLoading
        ? {
            ...state,
            page: state.page === undefined ? 0 : state.page + 1,
          }
        : state

    case DIALOG_REDUCER_ACTION_TYPES.RECEIVE:
      return {
        ...state,
        hasNext: typeof action.payload.NextContinuationToken === 'string',
        items: [
          ...state.items,
          ...action.payload.Contents.map(({ Key }) => ({
            objectKey: Key,
          })),
        ],
        isLoading: false,
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

    case DIALOG_REDUCER_ACTION_TYPES.REQUEST:
      return {
        ...state,
        isLoading: true,
      }

    default:
      throw new Error('unknown action')
  }
}

export const useDialogReducer: ReducerCreator<
  NSDialogReducer.State,
  NSDialogReducer.Action
> = () => useReducer(reducer, initialState)
