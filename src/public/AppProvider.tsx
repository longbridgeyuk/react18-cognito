import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter } from 'react-router-dom'
import { ErrorFallback } from '@/pages/misic'
import { RecoilRoot } from 'recoil'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Global } from '@emotion/react'
import sanitize from '@/assets/sanitize.css' // 直接node_moduleのsanitizeを参照するとS3でエラーになったので、assetsにコピーして参照した
import { appTheme } from '@/_styles/appTheme'




const theme = createTheme(appTheme)

export function AppProvider({ children }: { children: React.ReactElement }) {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <RecoilRoot>
          <BrowserRouter>
              <ThemeProvider theme={theme}>
                <Global styles={sanitize} />
                <CssBaseline /> {/* for mui */}
                {children}
              </ThemeProvider>
          </BrowserRouter>
        </RecoilRoot>
      </ErrorBoundary>
    </React.Suspense>
  )
}
