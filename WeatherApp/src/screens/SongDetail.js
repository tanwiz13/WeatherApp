import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import { observer, inject } from "mobx-react";
import { ScrollView } from 'react-native-gesture-handler';
import Constants from '../utils/Constants';
@inject('store')
@observer
export default class SongDetail extends PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            songData: {},
        };
    }

    componentDidMount = async() => {
        this.setState({songData: this.props.route.params.songData});
    };
    
    render() {
        const {songData} = this.state;
        return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.mainView}>
                <Text style={{fontSize: 18}}>{songData.trackName}</Text>
                <View style={{alignItems: 'center'}}>
                    <Image 
                        source={{uri : songData.artworkUrl100}} resizeMode={'contain'} 
                        style={styles.trackArt}
                    />
                    <Text style={{fontSize: 18}}>{songData.artistName}</Text>
                </View>
                <View style={{justifyContent: 'space-between', width: '80%'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text>{Constants.STRINGS.GENRE}</Text>
                            <Text style={{fontSize: 14}}>{songData.primaryGenreName}</Text>
                        </View>
                        <View>
                            <Text>{Constants.STRINGS.PRICE}</Text>
                            <Text style={{fontSize: 14}}>$ {songData.trackPrice}</Text>
                        </View>
                    </View>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        backgroundColor: '#D6E7EB'
    },
    mainView: {
        justifyContent: 'space-between', 
        alignItems: 'center',
        height: 300 , 
        width: '100%'
    },
    trackArt: {
        height: 150, 
        width: 150, 
        borderRadius: 150
    }
})