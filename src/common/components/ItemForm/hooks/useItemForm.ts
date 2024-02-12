import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { ItemFormPT } from 'common/components/ItemForm/ItemForm'

export const useItemForm = ({ addItem }: ItemFormPT) => {
  const [title, setTitle] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const addNewItem = () => {
    if (title.trim()) {
      addItem(title.trim())
      setTitle('')
    } else {
      setIsError(true)
    }
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    !title && setIsError(false)
    if (e.key === 'Enter') {
      e.preventDefault()
      addNewItem()
    }
  }
  return { title, isError, setTitleHandler: onChangeHandler, addNewItem, onKeyDownHandler }
}
