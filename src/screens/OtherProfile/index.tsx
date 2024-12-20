import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import {
  AppText,
  Commonbtn,
  ImageComponent,
  SpaceComponent,
  TouchableComponent,
  WrapperNoScroll,
} from "../../utilities/Helpers";
import { InitialProps } from "../../utilities/Props";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors, height, width } from "../../utilities/constants";
import SwiperFlatList from "react-native-swiper-flatlist";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./style";
import Fontisto from "react-native-vector-icons/Fontisto";
import { Cstyles } from "../../utilities/Cstyles";
import ConfirmModal from "../../modals/ConfirmModal";
import { Images } from "../../utilities/Images";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";


const OtherProfile: React.FC<InitialProps> = (props) => {
  const data = props.route.params.data;

  useEffect(() => { GetData() }, [])
  useEffect(() => { GetMatchedData() }, [])
  console.log("profile render")
  const [blockModal, setBlockModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [matched, setMatched] = useState(false)
  const [age, setAge] = useState('');
  useEffect(() => { handleConfirm() }, [])


  const handleConfirm = () => {
    const data = props.route.params.data;
    const [day, month, year] = data.dob.split('-');
    const date = new Date(`${year}-${month}-${day}`);
    var today = new Date();

    var birthDate = new Date(date);
    // console.log(data.dob, birthDate);

    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    let years: any = moment().diff(date, "years");
    var newDate = moment(date).format("DD-MM-YYYY");
    // console.log("age : ",years,newDate);
    setAge(years)
  };
  const fetchProducts = async () => {

    try {
      const querySnapshot = await firestore().collection('Users').get();
      const uid: any = await AsyncStorage.getItem('uid')

      let dataa: any = [];
      querySnapshot.forEach(documentSnapshot => {

        if (documentSnapshot.id == uid) {
          dataa.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        }

      });

      console.log('user data==>>>>', dataa);

      const firstUserRef = firestore().collection('Users').doc(uid);
      await firstUserRef.update({
        blocked: [...dataa[0].blocked, data.id]
      });

      console.log('done');
      setBlockModal(false)
      props.navigation.navigate('Home')
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fav = async () => {
    try {
      const querySnapshot = await firestore().collection('Users').get();
      const uid: any = await AsyncStorage.getItem('uid')
      let dataa: any = [];
      querySnapshot.forEach(documentSnapshot => {
        if (documentSnapshot.id == uid) {
          dataa.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        }
      });
      const firstUserRef = firestore().collection('Users').doc(uid);
      await firstUserRef.update({
        favourite: [...dataa[0].favourite, data.id]
      });

      console.log('done');
      setBlockModal(false)
      Alert.alert("added")
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


  const like = async () => {

    try {

      const uid: any = await AsyncStorage.getItem('uid')
      const firstUserRef = firestore().collection('Users').doc(data.id);
      await firstUserRef.update({
        likes: [...data.likes, uid]
      });


      console.log('done');


    } catch (error) {
      console.error('Error:', error);

    }
  };

  async function GetData() {
    try {
      const uid: any = await AsyncStorage.getItem('uid')
      const data = props.route.params.data;
      const querySnapshot = await firestore().collection('Users').where("id", "==", uid).get();
      const userData: any = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const likes = userData[0].likes
      console.log(likes);

      if (likes.includes(data.id)) {
        setLiked(true)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const Matches = async () => {
    try {
      // Get the current user ID and the other person's ID
      const currentUserId = await AsyncStorage.getItem('uid');
      const otherUserId = data.id;
  
      if (!currentUserId || !otherUserId) {
        Alert.alert('Error', 'User ID is missing!');
        return;
      }
  
      // Get the reference to the Matches collection
      const matchesRef = firestore().collection('Matches');
  
      // Check if a match already exists for this combination
      const querySnapshot = await matchesRef
        .where('userid', '==', currentUserId)
        .get();
  
      if (querySnapshot.empty) {
        // Create a new match document since it doesn't exist
        const newMatch = {
          users:  [otherUserId], // Store both user IDs in an array
          timestamp: firestore.FieldValue.serverTimestamp(), // Track when the match occurred
          userid: currentUserId, // Optionally track who initiated the match
        };
  
        await matchesRef.add(newMatch);
  
        // Show a success message
        Alert.alert('Hurray', 'Matched successfully!');
      } else {
        // Match already exists
        
        
      }
    } catch (error) {
      // If there’s an error, show an error message
      console.error('Error creating match:', error);
      Alert.alert('Error', 'Something went wrong!');
    }
  };
  
  async function GetMatchedData() {
    try {
      const uid: any = await AsyncStorage.getItem('uid')

      const querySnapshot = await firestore().collection('Matches').where('userid', '==', uid).get();
      const userData: any = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const matched = userData[0].users
      console.log(matched, " hlooooooooo");

      if (matched.includes(data.id)) {
        console.log('hiiii');
        setMatched(true)
      }
    } catch (error) {
      console.error('Error1234654:', error);
    }
  }
  const Button = () => {
    if (matched) {
      return <Commonbtn title="Already matched" onPress={() => { }} />;
    } else if (liked) {
      return <Commonbtn title="I Like You 2 ❤️" onPress={() => { Matches(); }} />;
    } else {
      return <Commonbtn title="I Like You ❤️" onPress={() => { like(); }} />;
    }
  };
  
// useEffect(() => { button() }, [])


  return (
    <WrapperNoScroll>
      <View style={{ ...styles.headerSView, ...styles.headerView1 }}>
        <Ionicons
          name={"chevron-back"}
          size={35}
          color={colors.main2}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
        <View style={{ ...styles.headerSView, ...styles.headerView2 }}>
          <Icon
            name={"block-helper"}
            size={25}
            color={colors.main2}
            onPress={() => { setBlockModal(true) }}
          />
          {data.favourite ? <MaterialIcons name={"star"} size={35} color={'#FFD700'} style={{ position: 'absolute', right: 5 }} />
            : <Icon
              name={"star-outline"}
              size={35}
              color={colors.main2}
              onPress={() => {
                fav()
              }}
            />}
        </View>
      </View>
      <ScrollView>
        <View style={{ width: width, height: height / 2 }}>
          {data.images.length !== 0 ? (
            <SwiperFlatList
              showPagination
              paginationStyle={{
                backgroundColor: colors.main2,
                borderRadius: 8,
                alignItems: "center",
              }}
              paginationStyleItem={{ height: 10, width: 10 }}
              data={data?.images}
              renderItem={({ item }) => (

                <ImageComponent
                  resizeMode="contain"
                  source={{ uri: item }}
                  style={{ width: width, height: height / 2 }}
                />


              )}
            />
          ) : (
            <View
              style={{
                width: width,
                height: height / 2,
                backgroundColor: "darkgrey",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Fontisto name={"person"} size={width / 1.5} color={"grey"} />
            </View>
          )}
        </View>
        <View style={{
          flexDirection: 'row',
          width: width / 1.1,
          justifyContent: 'space-evenly',
          alignSelf: 'center',
          marginTop: 20,
          backgroundColor: '#dfd6ef',
          height: 70,
          alignItems: 'center',
          marginHorizontal: 20,
          borderWidth: 1,
          borderColor: colors.main2,
          borderRadius: 13,

        }}>
          <AppText style={{ ...Cstyles.widthview }}>
            {data?.name}
          </AppText>
          <AppText style={{ ...Cstyles.widthview }}>
            ||
          </AppText>
          <AppText style={{ ...Cstyles.widthview }}>
            {age}
          </AppText>
          <AppText style={{ ...Cstyles.widthview }}>
            ||
          </AppText>
          <AppText style={{ ...Cstyles.widthview }}>
            {data.gender}</AppText>

        </View>
        <View style={{ flexDirection: 'row', marginHorizontal: 20, alignItems: 'center', marginTop: 20 }}>
          <MaterialIcons name={"circle"} size={15} color={'green'} style={{}} />
          <AppText>Online Now</AppText>

        </View>
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width / 1.2, marginHorizontal: 30 }}>
      {Button()}
        <TouchableComponent onPress={() => props.navigation.navigate('Chat', { data: data })}>
          <View style={{
            minHeight: 50,
            top: 10,
            alignSelf: 'center',
            borderRadius: 8,
            width: width / 10,
            backgroundColor: colors.main2,
            justifyContent: 'center',
            marginBottom: 10,
            alignItems: 'center',
            paddingHorizontal: 5
          }}>
            <Image source={Images.chat} style={{ height: 25, width: 25, tintColor: 'white' }} />
          </View>
        </TouchableComponent></View>
      <SpaceComponent />
      <ConfirmModal
        isVisible={blockModal}
        title={`Are You sure you want to Block ${data?.name} ?`}
        onBackdropPress={() => {
          setBlockModal(false);
        }}
        onPress={() => fetchProducts()}
      />
    </WrapperNoScroll>
  );
};

export default OtherProfile;
