import { View, Text } from 'react-native'
import React from 'react'
import { Wrapper } from '../../utilities/Helpers'
import { InitialProps } from '../../utilities/Props'
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../../utilities/constants';

const OtherProfile: React.FC<InitialProps> = (props) => {
  return (
    <Wrapper>
      <Ionicons name={"chevron-back"} size={35} color={colors.main2} onPress={() => {
        props.navigation.goBack()
      }} />
      <Text>OtherProfile</Text>
    </Wrapper>
  )
}

export default OtherProfile