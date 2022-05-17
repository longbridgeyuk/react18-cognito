/**
 * Http エラー
 */
 export interface HttpError extends Error  {
  name: string
  message: string
  stack?: string | undefined
  http: {
    url: string
    status?: number | undefined
    code?: string | undefined
    detail?: object | undefined
  }
}
// ユーザー定義ガード
export const isHttpError = (arg: unknown): arg is HttpError => {

  const isNotNullishHttpError = (val: unknown): val is HttpError => typeof val === 'object' && val !== null
  if (!isNotNullishHttpError(arg)) {
    return false
  }
  return (
    typeof arg.name === 'string' &&
    typeof arg.message === 'string' &&
    (typeof arg.stack === 'string' || typeof arg.stack === 'undefined') &&
    typeof arg.http === 'object' &&
    arg.http !== null &&
    (typeof arg.http.url === 'string' || typeof arg.http.url === 'undefined') &&
    (typeof arg.http.status === 'number' || typeof arg.http.status === 'undefined') &&
    (typeof arg.http.code === 'string' || typeof arg.http.code === 'undefined')
  )
}