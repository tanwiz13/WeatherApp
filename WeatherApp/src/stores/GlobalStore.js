import { observable, action } from 'mobx';
import { api } from '../utils/NetworkHandler';
class GlobalStore {
    @observable songsList = [];

    @action getSongs = async() => {
        try{
            let response = await api.get();
            this.songsList = response.data.results;
            console.log('songs', this.songsList)
            return true;
        }
        catch(err){
            return false;
        }
    };
}

export default GlobalStore;
 