import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppState } from '../store';

// создаем свой типизированный хук useSelector
export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
