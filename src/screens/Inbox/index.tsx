import { FlatList, Image, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
  TouchableComponent,
  Wrapper,
} from "../../utilities/Helpers";
import { InitialProps } from "../../utilities/Props";
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
  const [loading, setLoading] = useState(true);

  const GetChats = async () => {
    let user = await AsyncStorage.getItem('uid');
    console.log(user, 'User ID');
  
    try {
      const querySnapshot = await firestore().collection('Chat').get();
      let chats: any = [];
  
      if (!querySnapshot.empty) {
        for (const doc of querySnapshot.docs) {
          const [a, b] = doc.id.split('_');
          console.log(a, b, 'Chat participants');
  
          if (a === user || b === user) {
            console.log("Processing chat...");
  
            let otherUserId = a === user ? b : a;
            console.log('Other User ID:', otherUserId);
  
            const userSnapshot = await firestore()
              .collection('Users')
              .where('id', '==', otherUserId)
              .get();
            console.log(userSnapshot, 'User Snapshot');
  
            if (!userSnapshot.empty) {
              const userData = userSnapshot.docs[0].data();
              const messagesSnapshot = await firestore()
                .collection('Chat')
                .doc(doc.id)
                .collection('messages')
                .orderBy('createdAt', 'desc')
                .limit(1)
                .get();
              console.log(userData, 'User Data');
  
              let lastMessage: any = null;
              let timeString = null;
  
              if (!messagesSnapshot.empty) {
                const messageData = messagesSnapshot.docs[0].data();
  
                // Check if the user is in deleteCh
                lastMessage = messageData.deleteCh?.includes(user)
                  ? null // Don't show message if user is in deleteCh
                  : messageData.message;
  
                if (messageData.createdAt) {
                  const timestamp = messageData.createdAt.toDate();
                  const hours = timestamp.getHours();
                  const minutes = timestamp.getMinutes();
                  const ampm = hours >= 12 ? 'pm' : 'am';
                  const formattedHours = hours % 12 || 12;
                  timeString = `${formattedHours}:${minutes
                    .toString()
                    .padStart(2, '0')} ${ampm}`;
                }
              }
  
              const chatItem = {
                id: otherUserId,
                name: userData.name,
                images: userData.images,
                lastMessage: lastMessage, // Message is null if user is in deleteCh
                lastMsgTime: timeString,
              };
              console.log(chatItem, 'Chat Item');
  
              chats.push(chatItem);
            }
          }
        }
      }
      setChatData(chats);
      console.log(chats, "Chats fetched");
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };
  
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
      {loading ? [1, 2, 3, 4].map((item) => (
        <View style={{
          width: width / 1.05,
          height: 80,
          alignSelf: "center",
          flexDirection: "row",
          marginLeft: 40,
          alignItems: "center",
        }}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            duration={2000}
            style={{
              height: width / 7.5,
              width: width / 7.5,


              borderRadius: 8
            }}
          /><View style={{ marginLeft: 10 }}>
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              duration={2000}
              style={{
                height: 25,
                width: width / 1.5,
                borderRadius: 5
              }}
            />
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              duration={2000}
              style={{
                height: 15,
                width: width / 2.5,
                borderRadius: 5,
                marginTop: 5
              }}
            /></View>
        </View>
      )) :
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
          ListEmptyComponent={() => (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", alignSelf: 'center' }}>
              <Text style={{ fontSize: 18, color: "gray", alignSelf: 'center' }}>There is no conversation yet 🫣</Text>
            </View>
          )}

        />}
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
