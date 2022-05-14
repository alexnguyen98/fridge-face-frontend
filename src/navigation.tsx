import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParam, RootStackRoutes } from './types/navigation';
import { Home } from './screens/Home';
import { RegistrationCamera } from './screens/Registration/RegistrationCamera';
import { RegistrationWalkthrough } from './screens/Registration/RegistrationWalkthrough';
import { RegistrationScan } from './screens/Registration/RegistrationScan';
import { Welcome } from './screens/Login/Welcome';
import { LoginCamera } from './screens/Login/LoginCamera';
import { CartCamera } from './screens/Cart/CartCamera';
import { CartProduct } from './screens/Cart/CartProduct';
import { CartSearch } from './screens/Cart/CartSearch';
import { CartCheckout } from './screens/Cart/CartCheckout';

const RootNav = createNativeStackNavigator<RootStackParam>();

const sharedOptions = {
  headerBackTitle: 'Back',
};

export const RootStack = () => (
  <NavigationContainer>
    <RootNav.Navigator initialRouteName={RootStackRoutes.Home}>
      <RootNav.Screen name={RootStackRoutes.Home} component={Home} />
      <RootNav.Screen name={RootStackRoutes.RegistrationWalkthrough} component={RegistrationWalkthrough} options={sharedOptions} />
      <RootNav.Screen name={RootStackRoutes.RegisterScan} component={RegistrationScan} options={sharedOptions} />
      <RootNav.Screen name={RootStackRoutes.RegisterCamera} component={RegistrationCamera} options={sharedOptions} />
      <RootNav.Screen name={RootStackRoutes.LoginWelcome} component={Welcome} options={{ headerShown: false }} />
      <RootNav.Screen name={RootStackRoutes.LoginCamera} component={LoginCamera} options={sharedOptions} />
      <RootNav.Screen name={RootStackRoutes.CartCamera} component={CartCamera} options={sharedOptions} />
      <RootNav.Screen name={RootStackRoutes.CartCheckout} component={CartCheckout} options={sharedOptions} />
      <RootNav.Screen name={RootStackRoutes.CartSearch} component={CartSearch} options={sharedOptions} />
      <RootNav.Group screenOptions={{ presentation: 'modal' }}>
        <RootNav.Screen name={RootStackRoutes.CartProduct} component={CartProduct} />
      </RootNav.Group>
    </RootNav.Navigator>
  </NavigationContainer>
);
