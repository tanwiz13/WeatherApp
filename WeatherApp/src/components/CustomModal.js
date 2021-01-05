import React, { Component } from 'react';
import Modal from 'react-native-modal';
import { StyleSheet, View, } from 'react-native';

class CustomModal extends Component {

  render() {
    const { renderContent = () => {}, modalStyle, modalHeight = 300, backdropColor = 'black',
      backdropOpacity = 0.4, borderTopLeftRadius = 25, borderTopRightRadius = 25,
      visible=false, onModalHide=()=>{}, onBackdropPress=()=>{}, alignBottom = true } = this.props;
    return (
      <Modal
        isVisible={visible}
        onRequestClose={()=>onModalHide(false)}
        backdropColor={backdropColor}
        backdropOpacity={backdropOpacity}
        onModalHide={()=>{onModalHide(false)}}
        onBackdropPress={() => onBackdropPress()}
        style={[alignBottom ?styles.bottomModal : null,modalStyle]}>
        <View style={[styles.modalContent,{height: modalHeight, borderTopLeftRadius: borderTopLeftRadius,borderTopRightRadius: borderTopRightRadius}]}>
          {renderContent}
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
})

export default CustomModal;
