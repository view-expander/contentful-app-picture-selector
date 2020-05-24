type AppConfig = {
  apiPath: string
  contentTypeId: string
  fieldId: string
}

type ConfiguringResponse = {
  parameters: AppConfig
  targetState: {
    EditorInterface: {
      [k: string]: {
        controls: { fieldId: string }[]
      }
    }
  }
}

type FetchImageHandler = (objectKey: string) => Promise<void>

type ReducerAction<
  T extends {
    type: string
    payload?: unknown
  }
> = T

type ReducerCreator<S, A> = () => [S, React.Dispatch<A>]

type SelectedItem = {
  key: string
}

type SelectedItemList = SelectedItem[]
