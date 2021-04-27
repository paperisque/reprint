import { AppDispatch } from '../';
import { Key } from 'react';
import { DataNode } from 'antd/lib/tree';
import { IDesignTreeNode } from '../../types/designs';
import { designsTreeAsync } from '../reducers/DesignsTree/reducerAsyncTree';
import { slicename } from '../reducers/DesignsTree/sliceDesignsMutation';
import { designsTreeLazyChilds } from '../reducers/DesignsTree/reducerLazyChilds';
import { designsAddEbene } from '../reducers/DesignsTree/reducerAddEbene';
import { designsAddDesign } from '../reducers/DesignsTree/reducerAddDesign';
import { designsRemove } from '../reducers/DesignsTree/reducerRemove';

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

export const designsAddDesignActions = (selected: IDesignTreeNode) => {    
    return ( dispatch: AppDispatch ) => {
        dispatch( designsAddDesign(selected) )
    }
}

export const designsRemoveActions = (selected: IDesignTreeNode) => {    
    return ( dispatch: AppDispatch ) => {
        dispatch( designsRemove(selected) )
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

