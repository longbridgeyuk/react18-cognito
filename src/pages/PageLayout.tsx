import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'

/**
 * pagesフォルダ内の共通レイアウト
 * @returns
 */
export function PageLayout() {
  return (
    <>
      <Container fixed sx={styles.container}>
        <Outlet />
      </Container>
    </>
  )
}

/**
 * スタイル
 */
const styles = {
  container: {
    p: 0,
    mt: 3,
    '@media (min-width: 600px)': {
      p: 0
    }
  }
}
