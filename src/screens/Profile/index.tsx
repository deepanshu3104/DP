import { FlatList, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { InitialProps } from "../../utilities/Props";
import {
  AppText,
  ImageComponent,
  TouchableComponent,
  Wrapper,
} from "../../utilities/Helpers";
import { colors, height, width } from "../../utilities/constants";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ConfirmModal from "../../modals/ConfirmModal";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";


const Profile: React.FC<InitialProps> = (props) => {
  const [logoutModal, setLogoutModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
 
  // });<
  const [products, setProducts] = useState<any>([]);
  const fetchProducts = async () => {
    try {
      const uid:any = await AsyncStorage.getItem('uid')
      const querySnapshot = await firestore().collection('Users').where("id", "==", uid).get();
      // console.log('Total products: ', querySnapshot.size);
     
      let data: any = [];
      querySnapshot.forEach(documentSnapshot => {
        data.push({
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        });
      });

      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
 useFocusEffect(
     useCallback(() => {
       fetchProducts()
     }, [])
   );




  return (
    <Wrapper>
      <View
        style={{
          width: width,
          height: height / 4.5,
          backgroundColor: "#dfd6ef",
          justifyContent: "space-evenly",
        }}
      >
        <View
          style={{
            alignSelf: "center",
            height: width / 3,
            width: width / 3,
            backgroundColor: "darkgrey",
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {products[0]?.images?.length !== 0 ? (
            <ImageComponent
              source={{ uri: products[0]?.images?.[0] }}
              style={{
                width: width / 3.05,
                height: width / 3.05,
                borderRadius: 100,
              }}
            />
          ) : (
            <Fontisto name={"person"} size={width / 5} color={"grey"} />
          )}
        </View>
        <AppText
          style={{
            alignSelf: "center",
          }}
        >
          {products[0]?.name}
        </AppText>
      </View>
      <Card index={0} onPress={() => { props.navigation.navigate('Favourites', { favourite: products[0].favourite }) }} />
      <Card index={1} onPress={() => { props.navigation.navigate('Blocked', { blocked: products[0].blocked }) }} />
      {/* <Card index={2} onPress={() => { }} /> */}
      <Card index={3} onPress={() => { setLogoutModal(true) }} />
      <Card index={4} onPress={() => { setDeleteModal(true) }} />
      <ConfirmModal
        isVisible={logoutModal}
        title={'Are You sure you want to Logout ?'}
        onPress={async () => {
          try {
            // Clear the stored user ID from AsyncStorage
            await AsyncStorage.removeItem("uid");
      
            // Navigate to the login screen
            props.navigation.replace('Login')
            setLogoutModal(false);
          } catch (error) {
            console.error("Error logging out:", error);
          }
        }}
        onBackdropPress={() => {
          setLogoutModal(false);
        }}
      />
      <ConfirmModal
        isVisible={deleteModal}
        title={'Are You sure you want to Delete this Account ?'}
        onBackdropPress={() => {
          setDeleteModal(false);
        }}
      />
    </Wrapper>
  );
};

export default Profile;

const options = [
  { key: 1, title: "My Favourites", icon: 'favorite' },
  { key: 2, title: "Blocked List", icon: 'block' },
  { key: 3, title: "Share with Friends", icon: 'share' },
  { key: 4, title: "Logout", icon: 'logout' },
  { key: 5, title: "Delete Account", icon: 'delete' },
];

function Card({ index, onPress }: any) {
  return (
    <TouchableComponent onPress={onPress} style={{ flexDirection: 'row', borderBottomWidth: 0.5, alignItems: 'center', paddingVertical: 10 }}>
      <MaterialIcons name={options[index]?.icon} size={30} color={colors.main2} style={{ marginHorizontal: 10 }} />
      <AppText>{options[index]?.title}</AppText>
    </TouchableComponent>
  )
}