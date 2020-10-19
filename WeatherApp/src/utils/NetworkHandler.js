import {create} from 'apisauce';
import Constants from './Constants';

export const api = create({
    baseURL: Constants.API_CONFIG.BASE_URL,
    headers: {Accept: 'application/json'},
});