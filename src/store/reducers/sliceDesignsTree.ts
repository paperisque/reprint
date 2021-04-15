import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDesignsTreeState, DesignsActionTypes } from '../../types/designstree';
import { AppState/* , AppThunk */ } from '../';
import api from '../../api'

const initialState: IDesignsTreeState = {
    isLoading: false,
    isError: null,
    expand : [],
    data: null 
};

export const slicename: string = 'designstree';

export const designsTreeAsync = createAsyncThunk(
    slicename + '/' + DesignsActionTypes.DESIGN_TREE_FETCH, 
    async () => {
        const response = await api.get('/antd/tree')
        return response.data
    } 
)

export const designsTreeSlice = createSlice({
    name: slicename,
    initialState : initialState,
    reducers: {
        expand: (state, action: PayloadAction<number>) => {
            state.expand.push( action.payload )
        }
    },

    extraReducers: AB => { 
        
        AB.addCase( designsTreeAsync.pending, (state:IDesignsTreeState, action) => {
            state.isLoading = true
            console.log('State: ', action)
        
        }).addCase( designsTreeAsync.fulfilled, (state:IDesignsTreeState, action) => {
            state.isLoading = false
            state.data = action.payload
            console.log('Sucess: ', action)
        
        }).addCase( designsTreeAsync.rejected, (state:IDesignsTreeState, action) => {
            state.isLoading = false
            state.isError = action.payload as string
            state.data = null
            console.log('Error: ', action)
        })
    }
})

export const { expand } = designsTreeSlice.actions;
export const selectTreeData = (state: AppState) => state.designstree.data;

export default designsTreeSlice.reducer;