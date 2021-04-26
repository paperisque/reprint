import AddButton from './AddButton';
import { FaDatabase } from "react-icons/fa";
import { IDesignTreeNode } from '../../../global';
import { useActions } from '../../../hooks/index';

export default function AddEbene() {

    const { designsAddEbeneActions } = useActions()

    const disabled = (selected: IDesignTreeNode) => {
        return !selected
             || selected?.leaf === false
             || selected?.isChild
             || selected?.hasChilds
             
    }

    return (
        <AddButton 
            title="Add Ebene"
            isDisabled={disabled}
            icon={<FaDatabase />}
            __key="add_ebene"
            action={(e, selected ) => {
                console.log('start add ebene')
                designsAddEbeneActions( selected )
            }}
        />
        
    )
}