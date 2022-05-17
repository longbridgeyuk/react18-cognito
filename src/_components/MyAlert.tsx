import { AlertProps, Alert } from '@mui/material'
import { useUUID } from '@/_lib'

type MyAlertProps = Omit<AlertProps, 'severity'> & {
  text?: string
  severity?: 'success' | 'info' | 'warning' | 'error'
}

/**
 * Alert コンポーネント
 * @param props
 * @returns
 */
export function MyAlert(props: MyAlertProps) {
  const { text, severity, sx, ...rest } = props
  const { createUUID } = useUUID()

  const breakedText = text?.split('\n').map((line) => 
    (
      <span key={createUUID()}>
        {line}
        <br />
      </span>
    )
  )

  return (
    <Alert severity={severity} {...rest} sx={{...styles, ...sx}}>
      {breakedText}
    </Alert>
  )
}

/**
 * スタイル設定
 */
const styles = {
  'MuiAlert-root': {
    textAlign: 'left',
    whiteSpace: 'pre-line',
  }
}
