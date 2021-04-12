//import { useState } from 'react'
import { Button } from "antd"
import { useState } from "react";
import { FaBars, FaSitemap } from "react-icons/fa";
import { BaseButtonProps } from "antd/lib/button/button";

export default function DesignsMode() {
    const [mode, setMode] = useState(false)

    const handleMode = () => {
        setMode((mode: boolean) => {
            const changemode = !mode;
            return changemode
        })
    }

    //const Icon:React.ReactNode = mode ? <FaBars/> : <FaSitemap/>;
    
    const buttonsProps:BaseButtonProps = {
        className:"design-mode-btn",
        type:"text", 
        shape:"circle",
        size:"small", 
        icon:FaBars
    }

    return (
        <Button key="mode" {...buttonsProps}
                onClick={handleMode}
        />
    )
}