import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import DashBoard from './pages/Dashboard';
import UserRegister from './pages/UserRegister';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={SignIn}></Route>
            <Route path="/dashboard" component={DashBoard}></Route>
            <Route path="/signup" component={SignUp}></Route>
            <Route path="/users" component={UserRegister}></Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;