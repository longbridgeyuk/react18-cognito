import { v4 as uuidv4 } from 'uuid'

/**
 * UUID生成
 * ※将来的にUUID v6 になるのでラップして使う
 */
export const useUUID = () => {

  const createUUID = () =>  uuidv4()

  return { createUUID }
 
}