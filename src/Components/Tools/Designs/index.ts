import { IButtonsTools } from "../../../global";
import Themer from "../Themer";
import DesignsMode from './DesignsMode';
import AddDesign from "./AddDesign";
import AddEbene from './AddEbene';

export const firstButtonsDesignTools = (): IButtonsTools[] => {
    return [
        { node: Themer },
        { node: DesignsMode, },
        { divider: "fr" },
    ]
}

export const centerButtonsDesignTools = (): IButtonsTools[] => {

    return [
        { node: AddEbene },
        { node: AddDesign },
        
    ]
}

