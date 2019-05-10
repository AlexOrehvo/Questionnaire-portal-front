import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from "react-router-dom";

import Account from '../components/account/Account';
import Main from '../components/main/Main';

const isAuth = true;

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route render={(props) => (
        isAuth === true
            ? <Component />
            : <Redirect to="/account/login" />
    )} />
);

export default function AppRouting() {
    return (
        <Router>
            <main>
                <Switch>
                    <Route path="/account/login" component={Account}/>
                    <Route path="/account/registration" component={Account}/>
                    <PrivateRoute path="/fields" component={Main}/>
                    <PrivateRoute path="/responses" component={Main}/>
                </Switch>
            </main>
        </Router>
    )
}