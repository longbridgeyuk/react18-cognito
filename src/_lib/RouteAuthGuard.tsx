import React from 'react'
import { useRecoilValue } from 'recoil'
import { Navigate, useLocation } from 'react-router-dom'
import { authUserState } from '@/_states'

/**
 * Props
 */
type Props = {
  component: React.ReactNode
  redirect: string
}

/**
 * 認証ユーザーを確認し
 * 許可するルートであれば、Props.componentをレンダリングする
 * 許可しないルートであれば、Props.redirectにリダイレクトする
 */
export function RouteAuthGuard(props: Props) {
  const { component, redirect } = props

  // 現在のロケーションを取得する
  const currentLocation = useLocation()

  // 認証ユーザーを取得する
  const authUser = useRecoilValue(authUserState)

  // 認証ユーザーであればルートを許可する
  let allowRote = false
  if (authUser) {
    allowRote = true
  }

  // 許可するルートでなければ、リダイレクトする
  // stateに現在のロケーションを設定することで、ログイン画面にリダイレクトしたき、
  // ログイン後にcurrentLocationに戻ることができる
  if (!allowRote) {
    return <Navigate to={redirect} state={{ from: currentLocation }} />
  }

  // 許可するルートであれば、コンポーネントを返す
  // ※注※ 単一の{children}を返す場合、<>後に空白半角スペースが必要
  return <> {component}</>
}


