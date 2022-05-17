import { Box, Stack, Button, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ImUndo2, ImArrowRight2 } from 'react-icons/im'
import { appTheme } from '@/_styles/appTheme'
import { ReactComponent as Erroricon } from '@/assets/errorpageicon.svg'



export type ErrorPageProps = {
  message: string,
  submessage?: string,
  text1?: string
  text2?: string
}

/**
 * エラーページ
 */
export function ErrorPage(props: ErrorPageProps) {
  const {message, submessage, text1, text2} = props

  const theme = createTheme(appTheme)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Stack justifyContent="center" alignItems="center" sx={styles.constainer}>
        
        <Box sx={styles.icon}>
          <Erroricon width="100%" height="100%" />
        </Box>

        <Box sx={styles.err}>
          <Typography component="h2" variant="h5" align="center" >{message}</Typography>
          {submessage && 
            <Typography align="center" >{submessage}</Typography> }
        </Box>

        <Typography variant="subtitle1" align="center" sx={styles.text1}>
          { text1 ?? "ご迷惑をお掛けしまして大変申し訳ございません。"}
        </Typography>
        <Typography variant="subtitle1" align="center" sx={styles.text2}>
          { text2 ?? 
            "ご利用のページでシステムエラーが発生しました。" +
            "お手数ですが、もう一度お試し頂くか、しばらく時間をおいてから再度お試しください。" +
            "それでもこのページが表示される場合には、お問い合わせください。"}
        </Typography>


        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<ImUndo2 />} onClick={() => window.location.reload()}>
            元の画面に戻る
          </Button>

          <Button
            variant="outlined"
            startIcon={<ImUndo2 />}
            onClick={() => {
              window.history.back()
              setTimeout(() => window.location.reload(), 100)
            }}
          >
            一つ前の画面に戻る
          </Button>

          <Button
            variant="outlined"
            startIcon={<ImArrowRight2 />}
            onClick={() => window.location.replace(window.location.origin)}
          >
            ログイン画面へ
          </Button>
        </Stack>
      </Stack>
    </ThemeProvider>
  )
}



const styles = {
  constainer: {
    mt: '3rem'
  },
  icon: {
    width: 200,
    height: 200,
    color: '#919191'
  },
  err: {
    fontWeight: 'bold',
    mb: 10,
    color: '#848484',
    whiteSpace: 'pre-wrap'
  },
  text1: {
    mb: 3,
    fontSize: '1.2rem',
    whiteSpace: 'pre-wrap'
  },
  text2: {
    mb: 8,
    whiteSpace: 'pre-wrap'
  },
  supplement: {

  }
}