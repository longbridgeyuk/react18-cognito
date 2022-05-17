import { useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'
import { Box } from '@mui/material'
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'
import { LoginForm } from './components'

/**
 *
 * @returns ログイン画面
 */
export function Login() {
  const appTheme = useTheme()
  const navigate = useNavigate()

  /**
   * テーマ
   */
  const theme = createTheme(
    { ...appTheme },
    {
      palette: {
        primary: {
          main: '#032e42'
        }
      }
    }
  )

  const onSigninSuccess = () => {
    navigate('home')
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={styles.containerfilter}>
        <Box sx={styles.contents}>
          <Box sx={styles.inputform}>
            <LoginForm onSuccess={onSigninSuccess} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

/**
 * スタイル
 */
const styles = {
  containerfilter: {
    minHeight: '100vh',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(1px)',

    'input:-webkit-autofill':css({
      'WebkitBoxShadow': '0 0 0px 1000px rgb(173, 196, 205, 0.7) inset'
    })
  },
  contents: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    padding: '0 30px 0 30px',

    gap: '20px',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.4)'
  },
  inputform: {
    mt: '1.8vw',
    mb: 3
  }
}
