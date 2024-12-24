import { FlatList, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { InitialProps } from "../../utilities/Props";
import {
  AppText,
  ImageComponent,
  TouchableComponent,
  TouchableImage,
  Wrapper,
} from "../../utilities/Helpers";
import { profiles } from "../../utilities/data";
import { colors, width } from "../../utilities/constants";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { styles } from "./style";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

const Home: React.FC<InitialProps> = (props) => {

  function renderProfiles({ item }: any) {
    return (
      <TouchableComponent
        onPress={() => {
          props.navigation.navigate("OtherProfile", { data: item });
        }}
        style={styles.cardView}
      >
        <View style={{ ...styles.cardCommon, ...styles.messageImageView }}>
          {item?.images?.length !== 0 ? (
            <ImageComponent
              source={{ uri: item?.images?.[0] }}
              style={styles.cardCommon}
            />
          ) : (
            <Fontisto name={"person"} size={width / 5} color={"grey"} />
          )}
        </View>
        {item.favourite && <MaterialIcons name={"star"} size={20} color={'#FFD700'} style={{ position: 'absolute', top: 5, right: 5 }} />}
        {/* <View style={{ flexDirection: 'row', position: 'absolute', alignItems: 'center', bottom: 5, width: width / 3.05, justifyContent: 'space-evenly' }}> */}

        <LinearGradient colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']} style={{
          flexDirection: 'row',
          position: 'absolute',
          height: 35,
          alignItems:'center',
          bottom: 1,
          left:1,
          width:width/1
        }}>
          <MaterialIcons name={"circle"} size={15} color={'green'} style={{marginHorizontal:5}} />
          <AppText style={{color: 'black', fontWeight: '600' }}>{item.name}</AppText>
        </LinearGradient>
        {/* </View> */}
      </TouchableComponent>
    );
  }


  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const querySnapshot = await firestore().collection('Users').get();
      const uid = await AsyncStorage.getItem('uid')

      let data: any = [];
      let blocked: any = [];
      let faves: any = [];
      querySnapshot.forEach(documentSnapshot => {
        if (documentSnapshot.id == uid) {
          blocked = documentSnapshot.data().blocked
          faves = documentSnapshot.data().favourite
        } else {
          data.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        }

      });

      const filtered = data.filter((item: any) => !blocked.includes(item.id))

      filtered.forEach((item: any) => {
        if (faves.includes(item.id)) {
          item.favourite = true
        } else {
          item.favourite = false
        }
      })
      console.log(filtered);
      setProducts(filtered);
      console.log('Fetched products:', data);
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
      <View style={styles.headerview}>
        <Text style={styles.headertext}>Datify</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width / 5.5 }}>
          <Fontisto
            name={"heart"}
            size={25}
            color={colors.main2}
            onPress={() => { props.navigation.navigate('Notification') }}
          />
          <Fontisto
            name={"filter"}
            size={25}
            color={colors.main2}
            onPress={() => { }}
          />
        </View>
      </View>
      <FlatList data={products} numColumns={3} renderItem={renderProfiles} />
    </Wrapper>
  );
};

export default Home;
