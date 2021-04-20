import { MouseEvent, ReactNode } from 'react';
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
    key: string;
    active: number,
    title: ReactNode | string;
    isLeaf?: boolean,
    element?: any;
    isParent?: boolean;
    isChild?: boolean;
    expanded?: boolean,
    children?: IDesignTreeNode[];
}
