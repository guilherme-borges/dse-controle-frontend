import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from "./services/auth";

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import DashBoard from './pages/Dashboard';
import UserRegister from './pages/UserRegister';
import ProjectRegister from './pages/ProjectRegister';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={SignIn}></Route>
            <Route path="/signup" component={SignUp}></Route>
            <PrivateRoute path="/dashboard" component={DashBoard}></PrivateRoute>
            <PrivateRoute path="/users" component={UserRegister}></PrivateRoute>
            <PrivateRoute path="/projects" component={ProjectRegister}></PrivateRoute>
        </Switch>
    </BrowserRouter>
);

export default Routes;