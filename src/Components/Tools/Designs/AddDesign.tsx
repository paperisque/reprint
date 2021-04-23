import {
    selectTreeSelected
} from '../../../store/reducers/sliceDesignsTree';
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { FaDatabase } from "react-icons/fa";
import { Button, Tooltip } from "antd"
import { useTranslation } from 'react-i18next';
import { useActions } from '../../../hooks';
import { nanoid } from "@reduxjs/toolkit";
import { useMemo } from 'react';
import { IDesignTreeNode } from '../../../global';

export default function AddDesign() {

    const { t } = useTranslation()

    const selected = useTypedSelector(selectTreeSelected) as IDesignTreeNode
    const { designsAddesignActions } = useActions()

    const disabled = useMemo(() => {
        return !selected ||
            !selected.children ||
            selected.level > 3
    }, [selected])

    return (
        <Tooltip title={t('Add Design')} key="addesigntip">
            <Button
                type="text"
                shape="circle"
                size="small"
                disabled={disabled}
                icon={<FaDatabase />}
                key="addesign"
                onClick={() => {
                    designsAddesignActions({
                        level: selected.level + 1,
                        title: 'new1',
                        key: nanoid(),
                        active: 0,
                    })
                }}
            />
        </Tooltip>
    )
}