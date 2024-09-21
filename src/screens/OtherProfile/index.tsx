import { View, Text, ScrollView } from "react-native";
import React from "react";
import { AppText, Commonbtn, ImageComponent, Wrapper, WrapperNoScroll } from "../../utilities/Helpers";
import { InitialProps } from "../../utilities/Props";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors, height, width } from "../../utilities/constants";
import SwiperFlatList from "react-native-swiper-flatlist";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./style";
const Colors = ["tomato", "thistle", "skyblue", "teal"];

const OtherProfile: React.FC<InitialProps> = (props) => {
  const data = props.route.params.data;

  return (
    <WrapperNoScroll>
      <View style={{ ...styles.headerSView,...styles.headerView1 }}>
        <Ionicons
          name={"chevron-back"}
          size={35}
          color={colors.main2}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
        <View style={{ ...styles.headerSView,...styles.headerView2 }}>
          <Icon
            name={"block-helper"}
            size={25}
            color={colors.main2}
            onPress={() => {
            }}
          />
          <Icon
            name={"star-outline"}
            size={35}
            color={colors.main2}
            onPress={() => {
              props.navigation.goBack();
            }}
          />
        </View>
      </View>
      <ScrollView>
      <View>
      <SwiperFlatList
        showPagination
        paginationStyle={{backgroundColor:'red'}}
        data={data?.images}
        renderItem={({ item }) => (
          <ImageComponent
            resizeMode="contain"
            source={{ uri: item }}
            style={{ width: width, height: height / 2 }}
          />
        )}
      />
      </View>
      <AppText>{data?.name}</AppText>
      <AppText>{data?.age}</AppText>
      </ScrollView>
      <Commonbtn title="Send Like" onPress={()=>{}} />
    </WrapperNoScroll>

  );
};

export default OtherProfile;
