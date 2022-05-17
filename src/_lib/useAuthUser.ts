import { Amplify, Auth } from 'aws-amplify'

import { useRecoilState, useResetRecoilState } from 'recoil'
import { authUserState } from '@/_states'
import * as types from '@/_types'
import { authConfig } from './authConfig'


Amplify.configure({ Auth: authConfig })


/**
 * ユーザー認証に関するフック
 */
export const useAuthUser = () => {
  // state
  const [ authUser, setAuthUser ] = useRecoilState(authUserState)
  const resetAuthUser = useResetRecoilState(authUserState)

  /**
   * サインイン処理
   */
  const signIn = async (userid: string, password: string): Promise<boolean> => {
    setAuthUser(undefined)
    try {
      const user = await getUser(userid, password)
      if (types.isAuthUser(user)) {
        setAuthUser(user)
        console.log("login success:", user) 
        return true
      }
      console.log("login failed:", user) 
      return false

    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * サインアウト処理
   */
  const signOut = () => {
    resetAuthUser()
  }

  /**
   * 認証ユーザーの値
   */
  const authUserValue = ():types.AuthUser | undefined => authUser

  /**
   * 認証ユーザの取得
   * @param userid
   * @param password
   * @returns
   */
  const getUser = async (userid: string, password: string): Promise<types.AuthUser | types.AuthFailed> => {
    try {
      const cognitoUser = await Auth.signIn(userid, password)
      return { 
        name: cognitoUser.username,
        userId: cognitoUser.username,
        jwtToken: cognitoUser.signInUserSession.idToken.jwtToken
       }    
    } catch (error:any) {
      if ( error.code === 'UserNotFoundException') {
        return Promise.resolve({ failedCode: 'UserNotFound'})
      } 
      if ( error.code === 'NotAuthorizedException') {
        return Promise.resolve({ failedCode: 'NotAuthorized'})
      } 
      return Promise.reject(error)
    }

  }

  return { signIn, signOut, authUserValue }
}
