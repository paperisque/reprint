import Themer from "./Themer";
import { firstButtonsDesignTools } from './Designs'
import { IButtonsTools } from "../../global";

interface IButtonsBlockTools {
    firstButtonsTools:IButtonsTools[]
}

export default function getTools(key:string):IButtonsBlockTools {

    switch( key ) {
        
        case '/dashboard/designs': return {
            firstButtonsTools : firstButtonsDesignTools
        }
        
        default: return {
            firstButtonsTools: [
                { node: Themer },
                { divider : "fr"},
            ]
        }
    }

}