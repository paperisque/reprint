import {
    selectTreeSelected
} from '../../../store/reducers/DesignsTree/sliceDesignsTree';
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IDesignTreeNode, PropsAddButton } from '../../../global';
import { Button, Tooltip } from "antd"
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';


export default function AddButton(props: PropsAddButton) {

    const { t } = useTranslation()

    const selected = useTypedSelector(selectTreeSelected) as IDesignTreeNode

    const disabled = useMemo(() => {
        console.log('Selected: ', selected)
        return props.isDisabled( selected )
    }, [ props, selected ])

    return (
        <Tooltip title={t(props.title)} 
                 key={props.__key + 'tip'}>
            <Button
                type="text"
                shape="circle"
                size="small"
                disabled={disabled}
                icon={props.icon}
                key={props.__key + 'button'}
                onClick={(e) => {
                    props.action(e, selected)
                }}
            />
        </Tooltip>
    )
}