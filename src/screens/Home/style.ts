import { StyleSheet } from "react-native";
import { colors, fonts, width } from "../../utilities/constants";


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
      color: colors.main2,
      fontSize: 18,
    },
    cardView:{
        width: width/3,
        height:width/3,
        alignItems: "center",
        justifyContent: "center",
    },
    cardCommon:{
        width: width/3.05,
        height:width/3.05,
        borderRadius:4,
    },
    messageImageView: {
      backgroundColor: "darkgrey",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  