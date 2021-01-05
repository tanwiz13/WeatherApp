import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, UIManager, Platform, Image} from 'react-native';
import { observer, inject } from "mobx-react";

@inject('store')
@observer
export default class Songs extends PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false
        };
    }

    componentDidMount = () => {
        if (Platform.OS == 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    };

    onSongPress = (song) => {
        this.props.navigation.navigate('SongDetail', {songData: song});
    };

    pullRefresh = async() =>{
        console.log('here')
        this.setState({isRefreshing: true});
        let res = await this.props.store.getSongs();
        if(res) {
            this.setState({isRefreshing: false});
        }
    };

    renderSongs = (item, index) => {
        return (
            <TouchableOpacity 
                style={styles.songCard} 
                onPress={()=>{this.onSongPress(item)}}
            >
                <Image style={{height: 70, width: 70,}} source={{uri: item.artworkUrl100}} resizeMode={'contain'}/>
                <View style={{flex: 0.7, justifyContent: 'space-between', marginHorizontal: 15}}>
                    <Text style={{fontSize: 18}}>{item.trackName}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 14}}>{item.artistName}</Text>
                        <Text style={{fontSize: 14}}>$ {item.trackPrice}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };
    
    render() {
        return (
        <SafeAreaView style={styles.container}>
            <FlatList 
                data={this.props.store.songsList} 
                extraData={this.props.store.songsList}
                onRefresh={this.pullRefresh}
                refreshing={this.state.isRefreshing}
                renderItem={({item, index}) => this.renderSongs(item, index)} 
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#E6F0F3',
    },
    songCard: {
        height: 90, 
        flexDirection: 'row', 
        padding: 10,
        marginVertical: 3,
        backgroundColor: '#D6E7EB'
    },
})