import { Reducer, useReducer } from 'react'
import { NSDialogReducer } from './types'
import { DIALOG_REDUCER_ACTION_TYPES } from './action-types'

const initialState: NSDialogReducer.State = {
  items: [],
}

const reducer: Reducer<NSDialogReducer.State, NSDialogReducer.Action> = (
  state,
  action
) => {
  console.log('DialogReducer', action)

  switch (action.type) {
    case DIALOG_REDUCER_ACTION_TYPES.MOUNT_THUMB:
      return {
        ...state,
        items: state.items.reduce<typeof state.items>((memo, item) => {
          if (item.objectKey === action.payload.objectKey) {
            return [
              ...memo,
              {
                ...item,
                src: URL.createObjectURL(
                  new Blob([action.payload.response.data], {
                    type: 'application/octet-stream',
                  })
                ),
              },
            ]
          }

          return memo
        }, []),
      }

    case DIALOG_REDUCER_ACTION_TYPES.RECEIVE:
      return {
        ...state,
        items: [
          ...state.items,
          ...action.payload.Contents.map(({ Key }) => ({
            objectKey: Key,
            src: undefined,
          })),
        ],
      }

    default:
      throw new Error('unknown action')
  }
}

export const useDialogReducer: ReducerCreator<
  NSDialogReducer.State,
  NSDialogReducer.Action
> = () => useReducer(reducer, initialState)
