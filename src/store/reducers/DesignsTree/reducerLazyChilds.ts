import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import { IDesignTreeNode } from "../../../types/designs"
import { DesignsActionTypes, IDesignsContainer, IDesignsTreeState } from "../../types/designstree"
import { mapDesignTree, mutationNode, slicename } from "./sliceDesignsMutation"
import api from "../../../api"


export const designsTreeLazyChilds = createAsyncThunk(
    slicename + '/' + DesignsActionTypes.DESIGN_TREE_LAZYCHILDS,
    async ( expanded: IDesignTreeNode ) => {
        const post = { parent: expanded.id }
        const response = await api.post('/antd/lazyChilds', post)
        return response.data
    }
)

const updateDesignsTree = (state: IDesignsTreeState, responce: IDesignsContainer) => {
    
    if ( !responce?.group.id || 
         !responce?.child?.length || !state?.designs) return state?.designs;
   
    return mutationNode( responce.group.ins, state.designs, (node) => {
        node.children  = mapDesignTree( responce.child, node.level + 1 )
        node.className = 'design-parent-node'
        node.hasChilds = true
        node.leaf      = true
        
        state.selected = state.selected?.key === node.key ? node : null

        return node
    })
}

const reducerLazyChilds = (builder: ActionReducerMapBuilder<IDesignsTreeState>) => {

    builder.addCase(designsTreeLazyChilds.pending, (state: IDesignsTreeState, action) => {
        state.isLoading = true
        console.log('Lazy State: ', action)

    }).addCase(designsTreeLazyChilds.fulfilled, (state: IDesignsTreeState, action) => {
        console.log('Lazy Sucess: ', action.payload)
        state.designs = updateDesignsTree(state, action.payload)
        state.isLoading = false

    }).addCase(designsTreeLazyChilds.rejected, (state: IDesignsTreeState, action) => {
        state.isLoading = false
        state.isError = action.payload as string
        console.log('Lazy Error: ', action)
    })

}

export default reducerLazyChilds