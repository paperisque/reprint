import React from 'react';
import { Divider, Layout, Menu, PageHeader, Typography, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { FaAdjust, FaBars } from "react-icons/fa";
import { HeaderLayout, IButtonsTools } from '../global';
import { useTranslation } from 'react-i18next';
import getTools from '../Components/Tools'

export default function DefaultLayout() {

    const { t } = useTranslation()

    const items = [
        { key: '/dashboard/fonts', title: t('Fonts') },
        { key: "/dashboard/langs", title: t('Language') },
        { key: "/dashboard/images", title: t('Image Collection') },
        { key: "/dashboard/formats", title: t('Text formatting') },
        { key: "/dashboard/blocks", title: t('Block formatting') },
        { key: "/dashboard/designs", title: t('Print templates') }
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

    const setButton = (button: IButtonsTools, index: number) => {
        if ( button.divider ) {
            return (
                <Divider key={button.divider} type="vertical" />
            )
        } else if ( button.icon ) {
            return (
                <Button type="text"
                    shape="circle"
                    size="small"
                    className={button.class}
                    icon={<button.icon />}
                    key={index}
                    onClick={button.click}
                />
            )
        } else if ( button.node ){
            return button.node()
        }
    }


    const selected = (): string => {
        return document.location.pathname
    }

    const header = (props: HeaderLayout) => {

        const rightClass = ["header-right"];
        if (props.lastColClass) rightClass.push(
            props.lastColClass)

        return (
            <PageHeader className={props.pageClass}>
                <Row>
                    <Col sm={props.smf}>{props.firstCol()}</Col>
                    
                    {props.centerCol === undefined ? (<></>) : (
                    <Col className="header-center"
                         sm={props.smc}>{props.centerCol()}</Col>
                    )}
                    
                    {props.lastCol === undefined ? (<></>) : (
                        <Col className={rightClass.join(' ')}
                            xs={props.xsr} md={4}
                        >
                            <Divider key="last" type="vertical" />
                            {props.lastCol()}
                        </Col>
                    )}
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
                    smf: 20,
                    xsr: 0,
                    firstCol: () => {
                        return (
                            <Menu
                                mode="horizontal"
                                selectable
                                selectedKeys={[selected()]}
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
                    smf: 5,
                    smc: 15,
                    firstCol: () => {

                        const { firstButtonsTools } = getTools(selected())

                        return (
                            firstButtonsTools.map((button, index) => (
                                setButton(button, index)
                            ))
                        )
                    },
                    centerCol: () => {
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