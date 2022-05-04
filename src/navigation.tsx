import React from 'react';
import { Button, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  RootStackParam,
  RootStackRoutes,
  RegisterStackParam,
  RegisterStackRoutes,
  LoginStackParam,
  LoginStackRoutes,
  CartStackParam,
  CartStackRoutes,
} from './types/navigation';
import { Home } from './screens/Home';
import { RegistrationCamera } from './screens/Registration/RegistrationCamera';
import { RegistrationInfo2 } from './screens/Registration/RegistrationInfo2';
import { Welcome } from './screens/Login/Welcome';
import { LoginCamera } from './screens/Login/LoginCamera';
import { CartCamera } from './screens/Cart/CartCamera';
import { CartProduct } from './screens/Cart/CartProduct';
import { CartSearch } from './screens/Cart/CartSearch';
import { CartCheckout } from './screens/Cart/CartCheckout';

const RootNav = createNativeStackNavigator<RootStackParam>();
const RegisterNav = createNativeStackNavigator<RegisterStackParam>();
const LoginNav = createNativeStackNavigator<LoginStackParam>();
const CartNav = createNativeStackNavigator<CartStackParam>();

const CartStack = () => (
  <CartNav.Navigator initialRouteName={CartStackRoutes.CartCamera}>
    <CartNav.Screen name={CartStackRoutes.CartCamera} component={CartCamera} />
    <CartNav.Screen name={CartStackRoutes.CartCheckout} component={CartCheckout} />
    <CartNav.Group screenOptions={{ presentation: 'modal' }}>
      <CartNav.Screen name={CartStackRoutes.CartProduct} component={CartProduct} />
      <CartNav.Screen name={CartStackRoutes.CartSearch} component={CartSearch} />
    </CartNav.Group>
  </CartNav.Navigator>
);

const RegisterStack = () => (
  <RegisterNav.Navigator initialRouteName={RegisterStackRoutes.RegisterInfo}>
    <RegisterNav.Screen
      name={RegisterStackRoutes.RegisterInfo}
      component={RegistrationInfo2}
      options={{
        headerRight: () => (
          <Button
            onPress={() =>
              Alert.alert(
                'Help',
                'Visit Fridge app site on corplifting (https://corp.applifting.cz/admin/mobiles) on your mobile phone and then show the QR code to the camera.'
              )
            }
            title="Help"
          />
        ),
      }}
    />
    <RegisterNav.Screen name={RegisterStackRoutes.RegisterCamera} component={RegistrationCamera} />
  </RegisterNav.Navigator>
);

const LoginStack = () => (
  <LoginNav.Navigator initialRouteName={LoginStackRoutes.LoginCamera}>
    <LoginNav.Screen name={LoginStackRoutes.LoginWelcome} component={Welcome} />
    <LoginNav.Screen name={LoginStackRoutes.LoginCamera} component={LoginCamera} />
  </LoginNav.Navigator>
);

export const RootStack = () => (
  <NavigationContainer>
    <RootNav.Navigator initialRouteName={RootStackRoutes.Home} screenOptions={{ headerShown: false }}>
      <RootNav.Screen name={RootStackRoutes.Home} component={Home} />
      <RootNav.Screen name={RootStackRoutes.Login} component={LoginStack} />
      <RootNav.Screen name={RootStackRoutes.Register} component={RegisterStack} />
      <RootNav.Screen name={RootStackRoutes.Cart} component={CartStack} />
    </RootNav.Navigator>
  </NavigationContainer>
);
