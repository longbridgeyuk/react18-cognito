import * as React from 'react'
import { useErrorHandler } from 'react-error-boundary'
import {
  Box,
  Stack,
  Button,
  InputAdornment,
  IconButton
} from '@mui/material'
import { MyTextField, MyAlert } from '@/_components'
import { useForm, SubmitHandler } from 'react-hook-form'
import yup from '@/_lib/yup.custom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuthUser } from '@/_lib'
import * as globaltypes from '@/_types'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'


// 入力項目スキーマ
const schema = yup.object({
  userid: yup.string().label('ユーザーID').required(),
  password: yup.string().label('パスワード').required()
})

// 入力項目の型
type InputType = yup.InferType<typeof schema>

// 入力項目初期値
const defaultValues:InputType = {
  userid: '',
  password: ''
}

/**
 * ログイン画面の入力フォームコンポーネント
 * @param onSuccess：ログイン成功時の処理
 * @returns
 */
export function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  // hook
  const handleError = useErrorHandler()
  const { control, handleSubmit } = useForm<InputType>({
    defaultValues,
    resolver: yupResolver(schema)
  })
  const { signIn } = useAuthUser()
  // state
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [alertConfig, setAlertConfig] = React.useState<
    globaltypes.AlertConfig | undefined
  >()

  /**
   * ログインボタン クリック処理
   * @param data
   * @returns
   */
  const handleLoginClick: SubmitHandler<InputType> = async (
    data: InputType
  ) => {
    try {
      if (await signIn(data.userid, data.password)) {
        onSuccess()
      }
      setAlertConfig({
        text: 'ログインできません。\nユーザーID または パスワード に誤りがないかご確認ください。',
        severity: 'error'
      })
    } catch (e) {
      handleError(e)
    }
  }

  /**
   * パスワードの表示/非表示
   */
  const handleClickShowPassword = () => {
    setShowPassword((val) => !val)
  }

  /**
   * レンダー処理
   */
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(handleLoginClick)}
    >
      <Stack spacing={2}>
        {alertConfig && (
          <MyAlert
            variant="filled"
            severity="error"
            text="ユーザーID または パスワードが間違ってます。"
          />
        )}

        <MyTextField
          name="userid"
          label="ユーザーID"
          control={control}
          fullWidth
          autoFocus
        />
        <MyTextField
          name="password"
          label="パスワード"
          control={control}
          type={showPassword ? 'text' : 'password'}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  tabIndex={-1}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Stack>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={styles.loginbutton}
      >
        ログイン
      </Button>
    </Box>
  )
}

/**
 * スタイル
 */
const styles = {
  loginbutton: {
    mt: 3,
    mb: 1
  },
  message: {
    fontSize: 'small',
    mb: 2,
    pl: 1
  }
}
