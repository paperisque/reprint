import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDesignsTreeState, DesignsActionTypes, IDesignsContainer, IDesignsItem } from '../../types/designstree';
import { AppState/* , AppThunk */ } from '../';
import api from '../../api'
import { IDesignTreeNode } from '../../global';
import { Key } from 'react';
import { DataNode } from 'antd/lib/tree';

const initialState: IDesignsTreeState = {
    isLoading: false,
    isError: null,
    expanded: [],
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

        if (node?.expanded) expanded.push(node.key);
        if (node.children && !(node?.isParent)) {
            const expandedChilds = expandedData(node.children, true);
            if (expandedChilds.length) expanded.push(...expandedChilds)
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
                }

                if ('group' in node) {

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

const searchNode = (
    added: IDesignTreeNode, parent: Key,
    designs: IDesignTreeNode[]) => {

    return designs.map((node: IDesignTreeNode) => {
        if (node.key === parent) {
            node.children?.push(added)
        } else if (node.children?.length) {
            node.children = searchNode(added, parent,
                node.children)
        }

        return node
    })
}

export const designsTreeSlice = createSlice({
    name: slicename,
    initialState: initialState,
    reducers: {
        expand: (state, action: PayloadAction<Key[]>) => {
            state.expanded = action.payload
        },

        selected: (state, action: PayloadAction<DataNode | null>) => {
            state.selected = action.payload
        },

        addesign: (state, action: PayloadAction<IDesignTreeNode>) => {
            if (state.selected && state.designs) {
                state.designs = searchNode(
                    action.payload,
                    state.selected.key,
                    state.designs
                )
            }
        },
    },

    extraReducers: AB => {

        AB.addCase(designsTreeAsync.pending, (state: IDesignsTreeState, action) => {
            state.isLoading = true
            console.log('State: ', action)

        }).addCase(designsTreeAsync.fulfilled, (state: IDesignsTreeState, action) => {
            state.isLoading = false
            state.origen = action.payload
            state.designs = mapDesignTree(state.origen?.tree)
            state.expanded = expandedData(state.designs)
            console.log('Sucess: ', state)

        }).addCase(designsTreeAsync.rejected, (state: IDesignsTreeState, action) => {
            state.isLoading = false
            state.isError = action.payload as string
            if (state.origen) delete state.origen
            if (state.designs) delete state.designs
            console.log('Error: ', action)
        })
    }
})

export const { expand, selected } = designsTreeSlice.actions;
export const selectTreeDesign = (state: AppState) => state.designstree.designs;
export const selectTreeOrigen = (state: AppState) => state.designstree.origen;
export const selectTreeExpanded = (state: AppState) => state.designstree.expanded;
export const selectTreeSelected = (state: AppState) => state.designstree.selected;

export default designsTreeSlice.reducer;