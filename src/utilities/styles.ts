import { StyleSheet } from "react-native";
import { colors, width } from "./constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main1
  },
  loadview: {
    width: 200,
    height: 200,
    backgroundColor: 'trasnsparent',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  cbtn: {
    minHeight: 50,
    top: 10,
    alignSelf: 'center',
    borderRadius: 8,
    width: width / 1.4,
    backgroundColor: colors.main2,
    justifyContent: 'center',
    marginBottom: 10,
    alignItems: 'center',
  },
  cbtntxt: {
    color: colors.main1,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  lwtext1: {
    alignSelf: 'center',
    color:colors.main2,
    marginBottom:10
  },

  lwtext2: {
    fontWeight:'bold'
  },
  btnview: {
    backgroundColor: colors.main2,
    width: width / 1.15,
    height: 55,
    alignSelf: "center",
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 8,
    flexDirection: 'row'
  },
  btnimage: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    right: 30
  },
  btntext: {
    color: colors.main1,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
})