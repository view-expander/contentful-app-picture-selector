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
    case DIALOG_REDUCER_ACTION_TYPES.MOUNT_THUMB:
      console.log(
        'DialogReducer',
        DIALOG_REDUCER_ACTION_TYPES.MOUNT_THUMB,
        state.items.find((item) => item.objectKey === action.payload.objectKey)
      )
      return {
        ...state,
        items: state.items.reduce<typeof state.items>((memo, item) => {
          if (item.objectKey === action.payload.objectKey) {
            const blob = new Blob([action.payload.response.data], {
              type:
                action.payload.response.headers['content-type'] ||
                'application/octet-stream',
            })
            console.log('Blob', blob)
            return [
              ...memo,
              {
                ...item,
                src: URL.createObjectURL(blob),
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
