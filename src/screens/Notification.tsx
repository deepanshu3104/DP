import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

import firestore from '@react-native-firebase/firestore';
import { AppText, Wrapper, Header, TouchableComponent } from '../utilities/Helpers';
import { colors, width } from '../utilities/constants';
import { InitialProps } from '../utilities/Props';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notification: React.FC<InitialProps> = (props) => {

    const [products, setProducts] = useState<any>([]);
    const [loading, setLoading] = useState<any>(false);

    useEffect(() => {
        fetchUsers()
    }, [])
    const fetchUsers = async () => {
        try {
            const uid: any = await AsyncStorage.getItem('uid')
            // Query Firestore for users whose IDs match the array
            const querySnapshot = await firestore().collection('Users').where("id", "==", uid).get();
            const userData: any = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(userData, "yyyy");

            let likes = userData[0].likes
            console.log(likes);


            const usersSnapshot = await firestore()
                .collection('Users')
                .where(firestore.FieldPath.documentId(), 'in', likes)
                .get();

            // Extract user data from documents
            const userData1 = usersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(userData1);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    function like({ item }: any) {
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
                    borderRadius: 13,

                }}>
                    <Image source={{ uri: item.images[0] }} style={{ height: width / 8, width: width / 8, marginHorizontal: 10, marginLeft: 10, borderRadius: 8 }} />
                    <AppText style={{
                        fontSize: 23,
                        color: "black",
                        fontWeight: '400'
                    }}>{item.name}</AppText>
                    <AppText style={{
                        fontSize: 23,
                        color: "black",
                        fontWeight: '300'
                    }}> sent you a like ❤️</AppText>
                </View>
            </TouchableComponent>
        )
    }
    return (
        <Wrapper>
            <Header title='Notification' onPress={() => props.navigation.goBack()} />
            <FlatList data={products} renderItem={like} />
        </Wrapper>
    )
}

export default Notification