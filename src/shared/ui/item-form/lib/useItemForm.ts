import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'
import { BaseResponse } from 'shared/types'

export const useItemForm = (addItem: (title: string) => Promise<any>) => {
  const [title, setTitle] = useState<string>('')
  const [isError, setIsError] = useState<string | null>(null)

  const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const addNewItemHandler = useCallback(() => {
    if (title.trim()) {
      addItem(title.trim())
        .then(() => {
          setTitle('')
        })
        .catch((err: BaseResponse) => {
          if (err?.resultCode) {
            setIsError(err.messages[0])
          }
        })
    } else {
      setIsError('Title is required!')
    }
  }, [addItem, title, setTitle, setIsError])

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    !title && setIsError(null)
    if (e.key === 'Enter') {
      e.preventDefault()
      addNewItemHandler()
    }
  }

  return { title, isError, setTitleHandler, addNewItemHandler, onKeyDownHandler }
}
