import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import { observer, inject } from "mobx-react";
import { StackActions } from '@react-navigation/native';

@inject('store')
@observer
class Splash extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          showLoader: true,
        };
    }

    componentDidMount = async() => {
        let res = await this.props.store.getSongs();
            if(res){
                this.setState({showLoader: false});
                this.props.navigation.dispatch(StackActions.replace('Songs'));
            }
            else{
                this.setState({showLoader: false});
                this.props.navigation.navigate('ErrorScreen');
            }
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
