import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat';

const ChatScreen1 = () => {
    const [messages, setMessages] = React.useState([]);

    const onSend = (newMessages = []) => {
        setMessages(GiftedChat.append(messages, newMessages));
        // Add logic to send messages to the server.
    };

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{ _id: 1 }}
        />
    );
}

export default ChatScreen1

const styles = StyleSheet.create({})