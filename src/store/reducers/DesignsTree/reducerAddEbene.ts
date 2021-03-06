import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../../api"
import { IDesignTreeNode } from "../../../types/designs"
import { DesignsActionTypes, IDesignsAppend, IDesignsTreeState } from "../../types/designstree"
import { mutationNode, slicename } from "./sliceDesignsMutation"

export const designsAddEbene = createAsyncThunk(
    slicename + '/' + DesignsActionTypes.DESIGN_TREE_ADDEBENE,
    async (selected: IDesignTreeNode) => {
        const post = {
            parent: selected.id,
            level: selected.level,
            key: selected.key
        }
        const response = await api.post('/antd/addEbene', post)
        return response.data
    }
)

const insertDesignsEbene = (state: IDesignsTreeState, responce: IDesignsAppend) => {
    if (!responce?.id) return state.designs;
    if (!state.selected?.key || state.selected.id !== responce.gd) return state.designs;
    return mutationNode(responce.parentKey, state.designs, (node) => {

        node.children = node?.children || []
        node.children.push({
            id: responce.id,
            key: responce.ins,
            label: responce.name,
            level: responce.level,
            active: responce.activ,
            position: responce.position
        })

        return node
    })
}


const reducerAddEbene = (builder: ActionReducerMapBuilder<IDesignsTreeState>) => {

    builder.addCase(designsAddEbene.pending, (state: IDesignsTreeState, action) => {
        state.isLoading = true
        console.log('Add State: ', action)

    }).addCase(designsAddEbene.fulfilled, (state: IDesignsTreeState, action) => {
        console.log('Add Sucess: ', action.payload)
        state.designs = insertDesignsEbene(state, action.payload)
        state.isLoading = false

    }).addCase(designsAddEbene.rejected, (state: IDesignsTreeState, action) => {
        state.isLoading = false
        state.isError = action.payload as string
        console.log('Add Error: ', action)
    })

}

export default reducerAddEbene