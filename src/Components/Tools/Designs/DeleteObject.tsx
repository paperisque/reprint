import AddButton from './AddButton';
import { FaTrashAlt } from "react-icons/fa";
import { IDesignTreeNode } from '../../../types/designs';
import { useActions } from '../../../hooks';
import { Modal, message } from 'antd';
import api from '../../../api';

export default function DeleteObject() {

    const { designsRemoveActions } = useActions()

    const disabled = (selected: IDesignTreeNode) => { 
        return !selected || selected.children?.length || selected.leaf === false
    }

    const checkDelete = async (selected: IDesignTreeNode) => {
        const response = await api.post('/antd/removeCheck', {
            id: selected.id, gro: selected?.data?.gro
        })

        if ( response?.data === 0 ){
            ModalConfirm( selected );
        } else message.warning('Designs in using')
    }

    function ModalConfirm(selected: IDesignTreeNode) {
        const modal = Modal.confirm({
            content: (
               <span>Are you sure delete this?</span>
            ),
            okText:"Yes",
            cancelText:"No",
            onOk:() => {
                console.log('start remove design')
                designsRemoveActions(selected)
            }
        });

        setTimeout(() => {
            modal.destroy();
        }, 6000);
    }

    return (
        <AddButton
            title="Delete"
            isDisabled={disabled}
            icon={<FaTrashAlt />}
            key="remove_object"
            __key="remove_object"
            action={(e, selected) => {
                checkDelete(selected)
            }}
        />
    )
}