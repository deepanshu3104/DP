import { FlatList, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
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


const Profile: React.FC<InitialProps> = (props) => {
  const [logoutModal, setLogoutModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  // const [data, setData] = useState<any>({
  //   id: 2,
  //   name: "Aishwarya Rai",
  //   age: 34,
  //   occupation: "Software Developer",
  //   location: "San Francisco, CA",
  //   education: "BS in Computer Science from Stanford",
  //   interests: ["Coding", "Video games", "Cycling"],
  //   bio: "Enthusiastic coder who enjoys solving complex problems and is an avid gamer. Always on the lookout for new tech innovations.",
  //   images: [
  //     "https://www.hollywoodreporter.com/wp-content/uploads/2011/05/chopard_gallery_2-2011-a-p.jpg?w=1440&h=810&crop=1",
  //     "https://static.toiimg.com/photo/96227403/96227403.jpg?v=3",
  //     "https://m.media-amazon.com/images/M/MV5BNmZmOWVmOTAtZTE3OS00OTBlLTg3M2EtYWRlNDI0NzI5OWY3XkEyXkFqcGdeQXVyNDI3NjU1NzQ@._V1_.jpg",
  //   ],
  // });<
  const [products, setProducts] = useState<any>([]);
  const fetchProducts = async () => {
    try {
      const querySnapshot = await firestore().collection('Users').get();
      // console.log('Total products: ', querySnapshot.size);

      let data : any = [];
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
  useEffect(() => {


    fetchProducts();
  }, []);
  

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
      <Card index={0} onPress={() => {props.navigation.navigate('Favourites') }} />
      <Card index={1} onPress={() => { props.navigation.navigate('Blocked')}} />
      {/* <Card index={2} onPress={() => { }} /> */}
      <Card index={3} onPress={() => { setLogoutModal(true) }} />
      <Card index={4} onPress={() => { setDeleteModal(true) }} />
      <ConfirmModal
        isVisible={logoutModal}
        title={'Are You sure you want to Logout ?'}

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