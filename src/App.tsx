import React from 'react';
import { SafeAreaView } from 'react-native';
import { registerRootComponent } from 'expo';
import { RootStack } from './navigation';
import { UserContext } from './context/UserContext';

const App = () => (
  <UserContext>
    <SafeAreaView style={{ flex: 1 }}>
      <RootStack />
    </SafeAreaView>
  </UserContext>
);

export default registerRootComponent(App);
