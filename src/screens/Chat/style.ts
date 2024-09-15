import { StyleSheet } from "react-native";
import { colors, fonts, width } from "../../utilities/constants";

export const styles = StyleSheet.create({
  headerview: {
    flexDirection: "row",
   backgroundColor:'red',
   justifyContent:'space-between'
  },
  headertext: {
    fontFamily: fonts.playregular,
    color: "transparent",
    fontSize: 18,
  },
});
