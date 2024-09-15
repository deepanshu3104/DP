import { View, Text } from "react-native";
import React from "react";
import { Wrapper } from "../../utilities/Helpers";
import { InitialProps } from "../../utilities/Props";
import { styles } from "./style";

const Chat: React.FC<InitialProps> = (props) => {
  return (
    <Wrapper>
      <ChatHeader />
      <Text>Chat</Text>
    </Wrapper>
  );
};

export default Chat;

function ChatHeader() {
  return (
    <View style={styles.headerview}>
      <Text>Hiiii</Text>
    </View>
  );
}
