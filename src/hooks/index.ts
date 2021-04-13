import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../store/actions';
import { AppDispatch } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(ActionCreators, dispatch);
}