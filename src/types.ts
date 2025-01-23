export type ReturnType<T> = {
  success: boolean
  message: string
  key: string
  data?: T | null
}
