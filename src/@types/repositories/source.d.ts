declare namespace SourceRepository {
  type GetThumbParams = string

  type GetThumbResponse = ArrayBuffer

  type ListItem = {
    Key: string
    LastModified: string
    ETag: string
    Size: number
    StorageClass: string
  }

  type ListParams = {
    ContinuationToken?: string
    MaxKeys?: number
  } | void

  type ListResponse = {
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
