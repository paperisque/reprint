import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import { Route, Switch, Redirect } from "react-router-dom";
import Routes from "../Routes";
import AdminHeader from "../Components/Header/AdminHeader"
import AdminFooter from "../Components/Footer/AdminFooter"
import Sidebar from "../Components/Sidebar/Sidebar"
import { RouteType } from '../Models';
const { Content } = Layout;

const AdminLayout = ( props: any ) => {
    
    const [state, setState] = useState({
        collapsed: false,
    });

    const getRoutes = (layoutRoutes: RouteType[]): null | any => {
        return layoutRoutes.map((prop, key) => {
            // if a route doesn't have any subMenu and its layout is admin
            const propPath = prop.layout + prop.path;
            if (prop.layout === "/admin" && !prop.subMenu) {
                return (
                    <Route
                        exact
                        path={propPath}
                        component={(): JSX.Element => <prop.component />}
                        key={key}
                    />
                );
                // For route that has suMenu, loop each item and find the exact route
            } else if (prop.subMenu) {
                return (
                    prop.subMenu !== undefined &&
                    prop.subMenu.map((sub, key) => {
                        return (
                            <Route
                                exact
                                path={sub.layout + sub.path}
                                component={sub.component}
                                key={key}
                            />
                        );
                    })
                );
            }
            return <Redirect to="/admin/error/404" key={key} />;
        });
    };

    const toggleCollapsed = () => {
        setState({
            collapsed: !state.collapsed,
        });
    };
    const getCurrentRouteText = (path: string, thisRoutes: RouteType[]): string => {
        for (let i = 0; i < thisRoutes.length; i += 1) {
            const menu = thisRoutes[i];
            if (path.includes(menu.layout + menu.path) && !menu.subMenu) {
                return menu.name;
            }
            if (menu.subMenu) {
                for (let j = 0; j < menu.subMenu.length; j++) {
                    const subMenu = menu.subMenu[j];
                    if (path === subMenu.layout + subMenu.path) {
                        return subMenu.name;
                    }
                }
            }
        }
        return "Brand";
    };
    return (
        <React.Fragment>
            <Layout>
                <Sidebar collapsed={state.collapsed} routes={Routes} />
                <Menu mode="horizontal"></Menu>
                <Layout className="site-layout" style={{ marginLeft: state.collapsed ? 0 : 200 }}>
                    <AdminHeader currentRouteText={getCurrentRouteText(props.location.pathname, Routes)} 
                                 collapsed={state.collapsed} routes={Routes} toggleCollapsed={toggleCollapsed} />
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div style={{ padding: 24, minHeight: 360 }}>
                            <Switch>{getRoutes(Routes)}</Switch>
                        </div>
                    </Content>
                    <AdminFooter />
                </Layout>
            </Layout>
        </React.Fragment>
    )

}

export default AdminLayout