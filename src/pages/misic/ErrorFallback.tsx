import { FallbackProps } from 'react-error-boundary'
import { isHttpError } from '@/_error'
import { ErrorPage, ErrorPageProps } from './ErrorPage'

/**
 * ErrorBoundary の FallbackComponent に指定するコンポーネント
 * @param param0 
 * @returns 
 */
export function ErrorFallback({ error }: FallbackProps) {
  
  const render = () => {

    // --- Httpsのエラー ---
    if (isHttpError(error)) { 
      const statusCode = error.http.status ?? error.http.code ?? ''
      // 401 Unauthorized => ログインページへ遷移 
      if (statusCode === 401) {
        window.location.replace(window.location.origin)
        return null
      }
     
      const errorPageProps: ErrorPageProps = {
        message: error.message,
        submessage: error.http.url
      }
      return ErrorPage(errorPageProps)
    }
   
    // --- 通常のエラー ---
    const errorPageProps: ErrorPageProps = {
      message: error.message
    }
    return ErrorPage(errorPageProps)

  }

  return (<>{render()}</>)
}
