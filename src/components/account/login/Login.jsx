import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import is from 'is_js';

import AccountService from './../../../services/AccountService';
import FormControlInput from './../../shared/form-control/form-control-input/Form-control-input';
import FormControlCheckbox from './../../shared/form-control/form-control-checkbox/Form-control-checkbox';

import './Login.scss';
import ResponseService from "../../../services/ResponseService";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: {
                email: '',
                password: '',
                rememberMe: false
            },
            emailError: '',
            passwordError: ''
        };
        this.handleRememberMeChange = this.handleRememberMeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isValidEmail = this.isValidEmail.bind(this);
        this.isValidPassword = this.isValidPassword.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            login: {
                ...this.state.login,
                [name]: event.target.value
            }
        })
    };

    handleRememberMeChange(event) {
        this.setState({
            login: {
                ...this.state.login,
                rememberMe: event.target.checked
            }
        });
    }

    isValidEmail(email) {
        if (!is.email(email)) {
            this.setState({emailError: 'Invalid email format'});
            return false;
        }
        this.setState({emailError: ''});
        return true;
    }

    isValidPassword(password) {
        if (password.length < 4 || password.length > 100) {
            this.setState({passwordError: 'Password length must be from 4 to 100 characters'});
            return false;
        }

        this.setState({passwordError: ''});
        return true;
    }

    isValidForm() {
        return this.isValidEmail(this.state.login.email) && this.isValidPassword(this.state.login.password);
    }

    handleSubmit(event) {
       if (this.isValidForm()) {
           event.preventDefault();
           AccountService.auth(this.state.login)
               .then(res => {
                   AccountService.saveToken(res.data.accessToken,res.data.tokenType);
                   ResponseService.connect();
                   this.props.history.push('/fields');
               });
       }
    }

    render() {
        return (
            <div className="account-login">
                <p className="account-login__title">Log In</p>
                <form className="form-group">
                    <div className="account-login__element">
                        <FormControlInput
                            placeholder="Email"
                            type="email"
                            defaultValue={this.state.login.email}
                            handleChange={this.handleChange('email')}
                            error={this.state.emailError}
                        />
                    </div>

                    <div className="account-login__element">
                        <FormControlInput
                            placeholder="Password"
                            type="password"
                            defaultValue={this.state.login.password}
                            handleChange={this.handleChange('password')}
                            error={this.state.passwordError}
                        />
                    </div>


                    <div className="row account-login__element">
                        <div className="col-md-5">
                            <FormControlCheckbox
                                name="rememberMe"
                                defaultChecked={false}
                                handleChange={this.handleRememberMeChange}
                                label="Remember me"
                            />
                        </div>
                        <div className="col-md-7 text-right forgot">
                            <Link to="/account/forgot-password">Forgot your password?</Link>
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