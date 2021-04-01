import { AuthActionTypes, IAuthentication, TAuthenticationAction } from '../../types/authentication'

const stateAuthentication : IAuthentication = {
    isAuthenticated : true,
    isLoading : false,
    isError : null,
    user : null
}

export const reducerAuthentication = ( 
    state = stateAuthentication, 
    action : TAuthenticationAction 
) : IAuthentication => {

    switch ( action.type ){
        case AuthActionTypes.AUTH_CHECK_LOGON : 
            return { isAuthenticated : false, isLoading : true, isError: null, user: null }

        case AuthActionTypes.AUTH_CHECK_SUCCESS : 
            return { isAuthenticated : true, isLoading : false, isError: null, user: action.payload }

        case AuthActionTypes.AUTH_CHECK_ERROR : 
            return { isAuthenticated : false, isLoading : false, isError: action.payload, user: {}}

        default: return state 
    }
}