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

type SourceItemProps = {
  objectKey: string
  src?: string
}

type SelectedItem = {
  key: string
}

type SelectedItemList = SelectedItem[]

type onMountPictureItem = (key: string) => void
