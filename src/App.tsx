import React from 'react';
import { registerRootComponent } from 'expo';
import { RootStack } from './navigation';

const App = () => <RootStack />;

export default registerRootComponent(App);
