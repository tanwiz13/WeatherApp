import React, {PureComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { observer, inject } from "mobx-react";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';

@inject('store')
@observer
class ErrorScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    resetTo = () => {
        setTimeout(() => {
            this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    { name: 'Splash' },
                  ],
                })
              );
        }, 500);
    }    
    
    render() {
        return (
        <View style={styles.container}>
            <Animatable.Text
                delay={500}
                easing="ease-in-out-back"
                duration={2000}
                useNativeDriver={true}
                animation="zoomIn"
                iterationCount={1}
                style={{fontSize: 40, marginHorizontal: 50, textAlign:'left'}}
                onAnimationEnd={this.afterAnimationEnd}
                >
                Something went wrong at our side
            </Animatable.Text>
            <TouchableOpacity 
                style={styles.retryButton}
                onPress={()=>{
                    console.log('try again');
                    this.resetTo();
                }}
            > 
                <Text>RETRY</Text>
            </TouchableOpacity>
        </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'white'
    },
    retryButton: {
        marginTop: 30,
        borderWidth: 1, 
        height: 50, 
        width: 100, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})

export default ErrorScreen;
