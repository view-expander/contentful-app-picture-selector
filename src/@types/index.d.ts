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
  featured: boolean
  height: number
  key: string
  width: number
}

type ItemClickHandler = (objectKey: string) => void

type ItemInViewHandler = (objectKey?: string) => Promise<void>

type ItemList = Item[]

type PreviewItem = {
  objectKey: string
  img?: HTMLImageElement
  featured?: boolean
}

type ReducerAction<
  T extends {
    type: string
    payload?: unknown
  }
> = T

type ReducerCreator<S, A> = () => [S, React.Dispatch<A>]
