import moment from 'moment';

export function getDayNameFromTimestamp(timestamp) {
    let dateString = moment.unix(timestamp).format("dddd");
    return dateString;
}

export function isFormValid(formArray) {
    let res = false;
    for(let i = 0; i < formArray.length; i++){
        if(formArray[i].value && formArray[i].value.length > 0){
            res = true;
        }
        else{
            res = false;
        }
    }
    return res;
};