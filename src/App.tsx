import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useTypedSelector } from "./hooks/useTypedSelector";
import AdminLayout from "./Layouts/Admin";
import AuthLayout from "./Layouts/Auth";
import DefaultLayout from './Layouts/DefaultLayout';


function App() {

    const { name } = useTypedSelector(
        state => state.themes
    )

    return (
        <div id="themes-container"
            className={name}>
            <BrowserRouter>
                <Switch>
                    <Route path="/admin" component={AdminLayout} />
                    <Route path="/auth" component={AuthLayout} />
                    <Route path="/dashboard" component={DefaultLayout} />
                    <Redirect from="/" to="/dashboard" />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App