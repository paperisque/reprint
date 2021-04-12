import { MouseEventHandler } from 'react';
import { IconType } from 'react-icons';

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
    icon?: IconType,
    click?: (event: any) => void,
    class?:string,
    node?: () => React.ReactNode
}
