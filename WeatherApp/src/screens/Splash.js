import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import LottieView from 'lottie-react-native';
import { observer, inject } from "mobx-react";
@inject('store')
@observer
class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showLoader: true,
        };
    }

    componentDidMount = async() => {
        this.props.store.getLocationCoords((res)=>{
            if(res){
                this.setState({showLoader: false});
                this.props.navigation.navigate('HomeScreen');
            }
            else{
                this.setState({showLoader: false});
                this.props.navigation.navigate('ErrorScreen');
            }
        })
    }
    
    
    render() {
        const {showLoader} = this.state;
        return (
        <View style={styles.container}>
            {showLoader && (
                <LottieView
                    ref={(animation) => {
                        this.animation = animation;
                    }}
                    source={require('../assets/loader.json')}
                    autoPlay
                    loop
                /> 
            )}
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
})

export default Splash;
