import { AppDispatch } from '../';
import { slicename, designsTreeAsync } from '../reducers/sliceDesignsTree'
import { Key } from 'react';

export const designsTreeActions = () => {
    
    return ( dispatch: AppDispatch ) => {
        
        dispatch( designsTreeAsync() )
    }
}

export const designsExpandActions = (expanded : Key[]) => {
    
    return ( dispatch: AppDispatch ) => {
        
        dispatch({ type: slicename + '/expand', payload: expanded } )
    }
}