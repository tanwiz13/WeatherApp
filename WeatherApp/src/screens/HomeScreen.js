import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import GlobalStore from '../stores/GlobalStore';
import { observer, inject } from "mobx-react";
import { withStore } from '../stores/Stores';
@withStore
@observer
export default class HomeScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          showLoader: false, //TODO: change this to true
        };
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
                {
                (<>
                  <Animatable.Text
                  delay={500}
                  easing="ease-in-out-back"
                  duration={2000}
                  useNativeDriver={true}
                  animation="zoomIn"
                  iterationCount={1}
                  style={{fontSize:30}}
                  onAnimationEnd={this.afterAnimationEnd}>
                  {this.props.store.currentTempObj.temp}
                </Animatable.Text>
                <Animatable.Text
                  delay={500}
                  easing="ease-in-out-back"
                  duration={2000}
                  useNativeDriver={true}
                  animation="zoomIn"
                  iterationCount={1}
                  style={{fontSize:30}}
                  onAnimationEnd={this.afterAnimationEnd}>
                  Delhi
                </Animatable.Text>
                </>)}                                         
                </View>
                <View>
                    <FlatList data={this.props.store.forecastData.slice(0,5)} extraData={this.props.store.forecastData} renderItem={(item) => this.renderCard(item)} />
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