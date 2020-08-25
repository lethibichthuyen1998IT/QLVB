import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import SweetAlert from 'sweetalert-react';
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import 'sweetalert/dist/sweetalert.css';
import Login from "components/Login/Login.js";
import AdminLayout from "layouts/Admin.js";


const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Switch>
           
            <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
            <Route path="/login" component={Login} />
            <Redirect to="/login" />
        </Switch>
    </Router>,
    document.getElementById("root")
);


