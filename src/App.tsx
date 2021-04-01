import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "./Layouts/Admin";
import AuthLayout from "./Layouts/Auth";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
                <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
                <Redirect from="/" to="/admin/index" />
            </Switch>
        </BrowserRouter>
    )
}

export default App