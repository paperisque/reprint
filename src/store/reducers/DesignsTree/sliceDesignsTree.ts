import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDesignsTreeState } from '../../../types/designstree';
import TreeNode from "primereact/components/treenode/TreeNode";
import { AppState/* , AppThunk */ } from '../..';
import { IDesignTreeNode } from '../../../global';
import { Key } from 'react';
import reducerAsyncTree from './reducerAsyncTree';
import { mutationNode, slicename } from './sliceDesignsMutation';
import reducerLazyChilds from './reducerLazyChilds';
import reducerAddEbene from './reducerAddEbene';


const initialState: IDesignsTreeState = {
    isLoading: false,
    isError: null,
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

        selected: (state, action: PayloadAction<TreeNode | null>) => {
            state.selected = action.payload
        },

        addesign: (state, action: PayloadAction<IDesignTreeNode>) => {
            if (state.selected && state.designs) {
                state.designs = mutationNode(
                state.selected.key,
                state.designs, (node: IDesignTreeNode) => {
                    node.children?.push(action.payload)
                    return node
                })
            }
        },
    },

    extraReducers: builder => {
        reducerAsyncTree( builder )
        reducerLazyChilds( builder )
        reducerAddEbene( builder )
    }
})

export const { expand, selected } = designsTreeSlice.actions;
export const selectTreeDesign = (state: AppState) => state.designstree.designs;
export const selectTreeOrigen = (state: AppState) => state.designstree.origen;
export const selectTreeExpanded = (state: AppState) => state.designstree.expanded;
export const selectTreeSelected = (state: AppState) => state.designstree.selected;

export default designsTreeSlice.reducer;