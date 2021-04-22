import { selectTreeSelected } from '../../../store/reducers/sliceDesignsTree';
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { FaDatabase } from "react-icons/fa";
import { Button, Tooltip } from "antd"
import { useTranslation } from 'react-i18next';
import { useActions } from '../../../hooks';
import { nanoid } from "@reduxjs/toolkit";


export default function AddDesign() {

    const { t } = useTranslation()

    const selected = useTypedSelector( selectTreeSelected )
    const { designsAddesignActions } = useActions()

    return (
        <Tooltip title={t('Add Design')} key="addesigntip">
            <Button
                type="text"
                shape="circle"
                size="small"
                disabled={!selected}
                icon={<FaDatabase />}
                key="addesign"
                onClick={() => {
                    console.log('...add design', selected)

                    if ( selected && selected.children ){

                        designsAddesignActions({
                            active: 0,
                            title: 'new1',
                            key: nanoid(),
                        })
                    }

                }}
            />
        </Tooltip>
    )
}