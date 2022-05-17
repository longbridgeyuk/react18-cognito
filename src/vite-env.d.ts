/// <reference types="vite/client" />

interface ImportMetaEnv {

  readonly VITE_COGNITO_REGION: string
  readonly VITE_COGNITO_POOLID: string
  readonly VITE_COGNITO_APPCLIENTID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
