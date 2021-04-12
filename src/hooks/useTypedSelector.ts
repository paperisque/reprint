import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppState } from '../store/reducers';

// создаем свой типизированный хук useSelector
export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
