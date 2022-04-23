import React from 'react';
import { SafeAreaView } from 'react-native';
import { registerRootComponent } from 'expo';
import { RootStack } from './navigation';
import { UserContext } from './context/UserContext';
import { CartContext } from './context/CartContext';

const App = () => (
  <UserContext>
    <CartContext>
      <SafeAreaView style={{ flex: 1 }}>
        <RootStack />
      </SafeAreaView>
    </CartContext>
  </UserContext>
);

export default registerRootComponent(App);
