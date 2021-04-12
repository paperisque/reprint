//import { useState } from 'react'
import { Button } from "antd"
import { useState } from "react";
import { FaBars, FaSitemap } from "react-icons/fa";
import classname from 'classnames'

export default function DesignsMode() {
    const [mode, setMode] = useState(false)

    const handleMode = () => {
        setMode((mode: boolean) => {
            const changemode = !mode;
            return changemode
        })
    }

    return (
        <Button key="mode" 
            onClick={handleMode}        
            className={classname({'design-listmode': mode})}
            type="text"
            shape="circle"
            size="small">{mode ? 
           <FaSitemap/> : 
           <FaBars/>}
        </Button>
    ) 
}