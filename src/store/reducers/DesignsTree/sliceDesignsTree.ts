import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDesignsTreeState } from '../../types/designstree';
import { AppState/* , AppThunk */ } from '../..';
import { IDesignTreeNode } from '../../../types/designs';
import { Key } from 'react';
import reducerAsyncTree from './reducerAsyncTree';
import { slicename } from './sliceDesignsMutation';
import reducerLazyChilds from './reducerLazyChilds';
import reducerAddEbene from './reducerAddEbene';
import reducerAddDesign from './reducerAddDesign';
import reducerAddRemove from './reducerRemove';


const initialState: IDesignsTreeState = {
    isLoading: false,
    isError: null,
    selected: null,
    expanded: [],
    designs: []
};

export const designsTreeSlice = createSlice({
    name: slicename,
    initialState: initialState,
    reducers: {
        expand: (state, action: PayloadAction<Key[]>) => {
            state.expanded = action.payload
        },

        selected: (state, action: PayloadAction<IDesignTreeNode|null>) => {
            state.selected = action.payload
        }
    },

    extraReducers: builder => {
        reducerAsyncTree( builder )
        reducerLazyChilds( builder )
        reducerAddEbene( builder )
        reducerAddDesign( builder )
        reducerAddRemove( builder )
    }
})

//export const { expand, selected } = designsTreeSlice.actions;
export const selectTreeDesign = (state: AppState) => state.designstree.designs;
export const selectTreeOrigen = (state: AppState) => state.designstree.origen;
export const selectTreeExpanded = (state: AppState) => state.designstree.expanded;
export const selectTreeSelected = (state: AppState) => state.designstree.selected;

//export const reducer: Reducer<IDesignsTreeState, AppState> = designsTreeSlice.reducer

export default designsTreeSlice.reducer;