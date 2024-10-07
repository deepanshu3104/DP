import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Modal from "react-native-modal";
import { height, width } from '../utilities/constants';

const ChatFilter = ({isVisible,onBackdropPress}:any) => {
  return (
    <Modal
      animationIn={"slideInLeft"}
      animationOut={"slideOutRight"}
      isVisible={isVisible}
      backdropOpacity={0.4}
      onBackdropPress={onBackdropPress}
    >
      <View
        style={{
          backgroundColor: "white",
          height: height,
          width:width/1.8,
          alignSelf:'flex-end',
          right:-20
        }}
      >
      
      </View>
    </Modal>
  )
}

export default ChatFilter

const styles = StyleSheet.create({})