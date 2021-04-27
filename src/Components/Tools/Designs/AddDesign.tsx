import AddButton from './AddButton';
import { FaCreditCard } from "react-icons/fa";
import { IDesignTreeNode } from '../../../types/designs';
import { useActions } from '../../../hooks';

export default function AddDesign() {

    const { designsAddDesignActions } = useActions()

    const disabled = ( selected: IDesignTreeNode ) => {
        return !selected || 
                selected?.leaf === false ||
              !!selected?.isChild || (
               !selected?.hasChilds &&
              !!selected?.children?.length )
    }

    return (
        <AddButton 
            title="Add Design"
            isDisabled={disabled}
            icon={<FaCreditCard />}
            key="add_design"
            __key="add_design"
            action={(e, selected) => {
                console.log('start add design')
                designsAddDesignActions(selected)
            }}
        />
        
    )
}