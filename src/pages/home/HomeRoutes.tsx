import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { PageLayout } from '@/pages/PageLayout'
import { Top } from './top'

export function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Top />} />
      </Route>
    </Routes>
  )
}
