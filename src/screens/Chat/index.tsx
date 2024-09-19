import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { ImageComponent, Wrapper, WrapperNoScroll } from "../../utilities/Helpers";
import { InitialProps } from "../../utilities/Props";
import { styles } from "./style";
import { colors, width } from "../../utilities/constants";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { TextInput } from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const data = [
  {
    "message": "Just checking in!",
    "sentBy": "0",
    "timestamp": "2024-09-13T10:30:00Z",
  },
  {
    "message": "Don't forget to review the document.",
    "sentBy": "1",
    "timestamp": "2024-09-15T18:47:00Z",
  },
  {
    "message": "Looking forward to our meeting.",
    "sentBy": "0",
    "timestamp": "2024-09-15T18:47:00Z",
  },
]

interface Message {
  message: string;
  sentBy: string;
  timestamp: string;
  showDate?: string;
}

interface MessageProps {
  item: Message;
  show: Boolean
  mine: Boolean
}

const Chat: React.FC<InitialProps> = (props) => {

  const routedData = props.route.params.data

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    SetDate()
  }, [])

  function SetDate() {
    const updatedMessages = data.map((item) => ({
      ...item,
      showDate: categorizeDate(item.timestamp),
    }));
    setMessages(updatedMessages);
  }


  return (
    <WrapperNoScroll>
      <ChatHeader data={routedData} onPress={() => { props.navigation.goBack() }} />
      <FlatList
      style={{backgroundColor:'red'}}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item: Message, index: number) => index.toString()}
      />
     <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={''}
        onChangeText={()=>{}}
      />
      <TouchableOpacity style={styles.button} onPress={()=>{}}>
        <Icon name="send-circle" size={36} color="white" />
      </TouchableOpacity>
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

function renderItem({ item }: any) {
  if (item.sentBy == 0) {
    return <MyMsg item={item} />
  } else {
    return <OtherMsg item={item} />
  }
}

let prevDate = ''

function MyMsg({ item }: any) {
  if (prevDate == item.showDate) {
    return (
      <Message item={item} show={false} mine={true} />
    )
  } else {
    prevDate = item.showDate;
    return (
      <Message item={item} show={true} mine={true} />
    )
  }

}
function OtherMsg({ item }: any) {
  if (prevDate == item.showDate) {
    return (
      <Message item={item} show={false} mine={false} />
    )
  } else {
    prevDate = item.showDate;
    return (
      <Message item={item} show={true} mine={false} />
    )
  }

}

function Message({
  item,
  show,
  mine
}: MessageProps) {
  return (
    <>
      {show && <Text style={{ marginBottom: 10, alignSelf: 'center', color: 'black', fontSize: width / 28 }}>{item.showDate}</Text>}
      <View style={{
        alignSelf: mine ? 'flex-end' : 'flex-start',
        alignItems: mine ? 'flex-end' : 'flex-start',
        marginRight: mine ? 15 : 0,
        marginLeft: mine ? 0 : 15,
        width: width / 1.7,
        marginBottom: 10
      }}>
        <View style={{ backgroundColor: colors.main2, padding: 10, borderRadius: 15, borderBottomRightRadius: mine ? 0 : 15, borderBottomLeftRadius: mine ? 15 : 0 }}>
          <Text style={{ color: 'white' }}>{item.message}</Text>
        </View>
        <Text>{moment(item.timestamp).format("hh:mm A")}</Text>
      </View>
    </>
  )
}

const categorizeDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const dateStartOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  if (dateStartOfDay.getTime() === today.getTime()) {
    return 'Today';
  } else if (dateStartOfDay.getTime() === yesterday.getTime()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString();
  }
};











