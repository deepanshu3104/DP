import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Modal from "react-native-modal";
import { colors, height, width } from '../utilities/constants';

const filters = [
  { key: 1, value: 'Unread', state: false },
  { key: 2, value: 'Favorites', state: false },
  { key: 3, value: 'Online', state: false }
]

const ChatFilter = ({ isVisible = false, onBackdropPress, onModalHide }: any) => {
  return (
    <Modal
      animationIn={"slideInRight"}
      animationOut={"slideOutRight"}
      isVisible={isVisible}
      backdropOpacity={0.4}
      onBackdropPress={onBackdropPress}
      onModalHide={onModalHide}
    >
      <View
        style={{
          backgroundColor: "white",
          height: height,
          width: width / 1.8,
          alignSelf: 'flex-end',
          right: -20
        }}
      >
        <Text style={{}}>Message Filters</Text>
        <FlatList data={filters} renderItem={({ item, index }) => (<View style={{ flexDirection: 'row', backgroundColor: 'red' ,alignItems:'center'}}>
          <View style={{ height: 30, width: 30, marginHorizontal: 20, backgroundColor: item.state ? colors.main2 : colors.main1, borderWidth: 1, borderColor: colors.main2 }} />
          <Text>{item.value}</Text>
        </View>)} />
      </View>
    </Modal>
  )
}

export default ChatFilter

const styles = StyleSheet.create({})