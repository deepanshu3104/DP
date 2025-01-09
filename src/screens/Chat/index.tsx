import { View, Text, FlatList,} from "react-native";
import React, { useState, useEffect } from "react";
import { ImageComponent, TouchableComponent,WrapperNoScroll } from "../../utilities/Helpers";
import { InitialProps } from "../../utilities/Props";
import { styles } from "./style";
import { colors, width } from "../../utilities/constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { TextInput } from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import Icon from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThreedotModal from "../../modals/ThreedotModal";
import ConfirmModal from "../../modals/ConfirmModal";


interface Message {
  message: string;
  sentBy: string;
  createdAt: string;
  showDate?: string;
  timeString?: string
}

interface MessageProps {
  item: Message;
  show: Boolean
  mine: Boolean
  onPress?: () => void;
  onProfilePress?: ()=>void
  props?:any

}

const Chat: React.FC<InitialProps> = (props) => {

  const [chunnu, setChunnu] = useState<any>(false)

  const routedData = props.route.params.data

  useEffect(() => {
    console.log("useEffect")

    fetchChatMessages();
  }, []);

  const fetchChatMessages = async () => {
    try {
      const myUid: any = await AsyncStorage.getItem('uid')
      setUid(myUid)
      const otherUid: any = routedData.id

      const docId =
        otherUid > myUid ? `${myUid}_${otherUid}` : `${otherUid}_${myUid}`;

      console.log(docId, ('.....................'));
      const messageRef = firestore()
        .collection('Chat')
        .doc(docId)
        .collection('messages')
        .orderBy('createdAt', 'asc');

      const unSubscribe = messageRef.onSnapshot(querySnap => {
        const allMessages: any = querySnap.docs.map(docSnap => {
          const data1 = docSnap.data();
          console.log(data1, "dee[");

          const timestamp = data1.createdAt.toDate();
          const date = formatTime(timestamp);
          const hours = timestamp.getHours();
          const minutes = timestamp.getMinutes();
          const ampm = hours >= 12 ? 'pm' : 'am';
          const formattedHours = hours % 12 || 12;

          const timeString = `${formattedHours}:${minutes
            .toString()
            .padStart(2, '0')} ${ampm}`;

          return {
            ...data1,
            timeString,
            date,
            showDate: categorizeDate(data1.createdAt.toDate()),

          };
        });
        console.log(allMessages, 'alll');

        setMessages(allMessages);
      });

      return () => {
        unSubscribe();
      };
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const formatTime = (timestamp: any) => {
    const currentDate: any = new Date();
    const targetDate: any = new Date(timestamp);
    const timeDiff = currentDate - targetDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (
      targetDate.getDate() === currentDate.getDate() &&
      targetDate.getMonth() === currentDate.getMonth() &&
      targetDate.getFullYear() === currentDate.getFullYear()
    ) {
      return 'Today';
    } else if (daysDiff === 1) {
      return 'Yesterday';
    } else {
      const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      };
      const formattedDate = targetDate.toLocaleDateString(undefined, options);
      const [month, day, year] = formattedDate.split('/');
      return `${day}/${month}/${year}`;
    }
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [uid, setUid] = useState<any>('');
  const [message, setMessage] = useState<any>('');
  useEffect(() => {
    // SetDate()


  }, [])
  async function OnSend(message: any) {
    const trimmedMessage = message.trim();


    if (!trimmedMessage) {
      console.log("Cannot send an empty message.");
      return;
    }
    const sentBy: any = await AsyncStorage.getItem('uid')
    const sentTo: any = routedData.id

    const docid = sentTo > sentBy ? sentBy + '_' + sentTo : sentTo + '_' + sentBy;
    const chatDocRef = firestore().collection('Chat').doc(docid);

    // Add or update the "Status" field in the Chat document
    await chatDocRef.set(
      { Status: true }, // or your desired status value
      { merge: true } // Merge ensures you don't overwrite existing fields
    );

    const msgRef = firestore()
      .collection('Chat')
      .doc(docid)
      .collection('messages');

    const newmsgRef = msgRef.doc();
    const msgId = newmsgRef.id;

    let mymsg = {
      messageId: msgId,
      type: 'text',
      message: message,
      sentBy: sentBy,
      sentTo: sentTo,
      createdAt: new Date(),
      deleteCh :[],
     
    };

    await newmsgRef.set(mymsg);
    setMessage('')
  }
  const [blockModal, setBlockModal] = useState(false);
  const [chatModal, setChatModal] = useState(false);

  const block = async () => {

    try {
      const querySnapshot = await firestore().collection('Users').get();
      const uid: any = await AsyncStorage.getItem('uid')

      let dataa: any = [];
      querySnapshot.forEach(documentSnapshot => {

        if (documentSnapshot.id == uid) {
          dataa.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        }

      });

      console.log('user data==>>>>', dataa);

      const firstUserRef = firestore().collection('Users').doc(uid);
      await firstUserRef.update({
        blocked: [...dataa[0].blocked, routedData.id]
      });

      const sentBy: any = await AsyncStorage.getItem('uid')
      const sentTo: any = routedData.id
      const docid = sentTo > sentBy ? sentBy + '_' + sentTo : sentTo + '_' + sentBy;
      console.log(docid, "chatssss vishu");

      const msgRef = await firestore()
        .collection('Chat')
        .doc(docid)
        .delete()
      console.log(msgRef, " chatssssssss deleted")
      console.log('done');
      setBlockModal(false)
      props.navigation.navigate('Home')
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteChat = async () => {
    try {
      const uid = await AsyncStorage.getItem('uid');
      if (!uid) {
        console.error("User ID not found in AsyncStorage");
        return;
      }
  
      const sentTo = routedData.id;
      const docid = sentTo > uid ? `${uid}_${sentTo}` : `${sentTo}_${uid}`;
      
      const chatRef = firestore().collection('Chat').doc(docid).collection('messages');
      const messagesSnapshot = await chatRef.get();
  
      const batch = firestore().batch();
  
      messagesSnapshot.forEach((doc) => {
        batch.update(doc.ref, { deleteCh: uid });
      });
  
      await batch.commit();
  
      console.log("All messages deleted successfully for chat:", docid);
      setChatModal(false);
    } catch (error) {
      console.error("Error deleting chat messages:", error);
    }
  };
  

  let prevDate: any = '';

function renderItem(item: Message, uid: string) {
  const showDate = item.showDate !== prevDate; // Compare the current message date with the previous one.
  if (showDate) prevDate = item.showDate; // Update prevDate if the current date is different.
 const status  = item.deleteCh.includes(uid)
 console.log(status);
 if(!status){
  return (
  <Message
      item={item}
      show={showDate}
      mine={item.sentBy === uid}
      props={props}
    />
  );
}
}


  return (
    <WrapperNoScroll>
      <ChatHeader
        data={routedData}
        onPress={() => { props.navigation.goBack() }}
        onDotsPress={() => { setChunnu(!chunnu) }} />

    <FlatList
        data={messages}
        renderItem={({ item }) => renderItem(item, uid)}
        keyExtractor={(item: Message, index: number) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={(text) => { setMessage(text) }}
        />
        <TouchableComponent style={styles.sendButton} onPress={() => {
          OnSend(message)
        }}>
          <Icon name="send" size={25} color="white" />
        </TouchableComponent>
      </View>
      <ThreedotModal
        isVisible={chunnu}

        onBackdropPress={() => {
          setChunnu(false);
        }}
        onBlockPress={() => {
          setChunnu(false);
          setBlockModal(true)
        }}
        onChatPress={() => {
          setChunnu(false);
          setChatModal(true)
        }}
      // onPress={() => fetchProducts()}
      />

      <ConfirmModal
        isVisible={blockModal}
        title={`Are You sure you want to Block ?`}
        onBackdropPress={() => {
          setBlockModal(false);
        }}

        onPress={() => block()}
      />
      <ConfirmModal
        isVisible={chatModal}
        title={`Are You sure you want to delete chat ?`}
        onBackdropPress={() => {
          setChatModal(false);
        }}

        onPress={() => deleteChat()}
      />
    </WrapperNoScroll>
  );
};


export default Chat;



function ChatHeader({ data, onPress, onDotsPress }: { data: any, onPress: () => void, onDotsPress: () => void }) {

  return (
    <View style={styles.headerview}>
      <Ionicons name={"chevron-back"} size={35} color={colors.main2} onPress={onPress} />
      <View style={{ width: width / 1.3, flexDirection: 'row', alignItems: 'center' }}>
        {data?.images?.length !== 0 ?
          <View style={styles.messageImageView}>
            <ImageComponent source={{ uri: data?.images[0] }} style={{
              width: 35,
              height: 35,
              borderRadius: 8,
            }} />
          </View>
          :
          <View style={styles.messageImageView}>
            <Fontisto name={"person"} size={25} color={"grey"} />
          </View>}
        <Text style={{ marginLeft: 10, color: colors.black, fontSize: width / 25, fontWeight: '500' }}>{data?.name}</Text>
      </View>
      <Entypo name={"dots-three-vertical"} size={24} color={colors.main2} onPress={onDotsPress} />
    </View>
  );
}



function Message({ item, show, mine,props}: MessageProps) {
  return (
    <>
      {show && item.showDate && (
        <Text style={{
          marginBottom: 10,
          alignSelf: 'center',
          color: 'gray',
          fontSize: width / 28,
        }}>
          {item.showDate}
        </Text>
      )}
      <MsgType item={item} show={show} mine={mine} props={props} />
    </>
  );
}

function MsgType({ item, show, mine,props }: MessageProps) {
  if (item.type == 'text') {
    return (
      <View style={{
        alignSelf: mine ? 'flex-end' : 'flex-start',
        marginHorizontal: 15,
        maxWidth: width / 1.7,
        marginBottom: 10,
      }}>
        <View style={{
          backgroundColor: mine ? colors.main2 : '#f1f1f1',
          padding: 10,
          borderRadius: 15,
          borderBottomRightRadius: mine ? 0 : 15,
          borderBottomLeftRadius: mine ? 15 : 0,
        }}>
          <Text style={{ color: mine ? 'white' : 'black' }}>{item.message}</Text>
        </View>
        <Text style={{
          color: 'gray',
          fontSize: width / 32,
          marginTop: 5,
          alignSelf: 'flex-end',
        }}>
          {item.timeString}
        </Text>
      </View>
    )
  } else if (item.type == 'profile_share') {
    return (
      <TouchableComponent onPress={()=>[
        props.navigation.navigate("OtherProfile",{data:item.profile})
      ]}>
        <View style={{
          alignSelf: mine ? 'flex-end' : 'flex-start',
          marginHorizontal: 15,
          maxWidth: width / 1.7,
          marginBottom: 10,
        }}>
          <View style={{
            marginTop: 20,
            flexDirection: 'row',
            backgroundColor: '#f5f5f5',
            height: 45,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.main2,
            borderRadius: 13, padding: 10
          }}>
            <ImageComponent source={{ uri: item.profile.image }}
              style={{
                height: width / 12,
                width: width / 12,
                marginRight: 5,
                borderRadius: width / 1
              }} />
            <Text style={{
              fontSize: 18,
              color: "black",
              fontWeight: '400'
            }}>{item.profile.name}</Text>
          </View>
          <Text style={{
            color: 'gray',
            fontSize: width / 32,
            marginTop: 5,
            alignSelf: 'flex-end',
          }}>
            {item.timeString}
          </Text>
        </View>
      </TouchableComponent>)
  }

}


const categorizeDate = (timestamp: string | Date) => {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const messageDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (messageDay.getTime() === today.getTime()) {
    return 'Today';
  } else if (messageDay.getTime() === yesterday.getTime()) {
    return 'Yesterday';
  } else {
    return `${messageDay.toLocaleDateString('en-GB')}`; // Format: DD/MM/YYYY
  }
};















