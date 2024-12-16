import { FlatList, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
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
        {/* <MaterialIcons name={"star"} size={20} color={'#FFD700'}  style={{position:'absolute',top:5,right:5}}/> */}
        <View style={{flexDirection:'row',position:'absolute',alignItems:'center',bottom:5, width: width/3.05,justifyContent:'space-evenly'}}>
        <MaterialIcons name={"circle"} size={15} color={'green'}  style={{}}/>
        <AppText style={{width:width/3.8,color:'black',fontWeight:'600'}}>{item.name}</AppText>
        </View>
      </TouchableComponent>
    );
  }


  const [products, setProducts] = useState([]);
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
      console.log('Fetched products:', data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {


    fetchProducts();
  }, []);
  return (
    <Wrapper>
      <View style={styles.headerview}>
        <Text style={styles.headertext}>Datify</Text>
        <Fontisto
          name={"filter"}
          size={25}
          color={colors.main2}
          onPress={() => {}}
        />
      </View>
      <FlatList data={products} numColumns={3} renderItem={renderProfiles} />
    </Wrapper>
  );
};

export default Home;
