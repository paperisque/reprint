import classname from 'classnames'
import { Button, Tooltip } from "antd"
import { FaBars, FaSitemap } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useActions } from '../../../hooks';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { AppState } from '../../../store';

export default function DesignsMode() {
    
    const { t } = useTranslation()
    const { designsModeActions } = useActions()

    const mode = useTypedSelector(
        ( state: AppState ) => 
          state.designsmode.mode
    );

    return (
        <Tooltip title={mode 
        ? t('Switch to list view')
        : t('Switch to level view')} key="modetip">
            <Button key="mode"
                onClick={designsModeActions}
                className={classname({ 'design-listmode': mode })}
                type="text"
                shape="circle"
                size="small">{mode ?
                    <FaSitemap /> :
                    <FaBars />}
            </Button>
        </Tooltip>
    )
}