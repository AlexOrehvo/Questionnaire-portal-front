import React, {Component} from 'react';
import is from 'is_js';

import AccountService from './../../../services/AccountService';
import FormControlInput from './../../shared/form-control/form-control-input/Form-control-input';

import './Forgot-password.scss';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isValidEmail = this.isValidEmail.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    };

    handleSubmit(event) {
        if (this.isValidForm()) {
            AccountService.forgotPassword({email: this.state.email})
                .then(res => this.props.history.push('/account/login'));
        }
    }

    handleCancel() {
        this.props.history.push("/account/login");
    }

    isValidForm() {
        return this.isValidEmail(this.state.email);
    }

    isValidEmail(email) {
        if (!is.email(email)) {
            this.setState({emailError: 'Invalid email format'});
            return false;
        }
        this.setState({emailError: ''});
        return true;
    }

    render() {
        return (
            <div className="account-forgot-password">
                <p className="account-forgot-password__title">Forgot Password</p>
                <form className="form-group">
                    <FormControlInput
                        placeholder="Email"
                        type="email"
                        name="email"
                        id="email"
                        handleChange={this.handleChange('email')}
                        error={this.state.emailError}
                    />
                    <p>A new password will be sent to this email.</p>
                </form>
                <div className="account-forgot-password-buttons">
                    <button type="button" className="btn btn-light" onClick={this.handleCancel.bind(this)}>Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Ok</button>
                </div>
            </div>
        )
    }
}

export default Login;