import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { Wrapper } from '../utilities/Helpers'
import { width } from '../utilities/constants'
import { CommonInput } from '../utilities/Input'

const Register = () => {
  return (
    <Wrapper>
      <Text style={styles.title}>Datify</Text>
      <CommonInput />
    </Wrapper>
  )
}

export default Register


const styles = StyleSheet.create({
  title: {
    width: width / 1.1,
    alignSelf: "center",
    textAlign: "center",
    // color: "grey",
    fontSize: width / 10,
  },

});