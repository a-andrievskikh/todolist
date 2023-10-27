import { ChangeEvent, useCallback, useState } from 'react'
import { EditableSpanPT } from 'components/EditableSpan/EditableSpan'

export const useEditableSpan = ({ value, onChangeTitle }: EditableSpanPT) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')

  const activateViewMode = useCallback(() => {
    setEditMode(false)
    onChangeTitle(title)
  }, [onChangeTitle, title])

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(value)
  }

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value), [setTitle])

  return { editMode, title, activateViewMode, activateEditMode, setTitleHandler: onChangeHandler }
}
