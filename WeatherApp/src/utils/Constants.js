import { Dimensions } from 'react-native';

module.exports = {
    SCREEN_WIDTH: Dimensions.get('screen').width,
    SCREEN_HEIGHT: Dimensions.get('screen').height,

    API_CONFIG: {
        BASE_URL: 'https://itunes.apple.com/search?term=Michael+jackson',
    },

    STRINGS: {
        RETRY: 'RETRY',
        SOMETHING_WENT_WRONG: 'Something Went Wrong At Our End',
        GENRE: 'Genre',
        PRICE: 'Price',
    }

};
