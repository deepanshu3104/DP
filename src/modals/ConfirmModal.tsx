import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import {
  AppText,
  TouchableComponent,
  TouchableText,
} from "../utilities/Helpers";
import { colors, width } from "../utilities/constants";
import firestore from '@react-native-firebase/firestore';


const ConfirmModal = ({ isVisible, title,onPress, onBackdropPress,props }: any) => {


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
          height: 140,
          justifyContent: "space-evenly",
          borderRadius: 13,
        }}
      >
        <AppText
          style={{
            alignSelf: "center",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "600",
            width: width / 1.2,
            color: "black",
          }}
        >
          {title}
        </AppText>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableText
          onPress={onPress}
            text="Yes"
            style={{ color: "white", fontSize: 16, fontWeight: "600" }}
            vstyle={{
              backgroundColor: colors.main2,
              paddingVertical: 4,
              paddingHorizontal: 15,
              borderRadius: 6,
            }}
          />
          <TouchableText
            onPress={onBackdropPress}
            text="No"
            style={{
              color: colors.main2,
              fontSize: 16,
              fontWeight: "600",
            }}
            vstyle={{
              backgroundColor: colors.white,
              borderWidth: 1,
              borderColor: colors.main2,
              paddingVertical: 4,
              paddingHorizontal: 15,
              borderRadius: 6,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({});
