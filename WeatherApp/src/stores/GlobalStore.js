import { Platform } from 'react-native';
import { observable, action, toJS, computed } from 'mobx';
import { api } from '../utils/NetworkHandler';
import Constants from '../utils/Constants';

class GlobalStore {
    @observable showLoader = false;

    @action toggleLoader(flag) {
        this.showLoader = flag;
    }

    @action getWeatherData = async() => {
        await api
                .get(`onecall?lat=27.2046&lon=77.4977&exclude=hourly,minutely&appid=${Constants.API_CONFIG.API_KEY}`)
                .then((response) => console.log('response', response));
    }

}

export default new GlobalStore();