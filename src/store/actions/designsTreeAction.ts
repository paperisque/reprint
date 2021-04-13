import { AppDispatch } from '../';
import { designsTreeAsync } from '../reducers/sliceDesignsTree'

export const designsTreeActions = () => {
    
    return ( dispatch: AppDispatch ) => {
        
        dispatch( designsTreeAsync() )
    }
}