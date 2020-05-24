import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignIn from './pages/SignIn';
import DashBoard from './pages/Dashboard';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={SignIn}></Route>
            <Route path="/dashboard" component={DashBoard}></Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;