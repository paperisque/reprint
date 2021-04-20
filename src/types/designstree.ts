import { Key } from "react";
import { IDesignTreeNode } from "../global";

export enum DesignsActionTypes {
    DESIGN_TREE_FETCH   = 'DESIGN_TREE_FETCH',
    DESIGN_TREE_SUCCESS = 'DESIGN_TREE_SUCCESS',
    DESIGN_TREE_ERROR   = 'DESIGN_TREE_ERROR',
    DESIGN_TREE_EXPAND  = 'DESIGN_TREE_EXPAND'
}

export interface IDesignsElement {
    id: number
    idx : number,
    gd: number,
    ins: string,
    position: number,
    name:string,
    activ:number,
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
    expanded: Key[],
    origen?: IDesignsTree, 
    designs?: IDesignTreeNode[],
}

export interface IDesignsTreeFetch {
    type : DesignsActionTypes.DESIGN_TREE_FETCH,
}

export interface IDesignsTreeSuccess {
    type : DesignsActionTypes.DESIGN_TREE_SUCCESS,
    payload : IDesignsTree
}

export interface IDesignsTreeError {
    type : DesignsActionTypes.DESIGN_TREE_ERROR,
    payload : string
}

export interface IDesignsTreeExpand {
    type : DesignsActionTypes.DESIGN_TREE_EXPAND,
    expand : number
}

export type TDesignsAction = 
    IDesignsTreeFetch | 
    IDesignsTreeSuccess | 
    IDesignsTreeError |
    IDesignsTreeExpand;