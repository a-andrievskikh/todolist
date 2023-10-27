import { Navigate, Route, Routes } from 'react-router-dom'
import { TodolistList } from 'features/TodolistList/TodolistList'
import { Auth } from 'features/Auth/Auth'

export const AppRoutes = ({ demo = false }: AppRoutesPT) => {
  return (
    <Routes>
      <Route path={'/'} element={<TodolistList demo={demo} />} />
      <Route path={'/login'} element={<Auth />} />
      <Route path={'404'} element={<h1>404: PAGE NOT FOUND</h1>} />
      <Route path={'*'} element={<Navigate to={'404'} />} />
    </Routes>
  )
}

// Types
export type AppRoutesPT = { demo?: boolean }
