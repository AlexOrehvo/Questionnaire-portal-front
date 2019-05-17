import axios from 'axios';

import api from './../config/apiConfig';

class AccountService {

    auth(login) {
        return axios.post(api.BASE_URL + api.LOGIN_END_POINT, login);
    }

    register(user) {
        return axios.post(api.BASE_URL + api.REGISTRATION_END_POINT, user);
    }

    forgotPassword(email) {
        return axios.post(api.BASE_URL + api.FORGOT_PASSWORD_END_POINT, email);
    }

    getProfile() {
        const headers = this.getToken().type + ' ' + this.getToken().token;
        return axios.get(api.BASE_URL + api.PROFILE_END_POINT, {headers: {
                "Authorization": headers
            }});
    }

    updateProfile(profile) {
        const headers = this.getToken().type + ' ' + this.getToken().token;
        return axios.put(api.BASE_URL + api.PROFILE_END_POINT, profile, {headers: {
                "Authorization": headers
            }});
    }

    changePassword(passwordChange) {
        const headers = this.getToken().type + ' ' + this.getToken().token;
        return axios.post(api.BASE_URL + api.CHANGE_PASSWORD_END_POINT, passwordChange, {headers: {
                "Authorization": headers
            }});
    }

    saveToken(token, type) {
        localStorage.setItem('token', token);
        localStorage.setItem('type', type);
    }

    getToken() {
        return {
            token: localStorage.getItem('token'),
            type: localStorage.getItem('type')
        };
    }

    isAuthenticated() {
        return localStorage.getItem('token') && localStorage.getItem('type');
    }

    logOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('type');
    }
}

export default new AccountService();