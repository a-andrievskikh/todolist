import TextField from '@mui/material/TextField'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

type Props = {
  value: string
  onChangeValue: (newValue: string) => void
}

export const EditableSpan = ({ value, onChangeValue }: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')

  const activateViewMode = () => {
    setEditMode(false)
    if (value !== title) {
      onChangeValue(title)
    }
  }
  const activateEditMode = () => {
    setEditMode(true)
    setTitle(value)
  }
  const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      activateViewMode()
    }
  }

  return editMode ? (
    <TextField
      value={title}
      variant={'outlined'}
      size={'small'}
      onChange={setTitleHandler}
      onBlur={activateViewMode}
      onKeyDown={keyDownHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{value}</span>
  )
}
