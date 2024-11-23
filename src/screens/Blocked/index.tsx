import { View, Text } from 'react-native'
import React from 'react'
import { InitialProps } from '../../utilities/Props'
import { AppText, Wrapper } from '../../utilities/Helpers'

const Blocked: React.FC<InitialProps> = (props) => {
  return (
    <Wrapper>
        <AppText>Blockedd</AppText>
    </Wrapper>
  )
}

export default Blocked