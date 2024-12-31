import { Alert, FlatList, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
  ImageComponent,
  TouchableComponent,
  Wrapper,
} from "../../utilities/Helpers";
import { InitialProps } from "../../utilities/Props";
import { profiles } from "../../utilities/data";
import { colors } from "../../utilities/constants";
import { styles } from "./style";
import Fontisto from "react-native-vector-icons/Fontisto";
import ChatFilter from "../../modals/ChatFilter";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Inbox: React.FC<InitialProps> = (props) => {

  // useEffect(() => {
  //   User()
  // }, [])



  // const User = async () => {
  //   try {
  //     // Get current user's UID from AsyncStorage
  //     const uid: any = await AsyncStorage.getItem('uid');
  //     console.log(uid, ".......,,,,,,,,,,,,,");

  //     let dataa: string[] = [];
  //     const chatSnapshot = await firestore().collection('Chat').get();
  //     for (const chatDoc of chatSnapshot.docs) {
  //       const chatDocId = chatDoc.id;
  //       const messagesSnapshot = await firestore()
  //         .collection('Chat')
  //         .doc(chatDocId)
  //         .collection('messages')
  //         .get();

  //       messagesSnapshot.forEach((messageDoc) => {
  //         const messageData = messageDoc.data();

  //         if (messageData.sentBy === uid && !dataa.includes(messageData.sentTo)) {
  //           dataa.push(messageData.sentTo);
  //         } else if (messageData.sentTo === uid && !dataa.includes(messageData.sentBy)) {
  //           dataa.push(messageData.sentBy);
  //         }
  //       });
  //     }

  //     console.log('Unique user data:', dataa);
  //     console.log('Done fetching chat users.');

  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //   }
  // };




  const [filterModal, setFilterModal] = useState(false);
  return (
    <Wrapper>
      <View style={styles.headerview}>
        <Text style={styles.headertext}>Inbox</Text>
        <Fontisto
          name={"filter"}
          size={25}
          color={colors.main2}
          onPress={() => { setFilterModal(true) }}
        />
      </View>
      <FlatList
        data={profiles}
        renderItem={({ item, index }) => (
          <RenderItem
            item={item}
            index={index}
            onPress={() => {
              props.navigation.navigate("Chat", { data: item });
            }}
          />
        )}
        keyExtractor={(item: any, index: number) => index.toString()}
      />
      <ChatFilter isVisible={filterModal} onBackdropPress={() => setFilterModal(false)} onModalHide={() => {
        // Alert.alert('hiii')
      }} />
    </Wrapper>
  );
};

export default Inbox;

interface RenderItemProps {
  item: any;
  index: number;
  onPress: () => void;
}

function RenderItem({ item, index, onPress }: RenderItemProps) {
  return (
    <TouchableComponent style={styles.messageItem} onPress={onPress}>
      <View style={styles.messageImageView}>
        <Fontisto name={"person"} size={45} color={"grey"} />
      </View>
      <View style={styles.messageTextView}>
        <View style={styles.messageTextView2}>
          <Text style={styles.messageName}>{item.name}</Text>
          <Text numberOfLines={1} style={styles.lastMessage}>
            {item.bio}
          </Text>
        </View>
        <View style={styles.messageTextView3}>
          <Text style={styles.messageTime}>23-06-2024</Text>
          <View style={styles.unreadMsgView}>
            <Text style={styles.unreadMsgText}>2</Text>
          </View>
        </View>
      </View>
    </TouchableComponent>
  );
}
