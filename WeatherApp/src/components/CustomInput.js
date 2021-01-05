import React, { Component } from 'react';
import { StyleSheet, View, TextInput} from 'react-native';

class CustomInput extends Component {

  render() {
    const { 
        label = '',
        maxLength = 26,
        returnKeyType = 'next',
        autoCapitalize = 'none',
        secureTextEntry = false,
        keyboardType = 'default',
        handleChangeText=()=>{},
        onSubmitEditing=()=>{},
        ref=''
    } = this.props;
    return (
      <View style={styles.containerStyle}>
          <TextInput
            placeholder={label}
            maxLength={maxLength}
            numberOfLines={1}
            ref={ref}
            autoCapitalize={autoCapitalize}
            returnKeyType={returnKeyType || 'next'}
            onChangeText={handleChangeText}
            style={styles.textInput}
            keyboardType={keyboardType}
            onSubmitEditing={onSubmitEditing}
            secureTextEntry={secureTextEntry}
            editable={true}
            textAlign={'left'}
            placeholderTextColor='rgba(169,170,178,0.9)'
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 14,
    fontWeight: '600',
    width: 240,
    height:50,
    textAlign: 'left',
    color: 'black',
  },
  containerStyle: {
    backgroundColor:'red',
    width: 291,
    height: 50,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 21,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15
  }
})

export default CustomInput;
