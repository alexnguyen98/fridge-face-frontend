import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './Home';
import { Login } from './Login';
import { Registration } from './Registration';
import { RootStackRoutes } from '../types/navigation';

const Stack = createNativeStackNavigator();

export const RootStack = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name={RootStackRoutes.Home} component={Home} />
      <Stack.Screen name={RootStackRoutes.Login} component={Login} />
      <Stack.Screen name={RootStackRoutes.Register} component={Registration} />
    </Stack.Navigator>
  </NavigationContainer>
);
