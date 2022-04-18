import React from 'react';
import { View } from 'react-native';
import { Button } from '../components/common/Button';
import { Spacer } from '../components/common/Spacer';
import { RootStackNavigationProps, RootStackRoutes } from '../types/navigation';

type Props = RootStackNavigationProps<RootStackRoutes.Home>;

export const Home: React.FC<Props> = ({ navigation }) => {
  const handleRedirect = (route: RootStackRoutes) => {
    navigation.navigate(route);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
      {/* <Button title="Login" onPress={() => handleRedirect(RootStackRoutes.Cart)} /> */}
      <Button onPress={() => handleRedirect(RootStackRoutes.Login)}>Login</Button>
      <Spacer />
      <Button onPress={() => handleRedirect(RootStackRoutes.Register)}>Register</Button>
    </View>
  );
};
