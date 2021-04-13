import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDesignsTreeState, DesignsActionTypes } from '../../types/designstree'
//import { AppState, AppThunk } from '../';

const initialState: IDesignsTreeState = {
    isLoading: false,
    isError: null,
    collapsed : [],
    data: {}
};

const reducerName = 'designstree';

export const designsTreeAsync = createAsyncThunk(
    reducerName + '/' + DesignsActionTypes.DESIGNS_GET_FETCH,
    async () => await fetch('/api/antd/tree').then( responce => responce.json()) 
)
  

export const designsTreeSlice = createSlice({
    name: reducerName,
    initialState : initialState,
    reducers: {
        collapsed: (state, action: PayloadAction<number>) => {
            state.collapsed.push( action.payload )
        }
    },

    extraReducers: (builder) => {
        builder
          .addCase( designsTreeAsync.pending, (state:IDesignsTreeState) => {
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

export const { collapsed } = designsTreeSlice.actions;

export default designsTreeSlice.reducer;