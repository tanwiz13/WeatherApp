import { observable, action } from 'mobx';
import Geolocation from '@react-native-community/geolocation';
import { api } from '../utils/NetworkHandler';
import Constants from '../utils/Constants';
import { getDayNameFromTimestamp } from '../utils/CommonFunctions';

class GlobalStore {
    @observable showLoader = false;
    @observable currentTempObj = {};
    @observable forecastData = [];

    @action toggleLoader = (flag) => {
        this.showLoader = flag;
    }

    @action getLocationCoords = async() => {
        try{
            this.toggleLoader(true);
            // await Geolocation.getCurrentPosition(async(info) => {
            //     this.toggleLoader(false);
            //     console.log(info)
            //     return {data: info.coords, status: true};
            // });
            Geolocation.getCurrentPosition(
                position => {
                    this.toggleLoader(false);
                    console.log('position', position)
                    this.getWeatherData(position.coords);
                },
                error => {
                    return {status: false};
                },
              );
        }
        catch(err){
            this.toggleLoader(false);
            console.log('in error', err);
            return {status: false};
        }
    }

    @action getWeatherData = async(location) => {
        try{
            console.log('in heres')
            this.toggleLoader(true);
            let response = await api.get(`onecall?lat=${location.latitude}&units=metric&lon=${location.longitude}&exclude=hourly,minutely&appid=${Constants.API_CONFIG.API_KEY}`);
            this.currentTempObj = response.data.current;
            this.forecastData = response.data.daily;
            this.forecastData.forEach((item) => {
                item.day = getDayNameFromTimestamp(item.dt);
            })
            this.currentTempObj.day = getDayNameFromTimestamp(response.data.current.dt);
            Object.assign(this.currentTempObj, response.data.current);
            this.forecastData.splice(0,1);
            console.log(this.forecastData)
            console.log(this.currentTempObj)
            this.toggleLoader(false);
            return true;
        }
        catch(err){
            this.toggleLoader(false);
            console.log(' in error', err);
            return false;
        }
    }

}

export default GlobalStore;
 