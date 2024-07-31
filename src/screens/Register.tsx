import { Alert, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import {
  Commonbtn,
  ImageComponent,
  TouchableComponent,
  Wrapper,
} from "../utilities/Helpers";
import { colors, fonts, Gender, width } from "../utilities/constants";
import { CommonInput, CommonInputBtn } from "../utilities/Input";
import { Images } from "../utilities/Images";
import { useFormik } from "formik";
import { registerSchema } from "../utilities/Schema";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DropInput } from "../utilities/DropInput";

const Register = () => {
  const [image, setImage] = useState<any>("");
  const [datepickermodal, setdatePickermodal] = useState<boolean>(false);

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
      gender:"",
      showme:"",
      image: [],
    },
    validationSchema: registerSchema,
    onSubmit: () => {
      // Register();
    },
  });

  return (
    <Wrapper>
      <Text style={styles.title}>Datify</Text>
      <TouchableComponent style={styles.imageback}>
        {image !== "" ? (
          <ImageComponent
            source={{ uri: image?.path }}
            style={{ width: 25, height: 25 }}
          />
        ) : (
          <ImageComponent
            source={Images.user}
            style={{ height: width / 3.5, width: width / 3.5 }}
          />
        )}
         <ImageComponent source={Images.pencil} style={styles.pencil} />
      </TouchableComponent>
      <CommonInput
        placeholder="Enter Display Name"
        isicon="yes"
        iconSource={Images.user}
        iconstyle={{ width: 25, height: 25 }}
        value={formik.values.name}
        onChangeText={formik.handleChange("name")}
        onBlur={formik.handleBlur("name")}
        error={
          formik.touched.name && formik.errors.name ? formik.errors.name : ""
        }
        errorspacing={formik.touched.name && formik.errors.name ? "yes" : "no"}
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
          imgsrc={Images.cake}
          value={formik.values.gender}
          onChange={(item: any) => {
            formik.setFieldValue('service', item.type_services);
          }}
          error={
            formik.touched.gender && formik.errors.gender
              ? formik.errors.gender
              : ''
          }
          errorspacing={
            formik.touched.gender && formik.errors.gender ? 'yes' : 'no'
          }
          label="label"
        />
      <Commonbtn title="Save" onPress={formik.handleSubmit} />
      <DateTimePickerModal
        isVisible={datepickermodal}
        maximumDate={new Date()}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setdatePickermodal(false)}
      />
    </Wrapper>
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
    marginTop:10
  },
  imageback: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: width / 3,
    width: width / 3,
    borderRadius: 8,
    borderWidth:1,
    borderColor:colors.main2,
    marginVertical:width/15
  },
  pencil: {
    height: 30,
    width: 30,
    position: 'absolute',
    top: -10,
    right: -6,
  },
});
