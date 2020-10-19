import { Platform } from 'react-native';
import { observable, action, toJS, computed } from 'mobx';
import Geolocation from '@react-native-community/geolocation';
import { api } from '../utils/NetworkHandler';
import Constants from '../utils/Constants';
import { getDayNameFromTimestamp } from '../utils/CommonFunctions';

class GlobalStore {
    @observable showLoader = false;
    @observable currentTempObj = {};
    @observable forecastData = [];

    @action toggleLoader(flag) {
        this.showLoader = flag;
    }

    @action getLocationCoords = async() => {
        await Geolocation.getCurrentPosition(info => {
            console.log('location',info.coords);
            this.getWeatherData(info.coords);
        });
    }

    @action getWeatherData = async(location) => {
        // let location = await this.getLocationCoords();
        console.log('loc', location)
        let response = await api.get(`onecall?lat=${location.latitude}&units=metric&lon=${location.longitude}&exclude=hourly,minutely&appid=${Constants.API_CONFIG.API_KEY}`)
        console.log('response', response);
        this.currentTempObj = response.data.current;
        this.forecastData = response.data.daily;
        console.log('forcast data', this.forecastData);
        this.forecastData.forEach((item) => {
            item.day = getDayNameFromTimestamp(item.dt);
        })
        this.currentTempObj.day = getDayNameFromTimestamp(response.data.current.dt);
        Object.assign(this.currentTempObj, response.data.current);
        this.forecastData.splice(0,1);
        console.log('forcast data', this.forecastData);
        console.log('current data', this.currentTempObj);
    }

}

export default new GlobalStore();