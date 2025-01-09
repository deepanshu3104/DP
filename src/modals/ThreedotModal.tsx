import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import {
    AppText,
    TouchableComponent,
} from "../utilities/Helpers";
import { colors, width } from "../utilities/constants";
import ConfirmModal from "./ConfirmModal";


const ThreedotModal = ({ isVisible, title, onPress, onBackdropPress, props, onBlockPress, onChatPress }: any) => {



    return (
        <Modal
            animationIn={"slideInDown"}
            animationOut={"slideInDown"}
            isVisible={isVisible}
            backdropOpacity={0.1}
            onBackdropPress={onBackdropPress}
        >
            <View style={{
                width: width / 3,
                height: 60,
                //   borderWidth:1,
                alignSelf: 'center',
                bottom: width / 1.12,
                marginLeft: width / 1.8,
                backgroundColor: 'white',
                borderRadius: 10,
            }}>
                <TouchableComponent style={{ height: 30, borderBottomWidth: 1 }} onPress={onBlockPress} >
                    <AppText style={{ textAlign: 'center', color: 'black', fontSize: 15 }} >Block </AppText>
                </TouchableComponent>
                <TouchableComponent style={{ height: 30 }} onPress={onChatPress} >
                    <AppText style={{ textAlign: 'center', color: 'black', fontSize: 15 }} >Clear Conversation</AppText>
                </TouchableComponent>
            </View>

        </Modal>

    )
}

export default ThreedotModal