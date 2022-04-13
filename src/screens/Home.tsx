import React from 'react';
import { View, Button } from 'react-native';
import { RootStackProps, RootStackRoutes } from '../types/navigation';

type Props = {
  navigation: RootStackProps<RootStackRoutes.Home>;
};

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
