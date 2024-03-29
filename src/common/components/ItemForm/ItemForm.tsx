import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import AddBoxOutlined from '@mui/icons-material/AddBoxOutlined'
import { CSSProperties, memo } from 'react'
import { useItemForm } from 'common/components/ItemForm/hooks/useItemForm'

export const ItemForm = memo(({ addItem, disabled = false }: ItemFormPT) => {
  const { title, isError, setTitleHandler, addNewItem, onKeyDownHandler } = useItemForm({ addItem })

  const addBoxOutlinedStyles: CSSProperties = {
    width: '30px',
    height: '30px',
    minWidth: '30px',
    minHeight: '30px',
  }

  return (
    <div>
      <TextField
        variant={'outlined'}
        label={'Введите название'}
        helperText={isError ? 'Title is required!' : ''}
        size={'small'}
        error={isError}
        value={title}
        onChange={setTitleHandler}
        onKeyDown={onKeyDownHandler}
        disabled={disabled}
      />
      <IconButton onClick={addNewItem} disabled={disabled}>
        <AddBoxOutlined style={addBoxOutlinedStyles} fontSize={'small'} />
      </IconButton>
    </div>
  )
})

// Types
export type ItemFormPT = {
  addItem: (title: string) => void
  disabled?: boolean
}
