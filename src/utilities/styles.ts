import { StyleSheet } from "react-native";
import { colors, width } from "./constants";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.main1
    },
    loadview:{
        width: 200,
        height: 200,
        backgroundColor: 'trasnsparent',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      },
    cbtn:{
        minHeight: 45,
        top: 10,
        alignSelf: 'center',
        borderRadius: 25,
        width: width / 1.1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        marginBottom: 10,
        alignItems: 'center',
      },
      cbtntxt:{
        color: colors.black,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
      },
})