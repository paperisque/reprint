//import { useState } from 'react'
import { Button } from "antd"
import { FaAdjust } from "react-icons/fa";
import { useActions } from '../../hooks';

export default function Themer(){
    const { themeActions } = useActions()

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