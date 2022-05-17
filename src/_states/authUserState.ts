import { atom } from 'recoil'
import * as globaltypes from '@/_types'
import { localStorageEffect } from './_utils/localStorageEffect'
import { StateKeys } from './stateKeys'



/**
 * 認証ユーザー
 * effects_UNSTABLE: atomのset/getのタイミングで処理を呼ぶ
 */
export const authUserState = atom<globaltypes.AuthUser | undefined>({
  key: StateKeys.authUserStateKey,
  default: undefined,
  effects_UNSTABLE: [
    localStorageEffect<globaltypes.AuthUser | undefined>(StateKeys.authUserStateKey)
  ]
})
