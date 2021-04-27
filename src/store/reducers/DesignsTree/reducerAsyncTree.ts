import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { expandedData, mapDesignTree, slicename } from "./sliceDesignsMutation";
import { DesignsActionTypes, IDesignsTreeState } from '../../types/designstree';
import api from '../../../api'

const postInitAuth = () => {

    return process.env.REACT_APP_ORG &&
        process.env.REACT_APP_USER ? {
        org: process.env.REACT_APP_ORG,
        user: process.env.REACT_APP_USER
    } : {}
}


export const designsTreeAsync = createAsyncThunk(
    slicename + '/' + DesignsActionTypes.DESIGN_TREE_FETCH,
    async () => {
        const response = await api.post('/antd/tree', postInitAuth())
        return response.data
    }
)

const reducerAsyncTree = (builder: ActionReducerMapBuilder<IDesignsTreeState>) => {

    builder.addCase(designsTreeAsync.pending, (state: IDesignsTreeState, action) => {
        state.isLoading = true
        console.log('State: ', action)

    }).addCase(designsTreeAsync.fulfilled, (state: IDesignsTreeState, action) => {
        state.origen = action.payload
        state.designs = mapDesignTree(state.origen?.tree)
        state.expanded = expandedData(state.designs)
        state.selected = null 
        state.isLoading = false
        console.log('Sucess: ', state)

    }).addCase(designsTreeAsync.rejected, (state: IDesignsTreeState, action) => {
        state.isLoading = false
        state.isError = action.payload as string
        if (state.origen) delete state.origen
        state.designs = []
        console.log('Error: ', action)
    })

}

export default reducerAsyncTree