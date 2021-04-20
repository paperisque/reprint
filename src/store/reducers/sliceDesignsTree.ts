import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDesignsTreeState, DesignsActionTypes, IDesignsContainer, IDesignsItem } from '../../types/designstree';
import { AppState/* , AppThunk */ } from '../';
import api from '../../api'
import { IDesignTreeNode } from '../../global';
import { Key } from 'react';

const initialState: IDesignsTreeState = {
    isLoading: false,
    isError: null,
    expanded : [],
};

export const slicename: string = 'designstree';

export const designsTreeAsync = createAsyncThunk(
    slicename + '/' + DesignsActionTypes.DESIGN_TREE_FETCH, 
    async () => {
        const response = await api.get('/antd/tree')
        return response.data
    } 
)

export const expandedData = (nested: IDesignTreeNode[], isNested?: boolean): string[] => {

    const expanded: string[] = []
    
    nested.forEach((node: IDesignTreeNode) => {

        if (node?.expanded) expanded.push( node.key );
        if (node.children && !(node?.isParent)) {
            const expandedChilds = expandedData( node.children, true );
            if ( expandedChilds.length ) expanded.push(...expandedChilds)
        }
    })

    if (!isNested) console.log('Return exp: ', expanded)

    return expanded
}


export const mapDesignTree = (
    inputTree: IDesignsContainer[] | IDesignsItem[] | undefined) => {

    const nodesContainer: Array<IDesignTreeNode> =
        inputTree?.length ? inputTree.map(

            (node: IDesignsContainer | IDesignsItem) => {

                // const __unic__ = nanoid()

                const element = 'group' in node ? node.group : node;

                const treeItem: IDesignTreeNode = {
                    active: element.activ,
                    title: element.name,
                    key: element.ins,
                    element: element,
                }

                if ( 'group' in node ) {

                    if (node?.group?.expand) treeItem.expanded = true
                    if (node?.child && node.child.length) treeItem.isParent = true

                    const nested = node?.next ? node.next :
                        (node?.child ? node.child : null)

                    if (nested && nested?.length)
                        treeItem.children = mapDesignTree(nested)


                } else {

                    treeItem.isLeaf = true
                    treeItem.isChild = true
                }

                return treeItem;

            }) : []

    //console.log( __container );

    return nodesContainer
}

export const designsTreeSlice = createSlice({
    name: slicename,
    initialState : initialState,
    reducers: {
        expand: (state, action: PayloadAction<Key[]>) => {
            state.expanded = action.payload
        },
        
        collaps: (state, action: PayloadAction<Key>) => {
            const index = state.expanded.indexOf( action.payload )
            if ( index >= 0 ) state.expanded.splice( index, 1)
        }
    },

    extraReducers: AB => { 
        
        AB.addCase( designsTreeAsync.pending, (state:IDesignsTreeState, action) => {
            state.isLoading = true
            console.log('State: ', action)
        
        }).addCase( designsTreeAsync.fulfilled, (state:IDesignsTreeState, action) => {
            state.isLoading = false
            state.origen = action.payload
            state.designs = mapDesignTree(state.origen?.tree)
            state.expanded = expandedData(state.designs)
            console.log('Sucess: ', state)
        
        }).addCase( designsTreeAsync.rejected, (state:IDesignsTreeState, action) => {
            state.isLoading = false
            state.isError = action.payload as string
            if ( state.origen ) delete state.origen
            if ( state.designs ) delete state.designs
            console.log('Error: ', action)
        })
    }
})

export const { expand, collaps } = designsTreeSlice.actions;
export const selectTreeDesign = (state: AppState) => state.designstree.designs;
export const selectTreeOrigen = (state: AppState) => state.designstree.origen;
export const selectTreeExpanded = (state: AppState) => state.designstree.expanded;

export default designsTreeSlice.reducer;