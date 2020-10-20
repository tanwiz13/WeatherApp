import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { observer, inject } from "mobx-react";
@inject('store')
@observer
export default class HomeScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          
        };
    }

    renderCard = (obj) => {
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
            <View style={{ backgroundColor:'white', flex:1, borderBottomWidth: 1, borderBottomColor: 'black'}}>
                <View style={styles.mainView}>
                {
                (<>
                  <Animatable.Text
                    delay={500}
                    easing="ease-in-out-back"
                    duration={2000}
                    useNativeDriver={true}
                    animation="zoomIn"
                    iterationCount={1}
                    style={{fontSize:50}}
                    onAnimationEnd={this.afterAnimationEnd}
                  >
                    {this.props.store.currentTempObj.temp}
                  </Animatable.Text>
                  <Animatable.Text
                    delay={500}
                    easing="ease-in-out-back"
                    duration={2000}
                    useNativeDriver={true}
                    animation="zoomIn"
                    iterationCount={1}
                    style={{fontSize:35}}
                    onAnimationEnd={this.afterAnimationEnd}
                  >
                    Delhi
                  </Animatable.Text>
                </>)}                                         
                </View>
                <View>
                    <FlatList 
                        data={this.props.store.forecastData.slice(0,5)} 
                        extraData={this.props.store.forecastData} 
                        renderItem={(item) => this.renderCard(item)} 
                        keyExtractor={(item, index) => index.toString()}
                    />
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
    mainView:{
        justifyContent:'center', 
        alignItems:'center', 
        flex: 1, 
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