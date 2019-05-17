import axios from 'axios';
import AccountService from "./AccountService";
import api from './../config/apiConfig';

class ResponseServiceRest {

    getAll() {
        const headers = AccountService.getToken().type + ' ' + AccountService.getToken().token;
        return axios.get(api.BASE_URL + api.RESPONSES_END_POINT, {headers: {
                "Authorization": headers
            }});
    }

}

export default new ResponseServiceRest();