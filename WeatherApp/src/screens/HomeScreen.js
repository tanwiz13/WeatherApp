import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';


const arr = [
    {
      day: 'Monday',
      temp: 8,
    },
    {
      day: 'Monday',
      temp: 8,
    },
    {
      day: 'Monday',
      temp: 8,
    },
    {
      day: 'Monday',
      temp: 8,
    },
    {
      day: 'Monday',
      temp: 8,
    },
  ];

export default class HomeScreen extends PureComponent {


    renderCard = (obj) => {
        console.log('object', obj);
        return (
            <View style={styles.cardView}>
                <Text style={{fontSize: 22}}>{obj.item.day}</Text>
                <Text style={{fontSize: 22}}>{obj.item.temp}</Text>
            </View>
        );
    };
    
    
    render() {
        return (
        <View style={styles.container}>
            <View style={{ backgroundColor:'white', flex:1}}>
                <View style={{justifyContent:'center', alignItems:'center', flex: 1, backgroundColor: 'blue'}}>
                    <Text>10</Text>
                    <Text>Delhi</Text>                                                  
                </View>
                <View>
                    <FlatList data={arr} renderItem={(item) => this.renderCard(item)} />
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
        backgroundColor: 'blue'
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