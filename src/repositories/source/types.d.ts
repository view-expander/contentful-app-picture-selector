export declare namespace NSSourceRepository {
  type Item = {
    Key: string
    LastModified: string
    ETag: string
    Size: number
    StorageClass: string
  }

  type Params = {
    ContinuationToken?: string
    MaxKeys?: number
  } | void

  type Response = {
    IsTruncated: boolean
    Contents: Item[]
    Name: string
    Prefix: string
    MaxKeys: number
    CommonPrefixes: unknown[]
    KeyCount: number
    ContinuationToken?: string
    NextContinuationToken?: string
  }

  namespace Object {
    type GetParams = string
    type GetResponse = ArrayBuffer

    namespace Meta {
      type GetParams = string
      type GetResponse = {
        PixelHeight?: number
        PixelWidth?: number
      }
    }
  }
}
