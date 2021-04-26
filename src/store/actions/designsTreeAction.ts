import { AppDispatch } from '../';
import { Key } from 'react';
import { DataNode } from 'antd/lib/tree';
import { IDesignTreeNode } from '../../global';
import { designsTreeAsync } from '../reducers/DesignsTree/reducerAsyncTree';
import { slicename } from '../reducers/DesignsTree/sliceDesignsMutation';
import { designsTreeLazyChilds } from '../reducers/DesignsTree/reducerLazyChilds';
import { designsAddEbene } from '../reducers/DesignsTree/reducerAddEbene';

export const designsTreeActions = () => {    
    return ( dispatch: AppDispatch ) => {
        dispatch( designsTreeAsync() )
    }
}

export const designsTreeLazyChildsActions = (expanded: IDesignTreeNode) => {    
    return ( dispatch: AppDispatch ) => {
        dispatch( designsTreeLazyChilds(expanded) )
    }
}

export const designsAddEbeneActions = (selected: IDesignTreeNode) => {    
    return ( dispatch: AppDispatch ) => {
        dispatch( designsAddEbene(selected) )
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