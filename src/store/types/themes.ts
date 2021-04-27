export enum ThemeActionTypes {
    THEME_LITE = 'THEME_LITE',
    THEME_DARK = 'THEME_DARK',
}
export interface ITheme {
    name : string
}
export interface IThemeLite {
    type : ThemeActionTypes.THEME_LITE
}
export interface IThemeDark {
    type : ThemeActionTypes.THEME_DARK
}

export type TThemeAction = IThemeLite | IThemeDark;