import Themer from "./Themer";
import { centerButtonsDesignTools, firstButtonsDesignTools } from './Designs'
import { IButtonsTools } from "../../global";

interface IButtonsBlockTools {
    firstButtonsTools:IButtonsTools[]
    centerButtonsTools?:IButtonsTools[]
}

export const selectedLocation = (): string => {
    return document.location.pathname
}


export default function useTools():IButtonsBlockTools {

    switch( selectedLocation() ) {
        
        case '/dashboard/designs': return {
            firstButtonsTools : firstButtonsDesignTools(),
            centerButtonsTools : centerButtonsDesignTools()
        }
        
        default: return {
            firstButtonsTools: [
                { node: Themer },
                { divider : "fr"},
            ]
        }
    }

}