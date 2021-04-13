import React from 'react'
import { Layout } from 'antd';
import { Route, Switch } from "react-router-dom";
import Routes from "../Routes";
import AdminFooter from "../Components/Demo/Footer/AdminFooter"
import { RouteType } from '../Models';
const { Content } = Layout;

export default function AuthLayout(){
    const getRoutes = (layoutRoutes: RouteType[]): null | any => {
        return layoutRoutes.map((prop, key) => {
            if (prop.layout === "/auth") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={() => <prop.component/>}
                        key={key}
                    />
                );
            }
            return null;
        });
    };
    
    return (
        <Layout id="auth-layout">
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <Switch>{getRoutes(Routes)}</Switch>
            </Content>
            <AdminFooter />
        </Layout>
    )
    
}