import axios from 'axios'

class AccountService {

    auth(login) {
        return axios.post('http://localhost:8080/account/authenticate', login);
    }

    register(user) {
        return axios.post('http://localhost:8080/account/register', user);
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
}

export default new AccountService();