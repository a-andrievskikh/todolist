import { ChangeEvent, useState } from 'react'

import { EditableSpanProps } from 'shared/ui/editable-span/ui/EditableSpan.types'

export const useEditableSpan = ({ value, onChange }: EditableSpanProps) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')

  const activateViewMode = () => {
    setEditMode(false)
    onChange(title)
  }
  const activateEditMode = () => {
    setEditMode(true)
    setTitle(value)
  }
  const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

  return { editMode, title, activateViewMode, activateEditMode, setTitleHandler }
}
