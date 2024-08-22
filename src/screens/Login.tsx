import { StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import {
  AppText,
  Commonbtn,
  GoogleBtn,
  ImageComponent,
  LWrapper,
  SpaceComponent,
  TouchableComponent,
} from "../utilities/Helpers";
import { Images } from "../utilities/Images";
import { colors, fonts, width } from "../utilities/constants";
import { InitialProps } from "../utilities/Props";
import { CommonInput } from "../utilities/Input";
import { useFormik } from "formik";
import { loginSchema } from "../utilities/Schema";

const Login: React.FC<InitialProps> = (props: any) => {
  
  const [show, setShow] = useState<boolean>(true)

  const [focus, setFocus] = useState<any>([
    { key: 1, name: 'email', status: false },
    { key: 2, name: 'password', status: false }
  ])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: () => {
      Login();
    },
  });

  function DoFocus(value: any) {
    focus.forEach((item: any) => {
      if (item.name == value) {
        item.status = true
      } else {
        item.status = false
      }
    });
    setFocus([...focus])
  }

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

  function Login (){
    Alert.alert('Login')
  }

  return (
    <LWrapper value="Login">
      <AppText style={styles.title}>Datify</AppText>

      <CommonInput
        onFocus={() => {
          DoFocus('email')
        }}
        focus={focus[0].status}
        placeholder="Email or Phone number"
        isicon="yes"
        iconSource={Images.user}
        iconstyle={{ width: 25, height: 25 }}
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
        error={
          formik.touched.email && formik.errors.email ? formik.errors.email : ""
        }
        errorspacing={formik.touched.email && formik.errors.email ? "yes" : "no"}
      />
      <CommonInput
        onFocus={() => {
          DoFocus('password')
        }}
        focus={focus[1].status}
        placeholder="Password"
        isicon="yes"
        iconSource={Images.user}
        iconstyle={{ width: 25, height: 25 }}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        eye="yes"
        eyename={show ? 'eye' :'eye-slash'}
        secureTextEntry={show}
        onPress={()=>{
          setShow(!show)
        }}
        onBlur={formik.handleBlur("password")}
        error={
          formik.touched.password && formik.errors.password ? formik.errors.password : ""
        }
        errorspacing={formik.touched.password && formik.errors.password ? "yes" : "no"}
      />
      <AppText style={styles.forgotpass}>Forgot your Password ?</AppText>
      <SpaceComponent />
      <Commonbtn title="Login" onPress={formik.handleSubmit} />
      <AppText style={styles.or}>OR</AppText>
      <GoogleBtn onPress={() => {
        props.navigation.navigate('Register')
      }} />
    </LWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  title: {
    width: width / 1.1,
    alignSelf: "center",
    textAlign: "center",
    color: colors.main2,
    fontSize: width / 8,
    fontFamily: fonts.playregular,
    marginVertical: width / 11
  },
  logo: { width: width / 1.1, height: width / 1.5, alignSelf: "center", marginVertical: width / 6 },
 
  forgotpass: {
    alignSelf: 'flex-end',
    right: 15,
    color: colors.main2,
    fontWeight:'bold',
    top:-5
  },
  or: {
    alignSelf: 'center',
    color: colors.main2,
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 16
  },
  dontrem: {
    alignSelf: 'center',
    color: colors.main2,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,

  }
});
