import { Layout } from "antd"
import { FaAdjust, FaBars } from "react-icons/fa"
import { ButtonsHeader, HeaderDashboard } from "../Components/Tools/Header"
import { IButtonsTools } from "../global"
import getTools from '../Components/Tools/index';
import React, { useEffect } from "react";
import { useAppDispatch } from '../hooks';
import { designsTreeAsync } from "../store/reducers/sliceDesignsTree";

const centerButtonsTools: IButtonsTools[] = [
    { icon: FaAdjust },
    { icon: FaBars },
    { icon: FaBars },
]

const lastButtonsTools: IButtonsTools[] = [
    { icon: FaAdjust },
    { icon: FaAdjust },
    { icon: FaAdjust },
]

export default function Designs() {

    const { firstButtonsTools } = getTools()
    
    const dispatch = useAppDispatch()

    useEffect(() => { dispatch(designsTreeAsync()) }, [dispatch])

    return (
        <React.Fragment>
            <Layout.Header className="dashboard-header dashboard-content">
                {HeaderDashboard({
                    pageClass: "dashboard-tools",
                    smf: 5,
                    smc: 15,
                    firstCol: () => {

                        return (
                            firstButtonsTools.map((button, index) => (
                                ButtonsHeader(button, index)
                            ))
                        )
                    },
                    centerCol: () => {
                        return (
                            centerButtonsTools.map((button, index) => (
                                ButtonsHeader(button, index)
                            ))
                        )
                    },
                    lastCol: () => {
                        return (
                            lastButtonsTools.map((button, index) => (
                                ButtonsHeader(button, index)
                            ))
                        )
                    }

                })}
            </Layout.Header>
            <Layout.Content>

            </Layout.Content>
        </React.Fragment>

    )
}