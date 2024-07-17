import { Text, StyleSheet, View } from "react-native";
import React from "react";
import {
  AppText,
  ImageComponent,
  TouchableComponent,
  Wrapper,
} from "../utilities/Helpers";
import { Images } from "../utilities/Images";
import { colors, fonts, height, width } from "../utilities/constants";

const Login = (props:any) => {
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       '153790510307-kmtk385a7502b6ba76p2vsqvoegkqao5.apps.googleusercontent.com',
  //     offlineAccess: false,
  //     forceCodeForRefreshToken: true,
  //   });
  // }, []);

  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices({
  //       showPlayServicesUpdateDialog: true,
  //     });
  //     const userInfo: any = await GoogleSignin.signIn();

  //     firestore()
  //       .collection('providers')
  //       .where('email', '==', userInfo?.user.email)
  //       .get()
  //       .then(async querySnapshot => {
  //         if (querySnapshot.docs.length !== 0) {
  //           const docData = querySnapshot.docs[0].data();
  //           dispatch(setUserData(docData));
  //           dispatch(resetLoginData());
  //           if (
  //             docData.aadharCardBack !== '' &&
  //             docData.aadharCardFront !== ''
  //           ) {
  //             await AsyncStorage.setItem('aadhar', 'true');
  //             props.navigation.navigate('Home');
  //           } else {
  //             await AsyncStorage.setItem('aadhar', 'false');
  //             props.navigation.navigate('Aadhar');
  //           }
  //         } else {
  //           dispatch(setLoginData(userInfo?.user));
  //           dispatch(resetUserData());
  //           await AsyncStorage.setItem('aadhar', 'false');
  //           props.navigation.navigate('Register');
  //         }
  //       });
  //   } catch (error: any) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.log('User Cancelled the Login Flow');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       console.log('Signing In');
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       console.log('Play Services Not Available or Outdated');
  //     } else {
  //       console.log(error.message);
  //     }
  //   }
  // };

  return (
    <Wrapper>
      <AppText style={styles.title}>Datify</AppText>
      <ImageComponent
        source={Images.logo}
        style={styles.logo}
        tintColor={colors.black}
      />
      <TouchableComponent style={styles.btnview} onPress={()=>{
        props.navigation.navigate('Register')
      }}>
        <ImageComponent source={Images.google} style={styles.btnimage}/>
        <AppText style={styles.btntext}>Continue with Google</AppText>
      </TouchableComponent>
    </Wrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  title: {
    width: width / 1.1,
    alignSelf: "center",
    textAlign: "center",
    // color: colors.main2,
    fontSize: width / 8,
    fontFamily:fonts.playregular,
    marginTop:width/10
  },
  logo: { width: width / 1.1, height: width/1.5, alignSelf: "center" ,marginVertical:width/6},
  btnview: {
    backgroundColor: colors.main2,
    width: width / 1.15,
    height: 55,
    alignSelf: "center",
    justifyContent: 'center',
    alignItems: "center",
    borderRadius:8,
    flexDirection:'row'
  },
  btnimage:{
    width: 25,
    height: 25,
    resizeMode: "contain",
    right:30
  },
  btntext:{
    color: colors.black,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  }
});
