import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "./Layouts/Admin";
import AuthLayout from "./Layouts/Auth";
import DefaultLayout from './Layouts/DefaultLayout';


function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/admin" component={AdminLayout} />
                <Route path="/auth" component={AuthLayout} />
                <Route path="/dashboard" component={DefaultLayout} />
                <Redirect from="/" to="/dashboard" />
            </Switch>
        </BrowserRouter>
    )
}

export default App