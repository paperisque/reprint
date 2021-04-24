import { Layout, Spin } from "antd"
import { FaAdjust, FaCreditCard } from "react-icons/fa"
import { ButtonsHeader, HeaderDashboard } from "../Components/Tools/Header"
import { IButtonsTools, IEventTreeSelected } from '../global';
import getTools from '../Components/Tools/index';
import React, { useEffect, Key } from "react";
import { useAppDispatch } from '../hooks';
import {
    designsTreeAsync,
    selectTreeDesign,
    selectTreeExpanded
} from '../store/reducers/sliceDesignsTree';
import { useTypedSelector } from "../hooks/useTypedSelector";
import DesignsOverview from "../Components/Designs";
import { useActions } from '../hooks/index';


const lastButtonsTools: IButtonsTools[] = [
    { icon: FaCreditCard },
    { icon: FaAdjust },
    { icon: FaAdjust },
]


export default function Designs() {

    const dispatch = useAppDispatch()
    const { designsSelectedActions } = useActions()

    useEffect(() => { dispatch(designsTreeAsync()) }, [dispatch])

    const inputData = useTypedSelector(selectTreeDesign)
    const inputExpanded = useTypedSelector(selectTreeExpanded)

    const onSelection = (selectedKeys: Key[], info: any): void => {
        const __info = info as IEventTreeSelected

        if (__info.selected && __info.selectedNodes?.length) {
            designsSelectedActions(__info.selectedNodes[0])
        } else designsSelectedActions(null)

    }

    const { firstButtonsTools, centerButtonsTools } = getTools()

    return (
        <React.Fragment>
            <Layout.Header 
                className="dashboard-header dashboard-tools">
                {HeaderDashboard({
                    pageClass: "",
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
                        return centerButtonsTools?.length ? (
                            centerButtonsTools.map((button, index) => (
                                ButtonsHeader(button, index)
                            ))
                        ) : <></>
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

            <Layout.Content className="dashboard-content">
                {inputData?.length ? (
                    <DesignsOverview
                        treeData={inputData}
                        expanded={inputExpanded}
                        setSelected={onSelection}
                    />
                ) : <Spin className="dashboard-content-loader" />}
                                               
            </Layout.Content>

        </React.Fragment>

    )
}