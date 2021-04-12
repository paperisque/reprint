//import { useState } from 'react'
import { Button } from "antd"
import { FaAdjust } from "react-icons/fa";
import { useTheme } from '../../hooks/useTheme';

export default function Themer(){
    const { themeActions } = useTheme()

    return (
        <Button
            className="themer-btn" 
            type="text"
            shape="circle"
            size="small"
            icon={<FaAdjust />}
            key="theme"
            onClick={themeActions}
        /> 
    )
}