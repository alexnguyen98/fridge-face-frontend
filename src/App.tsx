import React from 'react';
import { SafeAreaView } from 'react-native';
import { registerRootComponent } from 'expo';
import { RootStack } from './navigation';

const App = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <RootStack />
  </SafeAreaView>
);

export default registerRootComponent(App);
