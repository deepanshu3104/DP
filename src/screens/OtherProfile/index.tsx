import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import {
  AppText,
  Commonbtn,
  ImageComponent,
  Loadingcomponent,
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
  const [loading, setLoading] = useState(false)
  const [favourite, setFavourite] = useState(false)
  useEffect(() => { handleConfirm() }, [])
  // useEffect(() => { fetchProducts() }, [favourite])

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
      setFavourite(false);
      const querySnapshot = await firestore().collection('Users').get();
      const uid: any = await AsyncStorage.getItem('uid');
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
      const user = dataa[0]; // The user's data
      const isAlreadyFav = user.favourite.includes(data.id); // Check if the item is already in favourites

      if (isAlreadyFav) {
        // Remove the item from favourites
        const updatedFavourites = user.favourite.filter((itemId: any) => itemId !== data.id);
        await firstUserRef.update({
          favourite: updatedFavourites,
        });
        setFavourite(false); // Set to normal star
        Alert.alert("Removed from favourites");
      } else {
        // Add the item to favourites
        await firstUserRef.update({
          favourite: [...user.favourite, data.id],
        });
        setFavourite(true); // Set to golden star
        Alert.alert("Added to favourites");
      }

      console.log('Done');
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };





  const like = async () => {

    try {
      setLoading(true)
      const uid: any = await AsyncStorage.getItem('uid')
      const firstUserRef = firestore().collection('Users').doc(data.id);
      await firstUserRef.update({
        likes: [...data.likes, uid]
      });

      setLoading(false)
      console.log('done');


    } catch (error) {
      console.error('Error:', error);
      setLoading(false)
    }
  };

  async function GetData() {
    try {
      setLoading(true)
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
        setLoading(false)
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false)
    }
  }
  const Matches = async () => {
    try {
      const currentUserId = await AsyncStorage.getItem('uid');
      const otherUserId = data.id;

      if (!currentUserId || !otherUserId) {
        Alert.alert('Error', 'User ID is missing!');
        return;
      }

      const matchesRef = firestore().collection('Matches');
      const querySnapshot = await matchesRef
        .where('userid', '==', currentUserId)
        .get();

      if (querySnapshot.empty) {
        // No existing document, create a new match document
        const newMatch = {
          users: [otherUserId],
          timestamp: firestore.FieldValue.serverTimestamp(),
          userid: currentUserId,
        };

        await matchesRef.add(newMatch);
        Alert.alert('Hurray', 'Matched successfully!');
      } else {
        // Update existing match document
        const doc = querySnapshot.docs[0];
        const matchData = doc.data();
        const existingUsers = matchData.users || [];

        if (!existingUsers.includes(otherUserId)) {
          await matchesRef.doc(doc.id).update({
            users: firestore.FieldValue.arrayUnion(otherUserId),
          });
          Alert.alert('Hurray', 'Matched successfully!');
        } else {
          Alert.alert('Info', 'You are already matched with this user!');
        }
      }
    } catch (error) {
      console.error('Error creating match:', error);
      Alert.alert('Error', 'Something went wrong!');
    }
  };


  async function GetMatchedData() {
    try {
      setLoading(true)
      const uid = await AsyncStorage.getItem('uid');
      const querySnapshot = await firestore()
        .collection('Matches')
        .where('userid', '==', uid)
        .get();

      if (!querySnapshot.empty) {
        const userData: any = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const matchedUsers = userData[0].users;
        console.log(matchedUsers, "Matched Users:");

        if (matchedUsers.includes(data.id)) {
          console.log('Matched!');
          setMatched(true);
          setLoading(false)
        } else {
          console.log('Not matched yet!');
          setLoading(false)
        }
      } else {
        console.log('No matches found for the current user.');
        setLoading(false)
      }
    } catch (error) {
      console.error('Error retrieving matches:', error);
      setLoading(false)
    }
  }

  const Button = () => {
    if (matched) {
      return <Commonbtn title="Already matched 💏" onPress={() => { }} />;
    } else if (liked) {
      return <Commonbtn title="I Like You 2 ❤️" onPress={() => { Matches(); }} />;
    } else {
      return <Commonbtn title="I Like You ❤️" onPress={() => { like(); }} />;
    }
  };

  // useEffect(() => { button() }, [])


  return (
    <WrapperNoScroll>
      {loading && <Loadingcomponent />}
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
          {/* {data.favourite || favourite ? <MaterialIcons name={"star"} size={35} color={'#FFD700'} style={{ position: 'absolute', right: 2 }} />
            : <Icon
              name={"star-outline"}
              size={35}
              color={colors.main2}
              onPress={() => {
                fav()
              }}
            />} */}
          <TouchableComponent onPress={() => fav()}>
            <Icon name={data.favourite ? 'star' : 'star-outline'} size={30} color={data.favourite ? '#FFD700' : '#6A5ACD'} />
          </TouchableComponent>

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
          height: 50,
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
        <View style={{
          flexDirection: 'row',
          width: width / 4,
          // justifyContent: 'space-around',
          marginTop: 10,
          backgroundColor: '#dfd6ef',
          height: 35,
          alignItems: 'center',
          marginHorizontal: 20,
          borderWidth: 1,
          borderColor: colors.main2,
          borderRadius: 13,
          padding: 2
        }}>
          <MaterialIcons name={"circle"} size={15} color={'green'} style={{}} />
          <AppText style={{ color: "black" }}> Online Now</AppText>
        </View>
        <View style={{
          padding: 10,
          justifyContent: 'center',
          marginTop: 10,
          backgroundColor: '#dfd6ef',
          // height: 35,
          alignSelf: 'flex-start',

          marginHorizontal: 20,
          borderWidth: 1,
          borderColor: colors.main2,
          borderRadius: 13,
        }}>
          <AppText style={{ color: "black", }}>Looking for : {data.Lookingfor}</AppText>
        </View>
        <View style={{
          width: width / 1.1,
          justifyContent: 'space-evenly',
          marginTop: 10,
          backgroundColor: '#dfd6ef',

          marginHorizontal: 20,
          borderWidth: 1,
          borderColor: colors.main2,
          borderRadius: 13,
          padding: 10
        }}>
          {/* <AppText>About me</AppText> */}
          <AppText style={{ color: "black", textAlign: 'center' }}>{data.About}</AppText>
        </View>
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width / 1.1, marginHorizontal: 20 }}>
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
