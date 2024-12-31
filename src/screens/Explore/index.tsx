import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import { CommonExplore, Wrapper, Header } from '../../utilities/Helpers'
import { InitialProps } from '../../utilities/Props'
import { width } from '../../utilities/constants'
import { Images } from '../../utilities/Images'

const data1 = [
  {
    title: "Long-Term Relationship",
  Image:Images.c

  
  },
  {
    title: "Casual Dating",
    Image:Images.a
  },
  {
    title: "Marriage",
    Image:Images.b
  
  },
  {
    title: "Friendship",
    Image:Images.d
  
  },
  {
    title: "Short-Term Fun",
    Image:Images.f
  
  },
  {
    title: "Travel Buddy",
    Image:Images.e
  
  },
]



const Explore: React.FC<InitialProps> = (props) => {
  return (
    <Wrapper>
      {/* <Header title={'Explore'} onPress={() => props.navigation.goBack()} /> */}
      
      <View style={{alignSelf:'center',marginTop:20}}>
      <FlatList showsHorizontalScrollIndicator={false}  numColumns={2} data={data1} renderItem={({ item, index }) => (
                     <View style={{width:width/2}}>
                      <CommonExplore  source={item.Image} title={item.title} onPress={() => {props.navigation.navigate("Lookingfor",{dataa:item.title})}} />
                      
                    </View>  

                    )} />
      </View>
    </Wrapper>
  )
}

export default Explore