export type ReturnType<T = undefined> = {
  success: boolean
  message: string
  key: string
  data?: T | null
}
