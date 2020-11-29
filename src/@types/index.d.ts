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

type Item = {
  objectKey: string
  img?: HTMLImageElement
}

type ItemClickHandler = (objectKey: string) => void

type ItemInViewHandler = (objectKey?: string) => Promise<void>

type ItemList = string[]

type ReducerAction<
  T extends {
    type: string
    payload?: unknown
  }
> = T

type ReducerCreator<S, A> = () => [S, React.Dispatch<A>]
