import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { ImageComponent, TouchableComponent, Wrapper, WrapperNoScroll } from "../../utilities/Helpers";
import { InitialProps } from "../../utilities/Props";
import { styles } from "./style";
import { colors, width } from "../../utilities/constants";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { TextInput } from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import Icon from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";


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
}

const Chat: React.FC<InitialProps> = (props) => {



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
      
      console.log(docId,('.....................'));
      const messageRef = firestore()
      .collection('Chat')
      .doc(docId)
      .collection('messages')
      .orderBy('createdAt', 'asc');

      const unSubscribe = messageRef.onSnapshot(querySnap => {
        const allMessages:any = querySnap.docs.map(docSnap => {
          const data1 = docSnap.data();
          console.log(data1,"dee[");
          
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
            showDate:categorizeDate(data1.createdAt.toDate())
          };
        });
        console.log(allMessages,'alll');
        
        setMessages(allMessages);
      });

      return () => {
        unSubscribe();
      };
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };
  const formatTime = (timestamp:any) => {
    const currentDate :any = new Date();
    const targetDate :any= new Date(timestamp);
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



  async function OnSend(message:any){
    const sentBy: any = await AsyncStorage.getItem('uid')
    const sentTo: any = routedData.id

    const docid = sentTo > sentBy ? sentBy + '_' + sentTo : sentTo + '_' + sentBy;

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
    createdAt: new Date()
  };

  await newmsgRef.set(mymsg);
  setMessage('')
  }


  return (
    <WrapperNoScroll>
      <ChatHeader data={routedData} onPress={() => { props.navigation.goBack() }} />
      <FlatList
        data={messages}
        renderItem={({item})=>renderItem(item,uid)}
        keyExtractor={(item: Message, index: number) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={(text) => { setMessage(text)}}
        />
        <TouchableComponent style={styles.sendButton} onPress={() => {
          OnSend(message)
         }}>
          <Icon name="send" size={25} color="white" />
        </TouchableComponent>
      </View>
    </WrapperNoScroll>
  );
};

export default Chat;



function ChatHeader({ data, onPress }: { data: any, onPress: () => void }) {

  return (
    <View style={styles.headerview}>
      <Ionicons name={"chevron-back"} size={35} color={colors.main2} onPress={onPress} />
      <View style={{ width: width / 1.3, flexDirection: 'row', alignItems: 'center' }}>
        {data?.images?.length !== 0 ?
          <View style={styles.messageImageView}>
            <ImageComponent source={{ uri: data.images[0] }} style={{
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
      <Entypo name={"dots-three-vertical"} size={24} color={colors.main2} onPress={() => {
      }} />
    </View>
  );
}

let prevDate : any = '';

function renderItem(item: Message, uid: string) {
  const showDate  = item.showDate !== prevDate; // Compare the current message date with the previous one.
  if (showDate) prevDate = item.showDate; // Update prevDate if the current date is different.

  return (
    <Message
      item={item}
      show={showDate}
      mine={item.sentBy === uid}
    />
  );
}




function MyMsg({ item }: any) {
  const showDate = prevDate !== item?.showDate; // Compare the current message date with the previous one.
  if (showDate) prevDate = item?.showDate; // Update prevDate if the current date is different.

  return <Message item={item} show={showDate} mine={true} />;
}

function OtherMsg({ item }: any) {
  const showDate = prevDate !== item?.showDate;
  if (showDate) prevDate = item?.showDate;

  return <Message item={item} show={showDate} mine={false} />;
}

function Message({ item, show, mine }: MessageProps) {
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
    </>
  );
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















