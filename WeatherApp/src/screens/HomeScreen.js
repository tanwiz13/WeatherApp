import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import LottieView from 'lottie-react-native';
import GlobalStore from '../stores/GlobalStore';
import { observer, inject } from "mobx-react";
@observer
export default class HomeScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          showLoader: false, //TODO: change this to true
        };
    }

    componentDidMount = async() => {
        await GlobalStore.getLocationCoords();
        setTimeout(() => {
          this.setState({showLoader: false});
        }, 1000);
    }

    renderCard = (obj) => {
        console.log('object', obj);
        return (
            <View style={styles.cardView}>
                <Text style={{fontSize: 22}}>{obj.item.day}</Text>
                <Text style={{fontSize: 22}}>{obj.item.temp.day}</Text>
            </View>
        );
    };
    
    
    render() {
        return (
        <View style={styles.container}>
            {this.state.showLoader && (
                <LottieView
                    ref={(animation) => {
                    this.animation = animation;
                    }}
                    source={require('../assets/loader.json')}
                    autoPlay
                    loop
                />
            )}
            <View style={{ backgroundColor:'white', flex:1}}>
                <View style={{justifyContent:'center', alignItems:'center', flex: 1, backgroundColor: 'white'}}>
                    <Text>10</Text>
                    <Text>Delhi</Text>                                                  
                </View>
                <View>
                    <FlatList data={GlobalStore.forecastData.slice(0,5)} extraData={GlobalStore.forecastData} renderItem={(item) => this.renderCard(item)} />
                </View>
            </View>
        </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent:'center',
        backgroundColor: 'white'
    },
    cardView:{
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexDirection: 'row', 
        backgroundColor:'white', 
        paddingHorizontal: 30, 
        height:50,
        borderTopWidth: 1, 
        borderTopColor: 'black'
    }
})