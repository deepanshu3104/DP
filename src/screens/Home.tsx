import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { InitialProps } from "../utilities/Props";
import {
  ImageComponent,
  TouchableComponent,
  Wrapper,
} from "../utilities/Helpers";
import { profiles } from "../utilities/data";
import { colors, fonts, width } from "../utilities/constants";
import { Images } from "../utilities/Images";
import Fontisto from "react-native-vector-icons/Fontisto";



const Home: React.FC<InitialProps> = (props) => {
  function renderProfiles({ item }: any) {
    return (
      <TouchableComponent
        onPress={() => {
          props.navigation.navigate("OtherProfile");
        }}
        style={{
          width: width / 3,
          minHeight: 100,
          borderBottomWidth: 0.5,
          borderRightWidth: 0.5,
          borderColor: "grey",
          alignItems: "center",
        }}
      >
         {item?.images?.length !== 0 ?
          <View style={styles.messageImageView}>
            <ImageComponent source={{ uri: item?.images?.[0] }} style={{
              width: width/3,
              height:width/3,
              borderRadius: 8,
            }} />
          </View>
          :
          <View style={styles.messageImageView}>
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

const styles = StyleSheet.create({
  headerview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
  },
  headertext: {
    fontFamily: fonts.playregular,
    color: colors.main2,
    fontSize: 18,
  },
  messageImageView: {
    backgroundColor: "darkgrey",
    width: width/3,
    height:150,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});



// function RenderImages({ images }: any) {
//   if (images?.length == 1) {
//     return (
//       <ImageComponent
//         source={{ uri: images[0] }}
//         style={{
//           width: 80,
//           height: 80,
//           borderRadius: 8,
//           position: "absolute",
//           borderWidth: 2,
//           borderColor: "black",
//         }}
//       />
//     );
//   } else if (images?.length > 1) {
//     return (
//       <View>
//         <View
//           style={{
//             width: 80,
//             height: 80,
//             backgroundColor: "black",
//             borderWidth: 2,
//             borderColor: "#DADFF7",
//             borderRadius: 8,
//             bottom: -7,
//             left: -7,
//             transform: [{ rotate: "15deg" }],
//           }}
//         />
//         <ImageComponent
//           source={{ uri: images[0] }}
//           style={{
//             width: 80,
//             height: 80,
//             borderRadius: 8,
//             position: "absolute",
//             borderWidth: 2,
//             borderColor: "black",
//           }}
//         />
//       </View>
//     );
//   } else {
//     return (
//       <ImageComponent
//         source={Images.user}
//         style={{ height: width / 3.5, width: width / 3.5 }}
//       />
//     );
//   }
// }
