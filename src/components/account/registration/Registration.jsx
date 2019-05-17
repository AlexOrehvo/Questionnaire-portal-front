import React, {Component} from 'react';
import {Link} from "react-router-dom";
import is from 'is_js';

import AccountService from './../../../services/AccountService';

import './Registration.scss';
import FormControlInput from "../../shared/form-control/form-control-input/Form-control-input";

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmedPassword: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            emailError: '',
            passwordError: '',
            confirmedPasswordError: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isValidForm = this.isValidForm.bind(this);
        this.isValidEmail = this.isValidEmail.bind(this);
        this.isValidPassword = this.isValidPassword.bind(this);
        this.isValidConfirmedPassword = this.isValidConfirmedPassword.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleSubmit(event) {
        if (this.isValidForm()) {
            const account = {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber
            };
            AccountService.register(account)
                .then(response => this.props.history.push('/account/login'));
        }
    }


    isValidEmail(email) {
        if (email.length === 0) {
            this.setState({emailError: 'This field is required'});
            return false;
        }
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

    isValidConfirmedPassword(confirmedPassword) {
        if (confirmedPassword !== this.state.password) {
            this.setState({confirmedPasswordError: 'Passwords do not match'});
            return false;
        }
        this.setState({confirmedPasswordError: ''});
        return true;
    }

    isValidForm() {
        return this.isValidEmail(this.state.email) &&
            this.isValidPassword(this.state.password) &&
            this.isValidConfirmedPassword(this.state.confirmedPassword);
    }

    render() {
        return (
            <div className="account-registration">
                <p className="account-registration__title">Sign Up</p>
                <form className="form-group">
                    <div className="account-registration__element">
                        <FormControlInput placeholder="Email"
                                          type="email"
                                          value={this.state.email}
                                          handleChange={this.handleChange('email')}
                                          error={this.state.emailError}
                        />
                    </div>

                    <div className="account-registration__element">
                        <FormControlInput placeholder="Password"
                                          type="password"
                                          value={this.state.password}
                                          handleChange={this.handleChange('password')}
                                          error={this.state.passwordError}
                        />
                    </div>

                    <div className="account-registration__element">
                        <FormControlInput placeholder="Confirm password"
                                          type="password"
                                          value={this.state.confirmedPassword}
                                          handleChange={this.handleChange('confirmedPassword')}
                                          error={this.state.confirmedPasswordError}
                        />
                    </div>

                    <div className="account-registration__element">
                        <FormControlInput placeholder="First name"
                                          type="text"
                                          value={this.state.firstName}
                                          handleChange={this.handleChange('firstName')}
                        />
                    </div>

                    <div className="account-registration__element">
                        <FormControlInput placeholder="Last name"
                                          type="text"
                                          value={this.state.lastName}
                                          handleChange={this.handleChange('lastName')}
                        />
                    </div>

                    <div className="account-registration__element">
                        <FormControlInput placeholder="Phone number"
                                          type="text"
                                          value={this.state.phoneNumber}
                                          handleChange={this.handleChange('phoneNumber')}
                        />
                    </div>

                    <div className="account-registration__element">
                        <button className="btn btn-primary btn-block"
                                type="button"
                                onClick={this.handleSubmit}
                        >Sign Up</button>
                    </div>

                    <p className="login-link account-registration__element">
                        Already have account? <span><Link to="/account/login">Log In</Link></span>
                    </p>
                </form>
            </div>
        )
    }
}

export default Registration;