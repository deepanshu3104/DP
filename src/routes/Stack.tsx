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
import OtherProfile from '../screens/OtherProfile';
import Blocked from '../screens/Blocked';
import Favourites from '../screens/Favourites';
import Edit from '../screens/Edit';
import Notification from '../screens/Notification';

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
          <stack.Screen name="OtherProfile" component={OtherProfile} />
          <stack.Screen name="Blocked" component={Blocked} />
          <stack.Screen name="Favourites" component={Favourites} />
          <stack.Screen name="Edit" component={Edit} />
          <stack.Screen name="Notification" component={Notification} />
        </stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Stack;
