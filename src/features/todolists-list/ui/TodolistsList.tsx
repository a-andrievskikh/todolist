import { Navigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { ItemForm } from 'shared/ui'
import { Todolist } from 'features/todolists-list/ui/todolist'
import s from './TodolistsList.module.css'
import { authSelectors } from 'features/auth/model'
import { todolistsSelectors, todolistsThunks } from 'features/todolists-list/model'
import { useActions, useAppSelector } from 'app/store'
import { TodolistDomain } from 'shared/types'
import { useEffect } from 'react'

type Props = { demo?: boolean }

export const TodolistsList = ({ demo = false }: Props) => {
  const { isLoggedInSelector } = authSelectors
  const { todolistsSelector } = todolistsSelectors
  const { getTodolists, addTodolist } = useActions(todolistsThunks)
  const todolists = useAppSelector<TodolistDomain[]>(todolistsSelector)
  const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector)

  const addTodolistCb = (todolistTitle: string) => addTodolist(todolistTitle)

  const isDisabled = todolists.some(tl => tl.entityStatus === 'loading')

  useEffect(() => {
    if (demo || !isLoggedIn) return
    getTodolists()
  }, [demo, isLoggedIn, getTodolists])

  if (!isLoggedIn) return <Navigate to={'/login'} />

  const todolistList = todolists.map(tl => {
    return (
      <Grid item key={tl.id}>
        <Paper elevation={3} className={s.paper}>
          <Todolist todolist={tl} demo={demo} />
        </Paper>
      </Grid>
    )
  })

  return (
    <>
      <Grid container className={s.container}>
        <ItemForm addItem={addTodolistCb} disabled={isDisabled} />
      </Grid>
      <Grid container spacing={3}>
        {todolistList}
      </Grid>
    </>
  )
}
