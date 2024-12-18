import { Alert,View } from "react-native";
import React, { useState } from "react";
import {Commonbtn,Wrapper, Header } from "../utilities/Helpers";
import { InitialProps } from "../utilities/Props";
import { colors, fonts, Gender, width } from "../utilities/constants";
import { CommonInput, CommonInputBtn } from "../utilities/Input";
import { Images } from "../utilities/Images";
import { useFormik } from "formik";
import { registerSchema } from "../utilities/Schema";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DropInput } from "../utilities/DropInput";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Edit: React.FC<InitialProps> = (props) => {
  const [show, setShow] = useState<boolean>(true);
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
  const handleAdd = async () => {
    try {
      const data = props.route.params.data
      await formik.setFieldValue('name',data.name)
      await formik.setFieldValue('email',data.email)
      await formik.setFieldValue('password',data.password)
      await formik.setFieldValue('dob',data.dob)
      await formik.setFieldValue('gender',data.gender)
      await formik.setFieldValue('showme',data.showmee)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  React.useEffect(()=>{
handleAdd()
  },[])
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
  return (
    <Wrapper>
      <View>
        <Header title={'Edit Profile'} onPress={() => props.navigation.goBack()} />
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
          textContentType="name" // Autofill name
  autoComplete="name"
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



        <DateTimePickerModal
          isVisible={datepickermodal}
          maximumDate={new Date()}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={() => setdatePickermodal(false)}
        />
      </View>
    </Wrapper>
  )
}

export default Edit