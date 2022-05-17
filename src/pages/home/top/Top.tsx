import { useNavigate } from 'react-router-dom'
import { useAuthUser } from '@/_lib'

/**
 * Home Top画面
 * @returns
 */
export function Top() {
  const navigate = useNavigate()
  const { signOut } = useAuthUser()


  const handleClick = () => {
    signOut()
    navigate('login')
  }

  return (
    <>
      <h2>Home</h2>
      <button type="button" onClick={handleClick}>ログアウト</button>
    </>
  )
}
