import { ThemeActionTypes, TThemeAction } from '../../types/themes';
import { Dispatch } from 'redux';
import { AppState } from '../';

export const themeActions = () => {
    
    return ( dispatch: Dispatch<TThemeAction>, getState:()=> AppState ) => {
        
        if ( getState().themes.name === 'lite' ){
            dispatch({ type:ThemeActionTypes.THEME_DARK })

        } else dispatch({ type:ThemeActionTypes.THEME_LITE })
    }
}