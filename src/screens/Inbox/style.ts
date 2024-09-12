import { StyleSheet } from "react-native";
import { colors, fonts } from "../../utilities/constants";

 export const styles = StyleSheet.create({
    headerview: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 20,
      marginVertical: 10,
      alignItems: "center",
    },
    headertext: {
      fontFamily: fonts.playregular,
    //   color: colors.main2,
      color: 'transparent',
      fontSize: 18,
    },
  });