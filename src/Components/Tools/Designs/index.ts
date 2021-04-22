import { IButtonsTools } from "../../../global";
import Themer from "../Themer";
import DesignsMode from './DesignsMode';
import AddDesign from "./AddDesign";

export const firstButtonsDesignTools = (): IButtonsTools[] => {
    return [
        { node: Themer },
        { node: DesignsMode, },
        { divider: "fr" },
    ]
}

export const centerButtonsDesignTools = (): IButtonsTools[] => {

    return [
        { node: AddDesign },
    ]
}

