import { AtomEffect, DefaultValue } from 'recoil'

/**
 * localStorageEffect
 * AtomEffect:Recoilアトムを同期または初期化するためのAPI関数。
 * setSelf:Atomが初めて使用されるときに呼び出される。初期化処理を記述する。
 *          ローカルストレージから値をセットする
 * onSet: Atomの値がセットされたとき、
 *          Atomがデフォルト値であればローカルストレージを削除。
 *          以外はローカルストレージにセット
 * @param key
 * @returns <T>(key: string) => AtomEffect<T>
 */
export const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key)

    if (savedValue != null && savedValue !== 'undefined' ) {
      setSelf(JSON.parse(savedValue))
    }

    onSet((newValue) => {
      if (newValue === undefined || newValue instanceof DefaultValue) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(newValue))
      }
    })
  }
