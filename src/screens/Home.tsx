import React from 'react';
import { View } from 'react-native';
import * as Analytics from 'expo-firebase-analytics';
import { RootStackNavigationProps, RootStackRoutes } from '../types/navigation';
import { Button } from '../components/common/Button';
import { Spacer } from '../components/common/Spacer';

type Props = RootStackNavigationProps<RootStackRoutes.Home>;

export const Home: React.FC<Props> = ({ navigation }) => {
  const handleRedirect = (route: RootStackRoutes) => {
    Analytics.logEvent('screen_view', {
      screen: route,
    });

    navigation.navigate(route);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
      <Button onPress={() => handleRedirect(RootStackRoutes.Login)}>Login</Button>
      <Spacer />
      <Button onPress={() => handleRedirect(RootStackRoutes.Register)}>Register</Button>
    </View>
  );
};
