import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum RootStackRoutes {
  Home = 'Home',
  Login = 'Login',
  Register = 'Register',
}

export type RootStackParamList = {
  [RootStackRoutes.Home]: undefined;
  [RootStackRoutes.Login]: undefined;
  [RootStackRoutes.Register]: undefined;
};

export type NavigationProps<RouteName extends keyof RootStackParamList = RootStackScreens> = NativeStackNavigationProp<
  RootStackParamList,
  RouteName
>;
