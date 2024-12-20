import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { AppText, Commonbtn, GoogleBtn, LWrapper } from "../utilities/Helpers";
import { InitialProps } from "../utilities/Props";
import { colors, fonts, Gender, width } from "../utilities/constants";
import { CommonInput, CommonInputBtn } from "../utilities/Input";
import { Images } from "../utilities/Images";
import { useFormik } from "formik";
import { registerSchema } from "../utilities/Schema";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DropInput } from "../utilities/DropInput";
import { Cstyles } from "../utilities/Cstyles";
import Ionicons from "react-native-vector-icons/Ionicons";
import firestore from '@react-native-firebase/firestore';


const Register: React.FC<InitialProps> = (props) => {
  const [show, setShow] = useState<boolean>(true);
  const [image, setImage] = useState<any>("");
  const [datepickermodal, setdatePickermodal] = useState<boolean>(false);
  const [focus, setFocus] = useState<any>([
    { key: 3, name: "name", status: false },
    { key: 1, name: "email", status: false },
    { key: 2, name: "password", status: false },
  ]);

  const handleConfirm = (date: any) => {
    var today = new Date();
    var birthDate = new Date(date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    var years = moment().diff(date, "years");
    var newDate = moment(date).format("DD-MM-YYYY");
    if (years < 18) {
      setdatePickermodal(false);
      Alert.alert("You should be atleast 18 years old");
    } else {
      formik.setFieldValue("dob", newDate);
      setdatePickermodal(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      dob: "",
      gender: "",
      showme: "",
      email: "",
      password: "",
      
    },
    validationSchema: registerSchema,
    onSubmit: () => { handleAdd() },
  });


  function DoFocus(value: any) {
    focus.forEach((item: any) => {
      if (item.name == value) {
        item.status = true;
      } else {
        item.status = false;
      }
    });
    setFocus([...focus]);
  }

  const handleAdd = async () => {
    try {
      const userRef = firestore().collection('Users').doc(); // Replace 'Users' with your desired collection name
      const uid = userRef.id; // Generate a unique document ID

      await userRef.set({
        id: uid, // Store the unique document ID
        name: formik.values.name,
        dob: formik.values.dob,
        gender: formik.values.gender,
        showme: formik.values.showme,
        email: formik.values.email,
        password: formik.values.password,
        images: [],
        blocked:[],
        favourite:[],
        likes:[]
      });

      Alert.alert('Success', 'User data saved successfully!');
      props.navigation.navigate('Login'); // Navigate to the desired screen
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save user data. Please try again.');
    }
  };



  return (
    <LWrapper value="Register">
      <View style={{ flexDirection: 'row', minHeight: 50 }}>
        <Ionicons name={"chevron-back"} size={35} color={colors.main2} onPress={() => {
          props.navigation.goBack()
        }} />
        <View style={{ marginHorizontal: 10 }}>
          <AppText style={styles.title1}>Register</AppText>
          <AppText style={styles.title2}>Register now , Meet Singles 🫣</AppText>
        </View>
      </View>
      <CommonInput
        onFocus={() => {
          DoFocus("name");
        }}
        focus={focus[0].status}
        placeholder="Enter Display Name"
        value={formik.values.name}
        onChangeText={formik.handleChange("name")}
        onBlur={formik.handleBlur("name")}
        error={
          formik.touched.name && formik.errors.name ? formik.errors.name : ""
        }
        errorspacing={formik.touched.name && formik.errors.name ? "yes" : "no"}
      />
      <CommonInput
        onFocus={() => {
          DoFocus("email");
        }}
        focus={focus[1].status}
        placeholder="Enter Email"
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
          DoFocus("password");
        }}
        focus={focus[2].status}
        placeholder="Enter Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        error={
          formik.touched.password && formik.errors.password ? formik.errors.password : ""
        }
        errorspacing={formik.touched.password && formik.errors.password ? "yes" : "no"}
        eye="yes"
        eyename={show ? "eye" : "eye-slash"}
        secureTextEntry={show}
        onPress={() => {
          setShow(!show);
        }}
      />

      <CommonInputBtn
        value={
          formik.values.dob !== "" ? formik.values.dob : "Select Date of Birth"
        }
        onPress={() => {
          setdatePickermodal(true);
        }}
        color={colors.main2}
        iconSource={Images.cake}
        iconstyle={{ width: 25, height: 25 }}
        error={formik.touched.dob && formik.errors.dob ? formik.errors.dob : ""}
        errorspacing={formik.touched.dob && formik.errors.dob ? "yes" : "no"}
      />
      <DropInput
        data={Gender}
        placeholder="Select Gender"
        imgsrc={Images.gender}
        value={formik.values.gender}
        onChange={(item: any) => {
          formik.setFieldValue("gender", item.label);
        }}
        error={
          formik.touched.gender && formik.errors.gender
            ? formik.errors.gender
            : ""
        }
        errorspacing={
          formik.touched.gender && formik.errors.gender ? "yes" : "no"
        }
        label="label"
      />
      <DropInput
        data={Gender}
        placeholder="Show me"
        imgsrc={Images.gender}
        value={formik.values.showme}
        onChange={(item: any) => {
          formik.setFieldValue("showme", item.label);
        }}
        error={
          formik.touched.showme && formik.errors.showme
            ? formik.errors.showme
            : ""
        }
        errorspacing={
          formik.touched.showme && formik.errors.showme ? "yes" : "no"
        }
        label="label"
      />

      <Commonbtn
        title="Continue"
        onPress={formik.handleSubmit}
      />

      <AppText style={styles.or}>OR</AppText>
      <GoogleBtn
        onPress={() => {
          props.navigation.navigate("Register");
        }}
      />
      <DateTimePickerModal
        isVisible={datepickermodal}
        maximumDate={new Date()}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setdatePickermodal(false)}
      />
    </LWrapper>
  );
};

export default Register;

const styles = StyleSheet.create({
  title: {
    width: width / 1.1,
    alignSelf: "center",
    textAlign: "center",
    color: colors.main2,
    fontSize: width / 8,
    fontFamily: fonts.playregular,
    marginTop: 10,
  },
  imageback: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: width / 3,
    width: width / 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.main2,
    marginVertical: width / 15,
  },
  pencil: {
    height: 30,
    width: 30,
    position: "absolute",
    top: -10,
    right: -6,
  },
  or: {
    alignSelf: "center",
    color: colors.main2,
    fontWeight: "bold",
    marginVertical: 10,
    fontSize: 16,
  },
  title1: {
    ...Cstyles.widthview,
    fontSize: width / 18,
    color: colors.main2,
    fontWeight: '700',
    marginBottom: 5
  },
  title2: {
    ...Cstyles.widthview,
    fontSize: width / 28,
    color: colors.main2,
    fontWeight: '400',
    marginBottom: 15
  },
});
