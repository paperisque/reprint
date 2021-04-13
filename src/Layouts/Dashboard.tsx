import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { HeaderDashboard } from '../Components/Tools/Header'
import Designs from '../Views/Designs';
import Blank from '../Views/Blank';
import { selectedLocation } from '../Components/Tools';

export default function Dashboard() {

    const { t } = useTranslation()

    const items = [
        { key: '/dashboard/fonts', title: t('Fonts'), view: Blank },
        { key: "/dashboard/langs", title: t('Language'), view: Blank },
        { key: "/dashboard/images", title: t('Image Collection'), view: Blank },
        { key: "/dashboard/formats", title: t('Text formatting'), view: Blank },
        { key: "/dashboard/blocks", title: t('Block formatting'), view: Blank },
        { key: "/dashboard/designs", title: t('Print templates'), view: Designs }
    ]

    return (
        <Layout className="dashboard-layout">
            <Layout.Header className="dashboard-header">
                {HeaderDashboard({
                    pageClass: "dashboard-menu",
                    lastColClass: "dashboard-logo",
                    smf: 20,
                    xsr: 0,
                    firstCol: () => {
                        return (
                            <Menu
                                mode="horizontal"
                                selectable
                                selectedKeys={[selectedLocation()]}
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
            <Switch>{
                items.map((route, key) => {
                    return (
                        <Route
                            path={route.key}
                            component={route.view}
                            key={key}
                        />
                    )
                })
            }</Switch>
        </Layout>
    )

}