import React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Login from '../screens/Login';
import Register from '../screens/Register';

const stack = createNativeStackNavigator<ParamListBase>();

const Stack = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <stack.Navigator screenOptions={{headerShown: false}}>
          <stack.Screen name="Login" component={Login} />
          <stack.Screen name="Register" component={Register} />
        </stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Stack;
