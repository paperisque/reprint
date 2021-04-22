import { AppDispatch } from '../';
import { slicename, designsTreeAsync } from '../reducers/sliceDesignsTree'
import { Key } from 'react';
import { DataNode } from 'antd/lib/tree';
import { IDesignTreeNode } from '../../global';

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

export const designsSelectedActions = (selected : DataNode|null) => {
    
    return ( dispatch: AppDispatch ) => {
        
        dispatch({ type: slicename + '/selected', payload: selected } )
    }
}

export const designsAddesignActions = (added : IDesignTreeNode) => {
    
    return ( dispatch: AppDispatch ) => {
        
        dispatch({ type: slicename + '/addesign', payload: added } )
    }
}