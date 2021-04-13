export enum DesignsActionTypes {
    DESIGNS_GET_FETCH   = 'DESIGNS_GET_FETCH',
    DESIGNS_GET_SUCCESS = 'DESIGNS_GET_SUCCESS',
    DESIGNS_GET_ERROR   = 'DESIGNS_GET_ERROR',
    DESIGNS_EXPAND   = 'DESIGNS_EXPAND'
}

export interface IDesignsElement {
    id: number
    idx : number,
    gd: number,
    position: number,
    name:string,
    active:number,
}

export interface IDesignsGroup extends IDesignsElement {
    expand:string,
    child: number    
}

export interface IDesignsItem extends IDesignsElement {
    options:any,
    gro: number,
    pc:number,
    arname:string
}

export interface IDesignsContainer {
    group : IDesignsGroup,
    next?: Array<IDesignsContainer>,
    child?: Array<IDesignsItem>
} 

export interface IDesignsTree {
    org:number,
    antwort : boolean,
    count: number,
    total: number,
    grouped?: number,
    tree?: Array<IDesignsContainer>
} 

export interface IDesignsTreeState {
    isLoading : boolean,
    isError : null | string,
    collapsed: number[],
    data : IDesignsTree | {},
}

export interface IDesignsTreeFetch {
    type : DesignsActionTypes.DESIGNS_GET_ERROR,
}

export interface IDesignsTreeSuccess {
    type : DesignsActionTypes.DESIGNS_GET_SUCCESS,
    payload : IDesignsTree
}

export interface IDesignsTreeError {
    type : DesignsActionTypes.DESIGNS_GET_ERROR,
    payload : string
}

export interface IDesignsTreeExpand {
    type : DesignsActionTypes.DESIGNS_EXPAND,
    expand : number
}

export type TDesignsAction = 
    IDesignsTreeFetch | 
    IDesignsTreeSuccess | 
    IDesignsTreeError |
    IDesignsTreeExpand;