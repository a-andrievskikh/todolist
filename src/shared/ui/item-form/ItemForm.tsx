import { ChangeEvent, KeyboardEvent, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import AddBoxOutlined from '@mui/icons-material/AddBoxOutlined'
import type { BaseResponse } from 'shared/types'
import s from 'shared/ui/item-form/ItemForm.module.css'

type Props = {
  addItem: (title: string) => { unwrap: () => Promise<any> }
  disabled?: boolean
}

export const ItemForm = ({ addItem, disabled = false }: Props) => {
  const [title, setTitle] = useState<string>('')
  const [isError, setIsError] = useState<string | null>(null)

  const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const addNewItemHandler = () => {
    if (title.trim()) {
      addItem(title.trim())
        .unwrap()
        .then(() => {
          setIsError(null)
          setTitle('')
        })
        .catch((err: BaseResponse) => {
          if (err?.resultCode) {
            console.log(err)
            setIsError(err.messages[0])
          }
        })
    } else {
      setIsError('Title is required!')
    }
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    !title && setIsError(null)
    if (e.key === 'Enter') {
      e.preventDefault()
      addNewItemHandler()
    }
  }

  return (
    <>
      <TextField
        variant={'outlined'}
        label={'Введите название'}
        helperText={isError}
        size={'small'}
        error={!!isError}
        value={title}
        onChange={setTitleHandler}
        onKeyDown={onKeyDownHandler}
        disabled={disabled}
      />
      <IconButton onClick={addNewItemHandler} disabled={disabled}>
        <AddBoxOutlined className={s.outlined} fontSize={'small'} />
      </IconButton>
    </>
  )
}
