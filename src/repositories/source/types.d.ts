export declare namespace NSSourceRepository {
  export type GetThumbParams = string

  export type GetThumbResponse = ArrayBuffer

  export type ListItem = {
    Key: string
    LastModified: string
    ETag: string
    Size: number
    StorageClass: string
  }

  export type ListParams = {
    ContinuationToken?: string
    MaxKeys?: number
  } | void

  export type ListResponse = {
    IsTruncated: boolean
    Contents: ListItem[]
    Name: string
    Prefix: string
    MaxKeys: number
    CommonPrefixes: unknown[]
    KeyCount: number
    ContinuationToken?: string
    NextContinuationToken?: string
  }
}
