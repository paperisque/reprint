import { Layout } from "antd"
import { FaAdjust, FaBars } from "react-icons/fa"
import { ButtonsHeader, HeaderDashboard } from "../Components/Tools/Header"
import { IButtonsTools, IDesignTreeNode } from "../global"
import getTools from '../Components/Tools/index';
import React, { useEffect } from "react";
import { useAppDispatch } from '../hooks';
import { designsTreeAsync, selectTreeData } from "../store/reducers/sliceDesignsTree";
import DesignsTree from "../Components/Designs/DesignsTree";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IDesignsContainer, IDesignsItem } from "../types/designstree";
//import { ITreeNode } from 'react-hyper-tree/dist/helpers/node';
//import { nanoid } from "@reduxjs/toolkit";

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

const MapDateTree = ( 
    inputTree: IDesignsContainer[] | IDesignsItem[] | undefined ) => {
    
    const __container: Array<IDesignTreeNode> = inputTree?.length ? inputTree.map( 
        
       ( node: IDesignsContainer | IDesignsItem ) => {

        const element = 'group' in node ? node.group : node
        
        
        //const expand = 'group' in node ? !!node.group.expand : false
        //const child = 'group' in node ? node.group.child : 0
        //const key = nanoid()

        const treeItem: IDesignTreeNode = {
            id: element.id,
            data: element,
            name: element.name,
            opened: true,
            options: {
                async: false,
                opened: true,
            }
        }

        if ( 'next' in node ) treeItem.children = MapDateTree( node.next )

        return treeItem
    }) : []

    return __container
}

export default function Designs() {

    const { firstButtonsTools } = getTools()
    const dispatch = useAppDispatch()

    useEffect(() => { dispatch(designsTreeAsync()) }, [dispatch])

    const inputTree = useTypedSelector(selectTreeData)
    const treeData: Array<IDesignTreeNode> = MapDateTree(inputTree?.tree)

    return (
        <React.Fragment>
            <Layout.Header className="dashboard-header dashboard-tools">
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
            <Layout.Content className="dashboard-content">
                <DesignsTree treeData={treeData} />
            </Layout.Content>
        </React.Fragment>

    )
}