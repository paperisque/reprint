import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../../api"
import { IDesignTreeNode } from "../../../global"
import { DesignsActionTypes, IDesignsTreeState } from "../../../types/designstree"
import { slicename } from "./sliceDesignsMutation"

export const designsAddEbene = createAsyncThunk(
    slicename + '/' + DesignsActionTypes.DESIGN_TREE_ADDEBENE,
    async ( selected: IDesignTreeNode) => {
        const post = { parent: selected.id, 
                        level: selected.level,
                          key: selected.key }
        const response = await api.post('/antd/addEbene', post)
        return response.data
    }
)

const reducerAddEbene = (builder: ActionReducerMapBuilder<IDesignsTreeState>) => {

    builder.addCase(designsAddEbene.pending, (state: IDesignsTreeState, action) => {
        state.isLoading = true
        console.log('Add State: ', action)

    }).addCase(designsAddEbene.fulfilled, (state: IDesignsTreeState, action) => {
        console.log('Add Sucess: ', action.payload)
        //state.designs = updateDesignsTree(state, action.payload)
        state.isLoading = false

    }).addCase(designsAddEbene.rejected, (state: IDesignsTreeState, action) => {
        state.isLoading = false
        state.isError = action.payload as string
        console.log('Add Error: ', action)
    })

}

export default reducerAddEbene