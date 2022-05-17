/**
 * 認証ユーザーの型定義
 */
export type AuthUser = {
  name: string
  userId: string
  jwtToken: string
}
// ユーザー定義ガード
export const isAuthUser = (arg: unknown): arg is AuthUser => {
  const isNotAuthUser = (val: unknown): val is AuthUser => 
    typeof val === 'object' && val !== null
  if (!isNotAuthUser(arg)) {
    return false
  }
  return (
    typeof arg.name === 'string' &&
    typeof arg.userId === 'string' &&
    typeof arg.jwtToken === 'string'
  )
}

/**
 * 認証失敗時の型定義
 */
export type AuthFailed = {
  failedCode: 'UserNotFound' | 'NotAuthorized'
}
// ユーザー定義ガード
export const isAuthFailed = (arg: unknown): arg is AuthFailed => {
  const isNotAuthFailed = (val: unknown): val is AuthFailed => 
    typeof val === 'object' && val !== null
  if (!isNotAuthFailed(arg)) {
    return false
  }
  return (
    typeof arg.failedCode === 'string' &&
    ['UserNotFound', 'NotAuthorized'].includes(arg.failedCode)
  )
}

/**
 * 業務エラーの場合の Httpのレスポンスデータ
 */
export type HttpErrorResponse = {
  messageCode: string
}
// ユーザー定義ガード
export const isHttpErrorResponse = (arg: unknown): arg is HttpErrorResponse => {
  const isNotHttpErrorResponse = (val: unknown): val is HttpErrorResponse => 
    typeof val === 'object' && val !== null
  if (!isNotHttpErrorResponse(arg)) {
    return false
  }
  return typeof arg.messageCode === 'string'
}

/**
 * Httpリクエストの戻り値の型定義
 */
export type HttpFailedResult = {
  messageCode: string
}
// ユーザー定義ガード
export const isHttpFailedResult = (arg: unknown): arg is HttpFailedResult => {
  const isNotHttpFailedResult = (val: unknown): val is HttpFailedResult => 
    typeof val === 'object' && val !== null
  if (!isNotHttpFailedResult(arg)) {
    return false
  }
  return typeof arg.messageCode === 'string'
}

/**
 * Alert表示用の設定コンフィグの型定義
 */
export type AlertConfig = {
  text?: string
  severity?: 'success' | 'info' | 'warning' | 'error'
}
