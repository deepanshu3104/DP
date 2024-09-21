import { Alert, FlatList, Text, View } from "react-native";
import React from "react";
import { InitialProps } from "../../utilities/Props";
import {
  ImageComponent,
  TouchableComponent,
  Wrapper,
} from "../../utilities/Helpers";
import { profiles } from "../../utilities/data";
import { colors, fonts, width } from "../../utilities/constants";

import Fontisto from "react-native-vector-icons/Fontisto";
import { styles } from "./style";



const Home: React.FC<InitialProps> = (props) => {
  function renderProfiles({ item }: any) {
    return (
      <TouchableComponent
        onPress={() => {
          props.navigation.navigate("OtherProfile",{data:item});
        }}
        style={{
          width: width / 3,
          height:width/3,
          alignItems: "center",
          justifyContent:'center',
          borderWidth:1
        }}
      >
         {item?.images?.length !== 0 ?
          <View style={styles.messageImageView}>
            <ImageComponent source={{ uri: item?.images?.[0] }} style={{
             ...styles.cardCommon
            }} />
          </View>
          :
          <View style={{...styles.cardCommon,...styles.messageImageView}}>
            <Fontisto name={"person"} size={25} color={"grey"} />
          </View>}
      </TouchableComponent>
    );
  }
  return (
    <Wrapper>
      <View style={styles.headerview}>
        <Text style={styles.headertext}>Datify</Text>
        <Fontisto
          name={"filter"}
          size={25}
          color={colors.main2}
          onPress={() => {}}
        />
      </View>
      <FlatList data={profiles} numColumns={3} renderItem={renderProfiles} />
    </Wrapper>
  );
};

export default Home;

