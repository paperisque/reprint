/*
    Routes belongs in this file. use 'isSidemenu' if you want the route to show in sidebar.
    Use @ant-design/icons for the icon in sidebar.
    You can change the code in Sidebar.tsx
*/


import {
    AppstoreOutlined,
    MinusOutlined,
    FileOutlined,
    GithubOutlined,
} from "@ant-design/icons"
// type for route
import {RouteType} from "./Models"
// About
import About from "./Views/Demo/Pages/About";
// DemoBoard
import DemoBoard from "./Views/Demo/Demoboard";
// Pages
import BlankPage from "./Views/Demo/Pages/BlankPage";
import Page404 from "./Views/Demo/Pages/Page404";
import Page403 from "./Views/Demo/Pages/Page403";
import Page500 from "./Views/Demo/Pages/Page500";
import Login from "./Views/Login"
const Routes: RouteType[] = [
    // Default 404 Not Found Page
    
    {
        path: "/error/404",
        name: "DemoBoard",
        icon: AppstoreOutlined,
        component: Page404,
        layout: "/admin",
        isSidemenu: false,
    },
    {
        path: "/index",
        name: "DemoBoard",
        icon: AppstoreOutlined,
        component: DemoBoard,
        layout: "/admin",
        isSidemenu: true,
    },
    {
        path: "/DemoBoard",
        icon: AppstoreOutlined,
        name: "",
        component: DemoBoard,
        layout: "/DemoBoard",
        isSidemenu: false,
    },
    {
        path: "/pages",
        name: "Pages",
        icon: FileOutlined,
        component: DemoBoard,
        layout: "/admin",
        isSidemenu: true,
        subMenu: [
            {
                path: "/pages/blank",
                name: "Blank Page",
                icon: MinusOutlined,
                component: BlankPage,
                layout: "/admin",
                isSidemenu: true,
            },
            {
                path: "/login",
                name: "Login",
                icon: MinusOutlined,
                component: Login,
                layout: "/auth",
                isSidemenu: true,
            },
            {
                path: "/pages/404",
                name: "404",
                icon: MinusOutlined,
                component: Page404,
                layout: "/admin",
                isSidemenu: true,
            },
            {
                path: "/pages/500",
                name: "500",
                icon: MinusOutlined,
                component: Page500,
                layout: "/admin",
                isSidemenu: true,
            },
            {
                path: "/pages/403",
                name: "403",
                icon: MinusOutlined,
                component: Page403,
                layout: "/admin",
                isSidemenu: true,
            }
        ]
    },
    {
        path: "/about",
        name: "About",
        icon: GithubOutlined,
        component: About,
        layout: "/admin",
        isSidemenu: true,
    },
    {
        path: "/login",
        name: "Login",
        icon: MinusOutlined,
        component: Login,
        layout: "/auth",
        isSidemenu: false,
    },
]

export default Routes;