import React, {Component} from 'react';
import {Link} from "react-router-dom";

import AccountService from './../../../services/AccountService';

import './Registration.scss';

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phoneNumber: ''
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmedPasswordChange = this.handleConfirmedPasswordChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    };

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleConfirmedPasswordChange(event) {

    }

    handleFirstNameChange(event) {
        this.setState({firstName: event.target.value});
    }

    handleLastNameChange(event) {
        this.setState({lastName: event.target.value});
    }

    handlePhoneNumberChange(event) {
        this.setState({phoneNumber: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        AccountService.register(this.state).then(response => console.log(response));
    }

    render() {
        return (
            <div className="account-registration">
                <p className="account-registration__title">Sign Up</p>
                <form className="form-group">
                    <div className="account-registration__element">
                        <input className="form-control"
                               type="email"
                               placeholder="Email"
                               value={this.state.email}
                               name="email"
                               onChange={this.handleEmailChange}/>
                    </div>

                    <div className="account-registration__element">
                        <input className="form-control"
                               type="password"
                               placeholder="Password"
                               value={this.state.password}
                               name="password"
                               onChange={this.handlePasswordChange}/>
                    </div>

                    <div className="account-registration__element">
                        <input className="form-control"
                               type="password"
                               placeholder="Confirm Password"
                               onChange={this.handleConfirmedPasswordChange}/>
                    </div>

                    <div className="account-registration__element">
                        <input className="form-control"
                               type="text"
                               placeholder="First name"
                               value={this.state.firstName}
                               name="firstName"
                               onChange={this.handleFirstNameChange}/>
                    </div>

                    <div className="account-registration__element">
                        <input className="form-control"
                               type="text"
                               placeholder="Last name"
                               value={this.state.lastName}
                               name="lastName"
                               onChange={this.handleLastNameChange}/>
                    </div>

                    <div className="account-registration__element">
                        <input className="form-control"
                               type="text"
                               placeholder="Phone number"
                               value={this.state.phoneNumber}
                               name="phoneNumber"
                               onChange={this.handlePhoneNumberChange}/>
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