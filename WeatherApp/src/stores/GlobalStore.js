import { observable, action } from 'mobx';
import Geolocation from '@react-native-community/geolocation';
import { api } from '../utils/NetworkHandler';
import Constants from '../utils/Constants';
import { getDayNameFromTimestamp } from '../utils/CommonFunctions';

class GlobalStore {
    @observable currentTempObj = {};
    @observable forecastData = [];

    @action getLocationCoords = async(getRes=()=>{}) => {
        Geolocation.getCurrentPosition(
            async position => {
                let weatherRes = await this.getWeatherData(position.coords);
                getRes(weatherRes);
            },
            error => {
                console.log('err', error)
                getRes(false);
            },
        );
    }

    @action getWeatherData = async(location) => {
        try{
            let response = await api.get(`onecall?lat=${location.latitude}&units=metric&lon=${location.longitude}&exclude=hourly,minutely&appid=${Constants.API_CONFIG.API_KEY}`);
            this.currentTempObj = response.data.current;
            this.forecastData = response.data.daily;
            this.forecastData.forEach((item) => {
                item.day = getDayNameFromTimestamp(item.dt);
            })
            this.currentTempObj.day = getDayNameFromTimestamp(response.data.current.dt);
            Object.assign(this.currentTempObj, response.data.current);
            this.forecastData.splice(0,1);
            return true;
        }
        catch(err){
            console.log(' in error', err);
            return false;
        }
    }

}

export default GlobalStore;
 