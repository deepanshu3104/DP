import { FlatList, Text, View } from "react-native";
import React from "react";
import { InitialProps } from "../utilities/Props";
import { ImageComponent, Wrapper } from "../utilities/Helpers";
import { profiles } from "../utilities/data";
import { width } from "../utilities/constants";
import { Images } from "../utilities/Images";

function RenderImages({images}:any) {

  if (images?.length == 1) {
    return (
      <ImageComponent
        source={{ uri: images[0] }}
        style={{
          width: 80,
          height: 80,
          borderRadius: 8,
          position: "absolute",
          borderWidth: 2,
          borderColor: "black",
        }}
      />
    );
  } else if (images?.length > 1) {
    return (
      <View>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: "black",
            borderWidth: 2,
            borderColor: "#DADFF7",
            borderRadius: 8,
            bottom: -7,
            left: -7,
            transform: [{ rotate: "15deg" }],
          }}
        />
        <ImageComponent
          source={{ uri: images[0] }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 8,
            position: "absolute",
            borderWidth: 2,
            borderColor: "black",
          }}
        />
      </View>
    );
  } else {
    return (
      <ImageComponent
        source={Images.user}
        style={{ height: width / 3.5, width: width / 3.5 }}
      />
    );
  }
}

function renderProfiles({ item }: any) {
  return (
    <View
      style={{
        width: width / 3,
        minHeight: 100,
        borderBottomWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: "grey",
        alignItems: "center",
      }}
    >
      <RenderImages images={item.images} />
    </View>
  );
}

const Home: React.FC<InitialProps> = (props) => {
  return (
    <Wrapper>
      <FlatList data={profiles} numColumns={3} renderItem={renderProfiles} />
    </Wrapper>
  );
};

export default Home;
