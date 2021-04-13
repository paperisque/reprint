import { ModeActionTypes, IDesignsMode, TModeAction } from '../../types/designsmode';

const TREE:IDesignsMode = { mode: false }
const LIST:IDesignsMode = { mode: true }

const stateMode : IDesignsMode = {
    mode : TREE.mode
}

export const reducerDesignsMode = ( 
    state = stateMode, 
    action : TModeAction 
) : IDesignsMode => {

    switch ( action.type ){
        case ModeActionTypes.MODE_LIST : return LIST
        case ModeActionTypes.MODE_TREE : return TREE

        default: return state 
    }
}