import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDesignsTreeState, DesignsActionTypes } from '../../types/designstree'
//import { AppState, AppThunk } from '../';

const initialState: IDesignsTreeState = {
    isLoading: false,
    isError: null,
    expand : [],
    data: {}
};

export const designsTreeAsync = createAsyncThunk(
    DesignsActionTypes.DESIGN_TREE_FETCH,
    async () => await fetch('/api/antd/tree').then( responce => responce.json()) 
)
  

export const designsTreeSlice = createSlice({
    name: 'DESIGN_TREE',
    initialState : initialState,
    reducers: {
        expand: (state, action: PayloadAction<number>) => {
            state.expand.push( action.payload )
        }
    },

    extraReducers: AB => { 
        
        AB.addCase( designsTreeAsync.pending, (state:IDesignsTreeState) => {
            state.isLoading = true
        
        }).addCase( designsTreeAsync.fulfilled, (state:IDesignsTreeState, action) => {
            state.isLoading = false
            state.data = action.payload
        
        }).addCase( designsTreeAsync.rejected, (state:IDesignsTreeState, action) => {
            state.isLoading = false
            state.isError = action.payload as string
            state.data = []
        })
    }
})

export const { expand } = designsTreeSlice.actions;

export default designsTreeSlice.reducer;