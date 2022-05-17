import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { RouteAuthGuard } from '@/_lib'
import { Login } from '@/pages/login'

import { HomeRoutes } from '@/pages/home'


export function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/" element={<Login />} />

      {/* Home ルート （認証ユーザーなら可） */}
      <Route
        path="Home/*"
        element={<RouteAuthGuard component={<HomeRoutes />} redirect="/login" />}
      />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  )
}
