import React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Loading from '../screens/Loading';
import Inbox from '../screens/Inbox';
import Tab from './Tab';
import Chat from '../screens/Chat';

const stack = createNativeStackNavigator<ParamListBase>();

const Stack = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <stack.Navigator screenOptions={{headerShown: false}}>
          <stack.Screen name="Loading" component={Loading} />
          <stack.Screen name="Login" component={Login} />
          <stack.Screen name="Register" component={Register} />
          <stack.Screen name="Home" component={Tab} />
          <stack.Screen name="Chat" component={Chat} />
        </stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Stack;
