import moment from 'moment';

export function getDayNameFromTimestamp(timestamp) {
    let dateString = moment.unix(timestamp).format("dddd");
    return dateString;
}