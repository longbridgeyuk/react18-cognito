import { AppRoutes } from './AppRoutes'
import { AppProvider } from './AppProvider'

import '@/_lib/yup.custom'


export function App() {
  
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}

