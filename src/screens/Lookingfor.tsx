import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

import firestore from '@react-native-firebase/firestore';
import { AppText, Wrapper, Header, TouchableComponent } from '../utilities/Helpers';
import { colors, width } from '../utilities/constants';



const Lookingfor = (props :any) => {
  const data = props.route.params.dataa
  console.log(data);
  
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    fetchUsers()
  }, [])
   const fetchUsers = async () => {
    try {
      // Query Firestore for users whose IDs match the array
      const usersSnapshot = await firestore()
        .collection('Users')
        .where('Lookingfor', '==', data)
        .get();

      // Extract user data from documents
      const userData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(userData, "yyyy");
      setProducts(userData);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };


    function lookingfor({ item }: any) {
      return (
                    <TouchableComponent onPress={() => { props.navigation.navigate('OtherProfile', { data: item }) }}>
        
        <View style={{
          marginTop: 20,
          flexDirection: 'row',
          backgroundColor: 'white',
          width: width / 1.1,
          height: 70,
          alignItems: 'center',
          marginHorizontal: 20,
          borderWidth: 1,
          borderColor: colors.main2,
          borderRadius: 13
        }}>
          <Image source={{ uri: item.images[0] }} style={{ height: width / 8, width: width / 8, marginHorizontal: 20, marginLeft: 10, borderRadius: 8 }} />
          <AppText style={{
            fontSize: 23,
            color: "black",
            fontWeight: '400'
          }}>{item.name}</AppText>
        </View>
        </TouchableComponent>
      )
    }
    return (

      <Wrapper>
        <Header title={'hello'} onPress={() => props.navigation.goBack()} />
        {/* <Text style={{fontFamily: fonts.playregular,
                       color: "#6A5ACD",
                       fontSize: 40,
                       marginHorizontal:20}}>Blocked</Text> */}
        <FlatList data={products} renderItem={lookingfor}  />
        {/* <AppText style={{ textAlign: 'center', marginTop: 50 }}>No Data Found</AppText> */}
      </Wrapper>

    )
  }

  export default Lookingfor