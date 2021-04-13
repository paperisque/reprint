import {  ModeActionTypes, TModeAction } from '../../types/designsmode';
import { Dispatch } from 'redux';
import { AppState } from '../';

export const designsModeActions = () => {
    
    return ( dispatch: Dispatch<TModeAction>, getState:() => AppState ) => {
        
        if ( getState().designsmode.mode ){
               dispatch({ type:ModeActionTypes.MODE_TREE })
        } else dispatch({ type:ModeActionTypes.MODE_LIST })
    }
}