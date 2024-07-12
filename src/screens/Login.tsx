import {  Text, StyleSheet } from "react-native";
import React from "react";
import { ImageComponent, Wrapper } from "../utilities/Helpers";
import { Images } from "../utilities/Images";
import { width } from "../utilities/constants";

const Login = () => {
  return (
    <Wrapper>
      <Text style={styles.title}>Datify</Text>
      <ImageComponent
        source={Images.logo}
        style={styles.logo}
        tintColor="black"
      />
    </Wrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  title: {
    width: width / 1.1,
    alignSelf: "center",
    textAlign: "center",
    color: "black",
    fontSize: width / 10,
  },
  logo: { width: width / 1.1, height: 200, alignSelf: "center" },
});
