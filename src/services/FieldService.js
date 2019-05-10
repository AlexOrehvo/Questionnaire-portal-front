import axios from 'axios'

import AccountService from './AccountService';

class FieldService {

    getAll() {
        const headers = AccountService.getToken().type + ' ' + AccountService.getToken().token;
        return axios.get('http://localhost:8080/api/fields', {headers: {
                "Authorization": headers
            }});
    }

    delete(id) {
        const headers = AccountService.getToken().type + ' ' + AccountService.getToken().token;
        return axios.delete(`http://localhost:8080/api/fields/${id}`, {headers: {
                "Authorization": headers
            }});
    }

    save(field) {
        const headers = AccountService.getToken().type + ' ' + AccountService.getToken().token;
        return axios.post('http://localhost:8080/api/fields', field, {
            headers: {
                "Authorization": headers
            }
        });
    }

    update(field) {
        const headers = AccountService.getToken().type + ' ' + AccountService.getToken().token;
        return axios.put('http://localhost:8080/api/fields', field, {
            headers: {
                "Authorization": headers
            }
        });
    }
}

export default new FieldService();