import axios from 'axios'

import AccountService from './AccountService';
import api from './../config/apiConfig';

class FieldService {

    getAll() {
        const headers = AccountService.getToken().type + ' ' + AccountService.getToken().token;
        return axios.get(api.BASE_URL + api.FIELDS_END_POINT, {headers: {
                "Authorization": headers
            }});
    }

    delete(id) {
        const headers = AccountService.getToken().type + ' ' + AccountService.getToken().token;
        return axios.delete(api.BASE_URL + api.FIELDS_END_POINT + `/${id}`, {headers: {
                "Authorization": headers
            }});
    }

    save(field) {
        const headers = AccountService.getToken().type + ' ' + AccountService.getToken().token;
        return axios.post(api.BASE_URL + api.FIELDS_END_POINT, field, {
            headers: {
                "Authorization": headers
            }
        });
    }

    update(field) {
        const headers = AccountService.getToken().type + ' ' + AccountService.getToken().token;
        return axios.put(api.BASE_URL + api.FIELDS_END_POINT, field, {
            headers: {
                "Authorization": headers
            }
        });
    }
}

export default new FieldService();