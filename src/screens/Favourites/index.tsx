import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { InitialProps } from "../../utilities/Props";
import { AppText, TouchableComponent, Wrapper,Header} from "../../utilities/Helpers";
import firestore from '@react-native-firebase/firestore';
import { colors, fonts, width } from "../../utilities/constants";



const Favourites: React.FC<InitialProps> = (props) => {
  const userIds = props.route.params.favourite;
  console.log(userIds);

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
        .where(firestore.FieldPath.documentId(), 'in', userIds)
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
  function fav({ item }: any) {
    return (
      <TouchableComponent onPress={() => { props.navigation.navigate('OtherProfile', { data: item }) }}>
      <View
      style={{
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
        {/* <AppText style={{fontSize:40}}>⭐</AppText> */}
        <Image source={{ uri: item.images[0] }} style={{ height: width / 8, width: width / 8, marginHorizontal: 20 ,marginLeft:10,    borderRadius:8}} />
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
           <Header title={'Favourite'} onPress={()=>props.navigation.goBack()}/>
     
      <FlatList data={products} renderItem={fav} />
    </Wrapper>
  );
};

export default Favourites;
