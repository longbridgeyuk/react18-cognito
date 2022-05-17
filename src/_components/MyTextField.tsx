
import { TextField, TextFieldProps } from '@mui/material'
import { Controller, FieldValues, Control, Path } from 'react-hook-form'

type MyTextFieldProps<T> = 
Omit<TextFieldProps, 'name'> &
{
  name: Path<T>
  control: Control<T>
  optional?: boolean
  maxLength?: number
} 


/**
 * TextField
 */
export function MyTextField<T extends FieldValues>(props: MyTextFieldProps<T>) {
  const { control, name, sx, optional, maxLength, type,
          InputLabelProps, InputProps, FormHelperTextProps, ...rest } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...rest}
          type={type ?? "text"}
          variant="outlined"
          error={fieldState.error !== undefined}
          helperText={fieldState.error?.message}
          sx={{...sx, ...styles}}
          InputLabelProps={{
            ...InputLabelProps,
            shrink: true,
            classes: {
              root: `${optional ? "optional-label": ""}`
            }
          }}
          InputProps={{ 
            ...InputProps,
            inputProps: { 
              maxLength
            } 
          }}
          FormHelperTextProps={{
            ...FormHelperTextProps,
            classes: {
              root: "helper-text"
            }
          }}
        />
      )}
    />
  )
}

/**
 * スタイル設定
 */
const styles = {
  '.optional-label': {
    '&::after':{
      content: '" 任意 "',
      color: 'gray',
      fontSize: "small",
      paddingLeft: 1,
      paddingRight: 1,
    }
  },
  '.helper-text': {
    whiteSpace: 'nowrap'
  },
  '-internal-autofill-selected': {
    backgroundColor: 'rgb(255, 255, 255) !important'
  }
}