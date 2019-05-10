import React, {Component} from 'react';
import { Link } from 'react-router-dom'

import AccountService from './../../../services/AccountService';

import './Login.scss';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            rememberMe: false
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRememberMeChange = this.handleRememberMeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleRememberMeChange(event) {
        this.setState({rememberMe: event.target.checked});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        AccountService.auth(this.state)
            .then(res => AccountService.saveToken(res.data.accessToken,res.data.tokenType));
    }

    render() {
        return (
            <div className="account-login">
                <p className="account-login__title">Log In</p>
                <form className="form-group">
                    <div className="account-login__element">
                        <input className="form-control"
                               type="email"
                               placeholder="Email"
                               value={this.state.email}
                               name="email"
                               onChange={this.handleEmailChange}/>
                    </div>

                    <div className="account-login__element">
                        <input className="form-control"
                               type="password"
                               placeholder="Password"
                               value={this.state.password}
                               name="password"
                               onChange={this.handlePasswordChange}/>
                    </div>


                    <div className="row account-login__element">
                        <div className="col-md-5">
                            <input className="form-check-input"
                                   type="checkbox"
                                   value={this.state.rememberMe}
                                   name="rememberMe"
                                   id="rememberMe"
                                   onClick={this.handleRememberMeChange}/>
                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div>
                        <div className="col-md-7 text-right forgot">
                            <Link to="/account/registration">Forgot your password?</Link>
                        </div>
                    </div>

                    <div className="account-login__element">
                        <button className="btn btn-primary btn-block"
                                type="button"
                                onClick={this.handleSubmit}
                        >Log In</button>
                    </div>

                    <p className="sign-up-link account-login__element">
                        Don't have account? <span><Link to="/account/registration">Sign Up</Link></span>
                    </p>
                </form>
            </div>
        )
    }
}

export default Login;