import { Dimensions } from 'react-native';

module.exports = {
    SCREEN_WIDTH: Dimensions.get('screen').width,
    SCREEN_HEIGHT: Dimensions.get('screen').height,

    API_CONFIG: {
        BASE_URL: 'https://api.openweathermap.org/data/2.5/',
        API_KEY: 'd592c224dc9a68b48eeb900aeaea2af2',
    },

};
