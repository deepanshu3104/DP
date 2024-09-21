import { FlatList, Text, View } from "react-native";
import React from "react";
import { InitialProps } from "../../utilities/Props";
import {
  ImageComponent,
  TouchableComponent,
  Wrapper,
} from "../../utilities/Helpers";
import { profiles } from "../../utilities/data";
import { colors, width } from "../../utilities/constants";
import Fontisto from "react-native-vector-icons/Fontisto";
import { styles } from "./style";

const Home: React.FC<InitialProps> = (props) => {
  function renderProfiles({ item }: any) {
    return (
      <TouchableComponent
        onPress={() => {
          props.navigation.navigate("OtherProfile", { data: item });
        }}
        style={styles.cardView}
      >
        <View style={{ ...styles.cardCommon, ...styles.messageImageView }}>
          {item?.images?.length !== 0 ? (
            <ImageComponent
              source={{ uri: item?.images?.[0] }}
              style={styles.cardCommon}
            />
          ) : (
            <Fontisto name={"person"} size={width / 5} color={"grey"} />
          )}
        </View>
        {/* <Fontisto name={"star"} size={20} color={'#FFD700'}  style={{position:'absolute',top:5,right:5}}/> */}
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
