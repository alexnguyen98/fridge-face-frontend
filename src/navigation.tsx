import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParam, RootStackRoutes, RegisterStackParam, RegisterStackRoutes } from './types/navigation';
import { Home } from './screens/Home';
import { LoginCamera } from './screens/Login/LoginCamera';
import { RegistrationCamera } from './screens/Registration/RegistrationCamera';
import { RegistrationInfo } from './screens/Registration/RegistrationInfo';

const RootNav = createNativeStackNavigator<RootStackParam>();
const RegisterNav = createNativeStackNavigator<RegisterStackParam>();

const RegisterStack = () => (
  <RegisterNav.Navigator initialRouteName={RegisterStackRoutes.RegisterInfo} screenOptions={{ headerShown: false }}>
    <RegisterNav.Screen name={RegisterStackRoutes.RegisterInfo} component={RegistrationInfo} />
    <RegisterNav.Screen name={RegisterStackRoutes.RegisterCamera} component={RegistrationCamera} />
  </RegisterNav.Navigator>
);

export const RootStack = () => (
  <NavigationContainer>
    <RootNav.Navigator initialRouteName={RootStackRoutes.Home}>
      <RootNav.Screen name={RootStackRoutes.Home} component={Home} />
      <RootNav.Screen name={RootStackRoutes.Login} component={LoginCamera} />
      <RootNav.Screen name={RootStackRoutes.Register} component={RegisterStack} />
    </RootNav.Navigator>
  </NavigationContainer>
);
