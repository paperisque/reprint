import AddButton from './AddButton';
import { FaCreditCard } from "react-icons/fa";
import { IDesignTreeNode } from '../../../global';
import { useActions } from '../../../hooks';
import { nanoid } from '@reduxjs/toolkit';

export default function AddDesign() {

    const { designsAddesignActions } = useActions()

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
                designsAddesignActions({
                    level: selected.level + 1,
                    position: 0,
                    id: 0,
                    title: 'new1',
                    key: nanoid(),
                    active: 0,
                })
            }}
        />
        
    )
}