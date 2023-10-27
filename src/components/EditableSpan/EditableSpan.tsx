import TextField from '@mui/material/TextField'
import { memo } from 'react'
import { useEditableSpan } from 'components/EditableSpan/hooks/useEditableSpan'

export const EditableSpan = memo(({ value, onChangeTitle }: EditableSpanPT) => {
  const { editMode, title, activateViewMode, activateEditMode, setTitleHandler } = useEditableSpan({
    value,
    onChangeTitle,
  })

  return editMode ? (
    <TextField
      value={title}
      variant={'outlined'}
      size={'small'}
      onChange={setTitleHandler}
      onBlur={activateViewMode}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{value}</span>
  )
})

// Types
export type EditableSpanPT = {
  value: string
  onChangeTitle: (newValue: string) => void
}
