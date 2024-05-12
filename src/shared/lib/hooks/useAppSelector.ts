import { TypedUseSelectorHook, useSelector } from 'react-redux'
import type { AppRootStateT } from 'app/store'

export const useAppSelector: TypedUseSelectorHook<AppRootStateT> = useSelector
