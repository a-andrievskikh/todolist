import { ChangeEvent, useState } from 'react'
import { todolistsAPI } from 'features/TodolistList/todolists-api'

export default {
  title: 'API/todolists',
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  const onClickHandler = () => {
    todolistsAPI.getTodolists().then(res => setState(res.data))
  }
  return (
    <>
      <button onClick={onClickHandler}> Get Todolists</button>
      <div>{JSON.stringify(state)}</div>
    </>
  )
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todolistTitle, getTodolistsTitle] = useState<string>('')

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    getTodolistsTitle(e.currentTarget.value)
  }
  const onClickHandler = () => {
    todolistsAPI.createTodolist(todolistTitle).then(res => setState(res.data))
  }

  return (
    <>
      <input value={todolistTitle} onChange={onChangeHandler} placeholder={'Add Todolist Title'} />
      <button onClick={onClickHandler}>Add Todolist</button>
      <div>{JSON.stringify(state)}</div>
    </>
  )
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todolistID, getTodolistsID] = useState<string>('')

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    getTodolistsID(e.currentTarget.value)
  }
  const onClickHandler = () => {
    todolistsAPI.deleteTodolist(todolistID).then(res => setState(res.data))
  }

  return (
    <>
      <input value={todolistID} onChange={onChangeHandler} placeholder={'Add Todolist ID'} />
      <button onClick={onClickHandler}>Delete Todolist</button>
      <div>{JSON.stringify(state)}</div>
    </>
  )
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todolistID, getTodolistsID] = useState<string>('')
  const [todolistTitle, getTodolistsTitle] = useState<string>('')

  const onChangeIDHandler = (e: ChangeEvent<HTMLInputElement>) => {
    getTodolistsID(e.currentTarget.value)
  }

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    getTodolistsTitle(e.currentTarget.value)
  }
  const onClickHandler = () => {
    todolistsAPI.updateTodolistTitle(todolistID, todolistTitle).then(res => setState(res.data))
  }

  return (
    <>
      <input value={todolistID} onChange={onChangeIDHandler} placeholder={'Add Todolist ID'} />
      <input value={todolistTitle} onChange={onChangeTitleHandler} placeholder={'Add Todolist Title'} />
      <button onClick={onClickHandler}>Update Todolist Title</button>
      <div>{JSON.stringify(state)}</div>
    </>
  )
}
