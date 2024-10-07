import { FlatList, Text, View } from "react-native";
import React from "react";
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

const Inbox: React.FC<InitialProps> = (props) => {
  return (
    <Wrapper>
      <View style={styles.headerview}>
        <Text style={styles.headertext}>Inbox</Text>
        <Fontisto
          name={"filter"}
          size={25}
          color={colors.main2}
          onPress={() => {}}
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
      <ChatFilter isVisible={true} />
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
