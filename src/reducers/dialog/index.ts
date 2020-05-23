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
        state.items.reduce<typeof state.items>((memo, item) => {
          if (item.objectKey === action.payload.objectKey) {
            return [
              ...memo,
              {
                ...item,
                img: action.payload.img,
              },
            ]
          }
          return memo
        }, [])
      )
      // return {
      //   ...state,
      //   items: state.items.reduce<typeof state.items>((memo, item) => {
      //     if (item.objectKey === action.payload.objectKey) {
      //       return [
      //         ...memo,
      //         {
      //           ...item,
      //           img: action.payload.img,
      //         },
      //       ]
      //     }
      //     return memo
      //   }, []),
      // }
      return state

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

    default:
      throw new Error('unknown action')
  }
}

export const useDialogReducer: ReducerCreator<
  NSDialogReducer.State,
  NSDialogReducer.Action
> = () => useReducer(reducer, initialState)
