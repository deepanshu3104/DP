import { FlatList, Text, View } from "react-native";
import React from "react";
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

const Inbox: React.FC<InitialProps> = (props) => {
  function renderItem({ item, index }: any) {
    return (
      <TouchableComponent
        style={{
          width: width / 1.05,
          height: 80,
          alignSelf: "center",
          flexDirection:'row',
          justifyContent:'space-evenly'
        }}
      >
        <View
          style={{
            backgroundColor: "darkgrey",
            width: 55,
            height: 55,
            borderRadius: 8,
            alignItems:'center',
            justifyContent:'center'
          }}
        >
         <Fontisto
          name={"person"}
          size={45}
          color={'grey'}
        />
        </View>
        <View
          style={{
            width: width / 1.25,
            height: 60,
            alignSelf: "center",
            borderBottomWidth:2
          }}
        ></View>
      </TouchableComponent>
    );
  }
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
      <FlatList data={profiles} renderItem={renderItem} />
    </Wrapper>
  );
};

export default Inbox;
