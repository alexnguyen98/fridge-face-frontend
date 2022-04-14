import React from 'react';
import { View, Button } from 'react-native';
import { RootStackNavigationProps, RootStackRoutes } from '../types/navigation';

type Props = RootStackNavigationProps<RootStackRoutes.Home>;

export const Home: React.FC<Props> = ({ navigation }) => {
  const handleRedirect = (route: RootStackRoutes) => {
    navigation.navigate(route);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Login" onPress={() => handleRedirect(RootStackRoutes.Login)} />
      <Button title="Register" onPress={() => handleRedirect(RootStackRoutes.Register)} />
    </View>
  );
};
