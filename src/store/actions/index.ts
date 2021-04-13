import * as themeActionsCreators from './themeAction';
import * as designsModeActionsCreators from './designsModeAction';
import * as designsTreeActionsCreators from './designsTreeAction';

//const allReducers = Object.assign({}, reducers1, reducers2);

const ActionCreators = {
    ...themeActionsCreators, 
    ...designsModeActionsCreators,
    ...designsTreeActionsCreators
}

export default ActionCreators
