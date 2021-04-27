import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../../api"
import { IDesignTreeNode } from "../../../types/designs"
import { DesignsActionTypes, IDesignsAppend, IDesignsTreeState } from "../../types/designstree"
import { mutationNode, searchNode, slicename } from "./sliceDesignsMutation"
//import { nanoid } from '@reduxjs/toolkit';

export const designsRemove = createAsyncThunk(
    slicename + '/' + DesignsActionTypes.DESIGN_TREE_REMDESIGN,
    async (selected: IDesignTreeNode) => {
        const post = { id: selected.id }
        const response = await api.post('/antd/removeObject', post)
        return response.data
    }
)

const removeDesignsObject = (state: IDesignsTreeState, responce: IDesignsAppend) => {
    if (!responce?.id) return state.designs;

    const removed = searchNode(( index, node, parent ) => {
        if ( node.key === state.selected?.key ) return {
            parent: parent, index: index
        }
    }, state.designs ) as {parent:IDesignTreeNode, index: number}

    return removed ? mutationNode( removed.parent.key, state.designs, (node) => {
        node.children?.splice( removed.index, 1 );
        return node
    }) : state.designs
}


const reducerAddRemove = (builder: ActionReducerMapBuilder<IDesignsTreeState>) => {

    builder.addCase(designsRemove.pending, (state: IDesignsTreeState, action) => {
        state.isLoading = true
        console.log('Add State: ', action)

    }).addCase(designsRemove.fulfilled, (state: IDesignsTreeState, action) => {
        console.log('Add Sucess: ', action.payload)
        state.designs = removeDesignsObject(state, action.payload)
        state.isLoading = false

    }).addCase(designsRemove.rejected, (state: IDesignsTreeState, action) => {
        state.isLoading = false
        state.isError = action.payload as string
        console.log('Add Error: ', action)
    })

}

export default reducerAddRemove