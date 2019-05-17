import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Registration from './registration/Registration';
import Login from './login/Login';
import ForgotPassword from './forgot-password/Forgot-password'
import Logo from '../shared/logo/Logo';

import './account.scss';

class Account extends Component {

    render() {

        return (
            <div className="container account">
                <div className="account-form">
                    <div className="account__logo">
                        <Logo/>
                    </div>
                    <Router>
                        <Route path="/account/login" component={Login}/>
                        <Route path="/account/registration" component={Registration}/>
                        <Route path="/account/forgot-password" component={ForgotPassword}/>
                    </Router>
                </div>
            </div>
        );
    }
}

export default Account;