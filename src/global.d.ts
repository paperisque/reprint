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
    div?:boolean
}

interface IButtonsTools {
    icon: IconType,
    click?: (event: MouseEvent) => void
}
