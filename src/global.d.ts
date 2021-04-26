import { MouseEvent, Key, ReactNode } from 'react';
import { IconType } from 'react-icons';
import React from 'react';

interface HeaderLayout {
    pageClass: string,
    lastColClass?: string,
    firstCol: () => React.ReactNode,
    centerCol?: () => React.ReactNode,
    lastCol?: () => React.ReactNode,
    smf?: number,
    smc?: number,
    xsr?: number,
}

interface IButtonsTools {
    divider?: string,
    title?: string,
    icon?: IconType,
    click?: (event: MouseEvent) => void,
    class?:string,
    node?: () => React.ReactNode
    disabled?:boolean
}

interface IDashboardRoute {
    key: string,
    title: string,
    view: React.ReactElement
}

export interface IDesignTreeNodeOld {
    readonly id: number | string;
    data?: IData;
    name: string;
    opened?: boolean,
    options?: IDataOptions;
    children?: ITreeNode[];
}
export interface IDesignTreeNode {
    id:number;
    key: string;
    active: number,
    level: number,
    title: string;
    leaf?: boolean,
    element?: any;
    position: number;
    className?: any;
    hasChilds?: boolean;
    isChild?: boolean;
    expanded?: boolean,
    children?: IDesignTreeNode[];
}
export interface IEventTreeExpand {
    node: EventDataNode;
    expanded?: boolean;
    nativeEvent: MouseEvent;
}
export interface IEventTreeSelected {
    event?: "select";
    node: EventDataNode;
    selected?: boolean;
    nativeEvent: MouseEvent;
    selectedNodes?: DataNode[];
}

export interface PropsEventExpand {
    expandedKeys: Key[],
    info: IEventTreeExpand
}
export interface PropsEventSelected {
    selectedKeys: Key[],
    info: IEventTreeSelected
}

export interface PropsAddButton {
    __key:string,
    title: string,
    icon: ReactNode,
    isDisabled(selected:IDesignTreeNode), 
    action(e:MouseEvent, selected:IDesignTreeNode)
}


