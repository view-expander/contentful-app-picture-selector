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

type ReducerCreator<S, A> = () => [S, React.Dispatch<A>]

type SelectedItem = {
  key: string
}

type SelectedItemList = SelectedItem[]

type onMountPictureItem = (key: string) => void
