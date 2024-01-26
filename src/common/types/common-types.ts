export type FieldError = {
  field: string
  error: string
}

export type BaseResponseT<D = {}> = {
  data: D
  resultCode: number
  messages: string[]
  fieldsErrors?: FieldError[]
}
