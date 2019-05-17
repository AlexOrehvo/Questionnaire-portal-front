import React, {Component} from 'react';

import FormControlInput from "../shared/form-control/form-control-input/Form-control-input";

import './ChangePassword.scss';
import AccountService from "../../services/AccountService";

class ChangePassword extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: '',
            newPassword: '',
            confirmedPassword: '',

            currentPasswordError: '',
            newPasswordError: '',
            confirmedPasswordError: ''
        };
        this.isValidForm = this.isValidForm.bind(this);
        this.isValidPassword = this.isValidPassword.bind(this);
        this.isValidConfirmedPassword = this.isValidConfirmedPassword.bind(this);
    }

    handleChange = name => event => {
      this.setState({
          [name]: event.target.value
      })
    };

    handleSubmit() {
        if (this.isValidForm()) {
            AccountService.changePassword({
                currentPassword: this.state.currentPassword,
                newPassword: this.state.newPassword
            }).then(
            );
        }
    }

    isValidForm() {
        return this.isValidPassword(this.state.currentPassword, 'currentPasswordError') &&
            this.isValidPassword(this.state.newPassword, 'newPasswordError') &&
            this.isValidConfirmedPassword(this.state.confirmedPassword);
    }

    isValidPassword(password, error) {
        if (password.length < 4 || password.length > 100) {
            this.setState({[error]: 'Password length must be from 4 to 100 characters'});
            return false;
        }

        this.setState({[error]: ''});
        return true;
    }

    isValidConfirmedPassword(confirmedPassword) {
        if (confirmedPassword !== this.state.newPassword) {
            this.setState({confirmedPasswordError: 'Passwords do not match'});
            return false;
        }
        this.setState({confirmedPasswordError: ''});
        return true;
    }

    render() {
        return(
            <div className="change-password">
                <div className="change-password-header">
                    Change Password
                </div>
                <div className="change-password-body">
                    <form>
                        <div className="change-password-body__element">
                            <FormControlInput
                                type="password"
                                id="currPassword"
                                name="currPassword"
                                label="Current Password *"
                                handleChange={this.handleChange('currentPassword')}
                                error={this.state.currentPasswordError}
                            />
                        </div>
                        <div className="change-password-body__element">
                            <FormControlInput
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                label="New Password *"
                                handleChange={this.handleChange('newPassword')}
                                error={this.state.newPasswordError}
                            />
                        </div>
                        <div className="change-password-body__element">
                            <FormControlInput
                                type="password"
                                id="confirmedPassword"
                                name="confirmedPassword"
                                label="Confirmed Password *"
                                handleChange={this.handleChange('confirmedPassword')}
                                error={this.state.confirmedPasswordError}
                            />
                        </div>
                        <div className="change-password-body__element">
                            <button type="button"
                                    className="btn btn-primary"
                                    onClick={this.handleSubmit.bind(this)}>
                                Change
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default  ChangePassword;