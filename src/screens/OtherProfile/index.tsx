import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  AppText,
  Commonbtn,
  ImageComponent,
  SpaceComponent,
  WrapperNoScroll,
} from "../../utilities/Helpers";
import { InitialProps } from "../../utilities/Props";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors, height, width } from "../../utilities/constants";
import SwiperFlatList from "react-native-swiper-flatlist";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./style";
import Fontisto from "react-native-vector-icons/Fontisto";
import { Cstyles } from "../../utilities/Cstyles";
import ConfirmModal from "../../modals/ConfirmModal";

const OtherProfile: React.FC<InitialProps> = (props) => {
  const data = props.route.params.data;
  const [blockModal, setBlockModal] = useState(false);
  return (
    <WrapperNoScroll>
      <View style={{ ...styles.headerSView, ...styles.headerView1 }}>
        <Ionicons
          name={"chevron-back"}
          size={35}
          color={colors.main2}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
        <View style={{ ...styles.headerSView, ...styles.headerView2 }}>
          <Icon
            name={"block-helper"}
            size={25}
            color={colors.main2}
            onPress={() => {setBlockModal(true)}}
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
        <View style={{ width: width, height: height / 2 }}>
          {data.images.length !== 0 ? (
            <SwiperFlatList
              showPagination
              paginationStyle={{
                backgroundColor: colors.main2,
                borderRadius: 8,
                alignItems: "center",
              }}
              paginationStyleItem={{ height: 10, width: 10 }}
              data={data?.images}
              renderItem={({ item }) => (
                <ImageComponent
                  resizeMode="contain"
                  source={{ uri: item }}
                  style={{ width: width, height: height / 2 }}
                />
              )}
            />
          ) : (
            <View
              style={{
                width: width,
                height: height / 2,
                backgroundColor: "darkgrey",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Fontisto name={"person"} size={width / 1.5} color={"grey"} />
            </View>
          )}
        </View>
        <AppText style={{ ...Cstyles.widthview }}>
          {data?.name} , {data?.age}
        </AppText>
        <AppText>Online Now</AppText>
      </ScrollView>
      <Commonbtn title="I Like You  ❤️" onPress={() => {}} />
      <SpaceComponent />
      <ConfirmModal
        isVisible={blockModal}
        title={`Are You sure you want to Block ${data?.name} ?`}
        onBackdropPress={() => {
          setBlockModal(false);
        }}
      />
    </WrapperNoScroll>
  );
};

export default OtherProfile;
