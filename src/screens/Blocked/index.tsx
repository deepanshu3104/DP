import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { InitialProps } from '../../utilities/Props'
import { AppText, Wrapper,Header } from '../../utilities/Helpers'
import firestore from '@react-native-firebase/firestore';
import { colors, fonts, width } from "../../utilities/constants";


const Blocked: React.FC<InitialProps> = (props) => {
const userIds = props.route.params.blocked
console.log(userIds);

  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);

  useEffect(()=>{
    fetchUsers()
  },[])

  const fetchUsers = async () => {
    try {
      // Query Firestore for users whose IDs match the array
      const usersSnapshot = await firestore()
        .collection('Users')
        .where(firestore.FieldPath.documentId(), 'in', userIds)
        .get();

      // Extract user data from documents
      const userData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(userData,"yyyy");
      

      setProducts(userData);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  function block ({item} : any){
    return (
      <View style={{
              marginTop: 20,
              flexDirection: 'row',
              backgroundColor: 'white',
              width: width / 1.1,
              height: 70,
              alignItems: 'center',
              marginHorizontal: 20,
              borderWidth:1,
              borderColor:colors.main2,
              borderRadius:13
            }}>
        <Image source={{ uri: item.images[0] }} style={{ height: width / 8, width: width / 8, marginHorizontal: 20 ,marginLeft:10,    borderRadius:8}} />
               <AppText style={{
                 fontSize: 23,
                 color: "black",
                 fontWeight: '400'
               }}>{item.name}</AppText>
      </View>
    )
  }

  return (
    <Wrapper>
      <Header title={'Blocked'} onPress={()=>props.navigation.goBack()}/>
      {/* <Text style={{fontFamily: fonts.playregular,
                 color: "#6A5ACD",
                 fontSize: 40,
                 marginHorizontal:20}}>Blocked</Text> */}
 <FlatList data={products}  renderItem={block}/>
    </Wrapper>
  )
}

export default Blocked