import React from 'react';
import { Divider, Layout, Menu, PageHeader, Typography, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { FaAdjust, FaBars } from "react-icons/fa";
import { HeaderLayout, IButtonsTools } from '../global';

export default function DefaultLayout() {

    const items = [
        { key: '/dashboard/fonts', title: 'Schriften' },
        { key: "/dashboard/langs", title: 'Sprachen' },
        { key: "/dashboard/images", title: 'Bildcollectionen' },
        { key: "/dashboard/formats", title: 'Textformatierungen' },
        { key: "/dashboard/blocks", title: 'Blockformatierungen' },
        { key: "/dashboard/designs", title: 'Druckvorlagen' }
    ]

    const firstButtonsTools: IButtonsTools[] = [
        { icon: FaAdjust },
        { icon: FaBars },
        { icon: FaBars },
    ]

    const centerButtonsTools: IButtonsTools[] = [
        { icon: FaAdjust },
        { icon: FaBars },
        { icon: FaBars },
        { icon: FaBars },
        { icon: FaBars },
        { icon: FaBars },
    ]

    const lastButtonsTools: IButtonsTools[] = [
        { icon: FaAdjust },
        { icon: FaAdjust },
        { icon: FaAdjust },
    ]

    const setButton = (button: IButtonsTools, index:number) => {
        return (
            <Button type="text"
                shape="circle"
                size="small"
                icon={<button.icon />}
                key={index}
            />
        )
    }


    const selected = (): string[] => {
        return [document.location.pathname]
    }

    const header = (props: HeaderLayout) => {

        const rightClass = ["header-right"];
        if (props.lastColClass) rightClass.push(
            props.lastColClass)

        return (
            <PageHeader className={props.pageClass}>
                <Row>
                    <Col sm={props.smf}>{props.firstCol()}</Col>
                    <Col className="header-center"
                         sm={props.smc}
                    >
                        {(props.centerCol == null) || props.centerCol()}
                    </Col>     
                    <Col className={rightClass.join(' ')}
                         xs={props.xsr} md={4}
                    >
                        <Divider key="0" type="vertical" />
                        {(props.lastCol == null) || props.lastCol()}
                    </Col>
                </Row>
            </PageHeader>
        )
    }

    return (
        <Layout className="dashboard-layout">
            <Layout.Header className="dashboard-header">
                {header({
                    pageClass: "dashboard-menu",
                    lastColClass: "dashboard-logo",
                    smf:20,
                    xsr:0,
                    firstCol: () => {
                        return (
                            <Menu
                                mode="horizontal"
                                selectable
                                selectedKeys={selected()}
                            >{
                                    items.map(item => (
                                        <Menu.Item key={item.key}>
                                            <Link to={item.key}>{item.title}</Link>
                                        </Menu.Item>
                                    ))
                                }
                            </Menu>
                        )
                    },
                    lastCol: () => {
                        return (
                            <Typography.Text key="1">xaidung W2P</Typography.Text>
                        )
                    }
                })}
            </Layout.Header>
            <Layout.Header className="dashboard-header dashboard-content">
                {header({
                    pageClass: "dashboard-tools",
                    smf:5,
                    smc:15,
                    firstCol: () => {
                        return (
                            firstButtonsTools.map((button, index) => (
                                setButton(button, index)
                            ))
                        )
                    },
                    centerCol:  () => {
                        return (
                            centerButtonsTools.map((button, index) => (
                                setButton(button, index)
                            ))
                        )
                    },
                    lastCol: () => {
                        return (
                            lastButtonsTools.map((button, index) => (
                                setButton(button, index)
                            ))
                        )
                    }

                })}
            </Layout.Header>
        </Layout>
    )

}