import { ThemeActionTypes, ITheme, TThemeAction } from '../types/themes';
import { load, save } from 'react-cookies'

const LITE:ITheme = { name: 'lite' }
const DARK:ITheme = { name: 'dark' }

const theme = load('theme') 

const stateTheme : ITheme = {
    name : theme || LITE.name
}

export const reducerThemes = ( 
    state = stateTheme, 
    action : TThemeAction 
) : ITheme => {

    switch ( action.type ){
        case ThemeActionTypes.THEME_LITE :
            save('theme', LITE.name, {})
            return LITE

        case ThemeActionTypes.THEME_DARK : 
            save('theme', DARK.name, {})
            return DARK

        default: return state 
    }
}