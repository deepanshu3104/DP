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
    color: "transparent",
    fontSize: 18,
  },
  messageItem: {
    width: width / 1.05,
    height: 80,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    // backgroundColor:'red',
    // marginBottom:5,
    alignItems: "center",
  },
  messageImageView: {
    backgroundColor: "darkgrey",
    width: 55,
    height: 55,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  messageImage: {},
  messageTextView: {
    width: width / 1.25,
    height: 70,
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.main2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  messageTextView2: {
    width: width / 1.7,
    justifyContent: "space-evenly",
    marginLeft: 6,
  },
  messageTextView3: {
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  messageName: {
    fontSize: width / 25,
    fontWeight: "600",
    color: "black",
  },
  messageTime: { fontSize: width / 33, color: "black" },
  lastMessage: {},
  unreadMsgView: {
    backgroundColor: colors.main2,
    width: 25,
    height: 25,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  unreadMsgText: {
    color: colors.white,
  },
});
