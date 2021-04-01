
export enum AuthActionTypes {
    AUTH_CHECK_LOGON   = 'AUTH_CHECK_LOGON',
    AUTH_CHECK_SUCCESS = 'AUTH_CHECK_SUCCESS',
    AUTH_CHECK_ERROR   = 'AUTH_CHECK_ERROR'
}

export interface IUser {
    Id : number
} 

export interface IAuthentication {
    isAuthenticated : boolean,
    isLoading : boolean,
    isError : null | string,
    user : null | {},
}

export interface IAuthActionLogon {
    type : AuthActionTypes.AUTH_CHECK_LOGON,
}

export interface IAuthActionSuccess {
    type : AuthActionTypes.AUTH_CHECK_SUCCESS,
    payload : IUser
}

export interface IAuthActionError {
    type : AuthActionTypes.AUTH_CHECK_ERROR,
    payload : string
}

export type TAuthenticationAction = IAuthActionLogon | IAuthActionSuccess | IAuthActionError;