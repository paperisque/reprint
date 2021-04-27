export enum ModeActionTypes {
    MODE_TREE = 'MODE_TREE',
    MODE_LIST = 'MODE_LIST',
}
export interface IDesignsMode {
    mode : boolean
}
export interface IModeTree {
    type : ModeActionTypes.MODE_TREE
}
export interface IModeList {
    type : ModeActionTypes.MODE_LIST
}

export type TModeAction = IModeTree | IModeList;