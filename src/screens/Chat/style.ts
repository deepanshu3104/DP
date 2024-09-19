import { StyleSheet } from "react-native";
import { colors, fonts, width } from "../../utilities/constants";

export const styles = StyleSheet.create({
  headerview: {
    flexDirection: "row",
   justifyContent:'space-between',
   alignItems:'center',
   marginHorizontal:5,
   marginBottom:10,
   marginTop:10
  },
  headertext: {
    fontFamily: fonts.playregular,
    color: "transparent",
    fontSize: 18,
  },
  messageImageView: {
    backgroundColor: "darkgrey",
    width: 35,
    height:35,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    width:width/1.2,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.main2,
    borderRadius: 100,
  },
});
