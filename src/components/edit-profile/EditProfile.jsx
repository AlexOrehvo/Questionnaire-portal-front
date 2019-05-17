import React, {Component} from 'react';
import is from 'is_js';

import AccountService from './../../services/AccountService';

import './EditProfile.scss';
import FormControlInput from "../shared/form-control/form-control-input/Form-control-input";

class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: { },
            emailError: ''
        }
    }

    componentDidMount() {
        AccountService.getProfile()
            .then(
                res => this.setState({profile: res.data})
            );
    }

    handleChange = name => event => {
        this.setState({
            profile: {
                ...this.state.profile,
                [name]: event.target.value
            }
        });
    };

    handleSubmit() {
        if (this.isValidEmail(this.state.profile.email)) {
            AccountService.updateProfile(this.state.profile)
                .then(res => console.log(res));
        }
    }

    isValidEmail(email) {
        if (!is.email(email)) {
            this.setState({ emailError: 'Invalid email format'});
            return false;
        }

        this.setState({ emailError: '' })
        return true;
    }

    render() {
        return (
            <div className="edit-profile">
                <div className="edit-profile-header">
                    EditProfile
                </div>
                <div className="edit-profile-body">
                    <form className="form-group">
                        <div className="edit-profile__element">
                            <FormControlInput type="text"
                                              defaultValue={this.state.profile.firstName}
                                              handleChange={this.handleChange('firstName')}
                                              label="First name"
                                              name="firstName"
                            />
                        </div>
                        <div className="edit-profile__element">
                            <FormControlInput type="text"
                                              defaultValue={this.state.profile.lastName}
                                              handleChange={this.handleChange('lastName')}
                                              label="Last name"
                                              name="lastName"
                            />
                        </div>
                        <div className="edit-profile__element">
                            <FormControlInput type="email"
                                              defaultValue={this.state.profile.email}
                                              handleChange={this.handleChange('email')}
                                              label="Email"
                                              name="email"
                            />
                        </div>
                        <div className="edit-profile__element">
                            <FormControlInput type="text"
                                              defaultValue={this.state.profile.phoneNumber}
                                              handleChange={this.handleChange('phoneNumber')}
                                              label="Phone number"
                                              name="phoneNumber"
                            />
                        </div>
                        <div className="edit-profile__element">
                            <button className="btn btn-primary" type="button" onClick={this.handleSubmit.bind(this)}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default EditProfile;