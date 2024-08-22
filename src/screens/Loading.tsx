import React, { useEffect } from "react";
import { Text, View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { InitialProps } from "../utilities/Props";


const Loading: React.FC<InitialProps> = (props) => {
    useEffect(() => {
        Go()
    }, [])


    function Go() {
        setTimeout(() => {
            SplashScreen.hide();
            props.navigation.navigate('Login')
        }, 2000);
    }

    return (
        <View>
            <Text>Loading</Text>
        </View>
    )
}

export default Loading