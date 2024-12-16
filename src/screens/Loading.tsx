import React, { useEffect } from "react";
import { Text, View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { InitialProps } from "../utilities/Props";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Loading: React.FC<InitialProps> = (props) => {
    useEffect(() => {
        Go()
    }, [])


   async function Go() {
        const uid = await AsyncStorage.getItem('uid')
        setTimeout(() => {
            SplashScreen.hide();
            if(uid !== '' && uid !== null && uid !== undefined){
                props.navigation.navigate('Home')
            }else{
            props.navigation.navigate('Login')
            }
        }, 2000);
    }

    return (
        <View>
            <Text>Loading</Text>
        </View>
    )
}

export default Loading