import { Navigate, Route, Routes } from 'react-router-dom'
import { TodolistsList } from 'features/todolists-list/ui/TodolistsList'
import { Auth } from 'features/auth/ui'

type Props = { demo?: boolean }

export const AppRoutes = ({ demo = false }: Props) => {
  return (
    <Routes>
      <Route path={'/'} element={<TodolistsList demo={demo} />} />
      <Route path={'login'} element={<Auth />} />
      <Route path={'404'} element={<h1>404: PAGE NOT FOUND</h1>} />
      <Route path={'*'} element={<Navigate to={'404'} />} />
    </Routes>
  )
}
