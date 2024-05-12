import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { memo } from 'react'
import { Todolist } from 'features/TodolistList/Todolist/ui/Todolist'
import { Navigate } from 'react-router-dom'
import { ItemForm } from 'common/components'
import { useTodolistList } from 'features/TodolistList/hooks/useTodolistList'
import { TodolistListTypes } from 'features/TodolistList/types/todolistList-types'

export const TodolistList = memo(({ demo = false }: TodolistListTypes) => {
  const { todolists, isLoggedIn, addTodolist } = useTodolistList({ demo })

  if (!isLoggedIn) return <Navigate to={'/login'} />

  const todolistList = todolists.map(tl => {
    return (
      <Grid item key={tl.id}>
        <Paper elevation={3} style={{ padding: '10px' }}>
          <Todolist key={tl.id} todolist={tl} demo={demo} />
        </Paper>
      </Grid>
    )
  })

  return (
    <>
      <Grid container style={{ padding: '10px' }}>
        <ItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolistList}
      </Grid>
    </>
  )
})