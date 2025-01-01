import { Alert, FlatList, Image, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
  ImageComponent,
  TouchableComponent,
  Wrapper,
} from "../../utilities/Helpers";
import { InitialProps } from "../../utilities/Props";
import { profiles } from "../../utilities/data";
import { colors, width } from "../../utilities/constants";
import { styles } from "./style";
import Fontisto from "react-native-vector-icons/Fontisto";
import ChatFilter from "../../modals/ChatFilter";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const Inbox: React.FC<InitialProps> = (props) => {

  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
  useEffect(() => {
    GetChats()
  }, [])

  const [chatData, setChatData] = useState()


  const GetChats = async () => {

    let user = await AsyncStorage.getItem('uid');
    console.log(user, 'yyyyyyyy');
    console.log(user, 'deeppepe');

    try {
      const querySnapshot = await firestore().collection('Chat').get();
      let chats: any = [];

      if (!querySnapshot.empty) {
        console.log('jjjjj');

        for (const doc of querySnapshot.docs) {
          const [a, b] = doc.id.split('_');
          console.log(a, b, 'vishu');


          if (a === user || b === user) {
            console.log("if part==>>")
            let otherUserId = a === user ? b : a;
            console.log('other id', otherUserId)

            const userSnapshot = await firestore()
              .collection('Users')
              .where('id', '==', otherUserId)
              .get();
            console.log(userSnapshot, 'userSnapshot');

            if (!userSnapshot.empty) {
              const userData = userSnapshot.docs[0].data();
              const messagesSnapshot = await firestore()
                .collection('Chat')
                .doc(doc.id)
                .collection('messages')
                .orderBy('createdAt', 'desc')
                .limit(1)
                .get();
              console.log(userData, 'userData');

              let lastMessage: any = null;
              let timeString = null;
              // console.log(messagesSnapshot._query._collectionPath._parts[1]);
              if (!messagesSnapshot.empty) {
                lastMessage = messagesSnapshot.docs[0].data();
                // console.log(messagesSnapshot.docs[0].data());
                const timestamp = lastMessage.createdAt.toDate();
                const hours = timestamp.getHours();
                const minutes = timestamp.getMinutes();
                const ampm = hours >= 12 ? 'pm' : 'am';
                const formattedHours = hours % 12 || 12;
                timeString = `${formattedHours}:${minutes
                  .toString()
                  .padStart(2, '0')} ${ampm}`;
              }

              const chatItem = {
                id: otherUserId,
                name: userData.name,
                images: userData.images,
                lastMessage: lastMessage.message,
                lastMsgTime: timeString,
              };
              console.log(chatItem, 'deeps');

              chats.push(chatItem);
            }
          }
        }
      }
      setChatData(chats);
      console.log(chats, "vvvvvvvvvvvvvvvvvv");


    } catch (error) {

      console.error('Error fetching documents:', error);
    }
  };





  const [filterModal, setFilterModal] = useState(false);
  return (
    <Wrapper>
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        stopAutoRun
      />
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
        data={chatData}
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
        <Image source={{ uri: item.images[0] }}
          style={{
            height: width / 7.5,
            width: width / 7.5,
            marginHorizontal: 10,
            marginLeft: 10,
            borderRadius: 8
          }} />
      </View>
      <View style={styles.messageTextView}>
        <View style={styles.messageTextView2}>
          <Text style={styles.messageName}>{item.name}</Text>
          <Text numberOfLines={1} style={styles.lastMessage}>
            {item.lastMessage}
          </Text>
        </View>
        <View style={styles.messageTextView3}>
          <Text style={styles.messageTime}>{item.lastMsgTime}</Text>
          <View style={styles.unreadMsgView}>
            <Text style={styles.unreadMsgText}>1</Text>
          </View>
        </View>
      </View>
    </TouchableComponent>
  );
}
