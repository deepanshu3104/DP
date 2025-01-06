import { StyleSheet } from "react-native";
import { colors, fonts, width } from "../../utilities/constants";

 export const styles = StyleSheet.create({
  headerSView:{
    flexDirection: "row",
    justifyContent:'space-between',
    alignItems:"center"
  },
  headerView1:{
    marginHorizontal:10,
    marginVertical:10
  },
  headerView2:{
    width:width/6,
    right:10
  }
  });