import { StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import {
  AppText,
  Commonbtn,
  GoogleBtn,
  ImageComponent,
  Loadingcomponent,
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
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login: React.FC<InitialProps> = (props: any) => {

  const [show, setShow] = useState<boolean>(true)
  const [loading, setLoading] = useState(false)

  const [focus, setFocus] = useState<any>([
    { key: 1, name: 'email', status: false },
    { key: 2, name: 'password', status: false }
  ])

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const loginSuccess = await handleLogin(values.email, values.password);
      if (loginSuccess) {
        props.navigation.navigate("Home");
      }
    },
  });


  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const querySnapshot = await firestore()
        .collection("Users")
        .where("email", "==", email)
        .get();

      if (querySnapshot.empty) {
        setLoading(false);
        Alert.alert("Error", "User not found");
        return false;
      }

      // Assuming only one user with a unique email
      const userDoc = querySnapshot.docs[0];
      const user = userDoc.data();

      if (user) {
        // Replace this with hashed password comparison in production
        const isPasswordValid = user.password === password;

        if (isPasswordValid) {
          await AsyncStorage.setItem("uid", userDoc.id);
          props.navigation.navigate('Home')
          setLoading(false);
          return true;
        } else {
          setLoading(false);
          Alert.alert("Error", "Incorrect password");
          return false;
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      Alert.alert("Error", "An error occurred during login");
      return false;
    }
  };


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



  // function Login() {
  //   Alert.alert('Login')
  // }

  return (
    <LWrapper value="Login">
      {loading && <Loadingcomponent />}
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
        onChangeText={(text) => {
          if (text !== ' ') {
            formik.setFieldValue('email', text)
          }
        }}
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
        eyename={show ? 'eye' : 'eye-slash'}
        secureTextEntry={show}
        onPress={() => {
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
    fontWeight: 'bold',
    top: -5
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
