import type { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum RootStackRoutes {
  Home = 'Home',
  RegistrationWalkthrough = 'RegistrationWalkthrough',
  RegisterScan = 'RegisterScan',
  RegisterCamera = 'RegisterCamera',
  LoginWelcome = 'LoginWelcome',
  LoginCamera = 'LoginCamera',
  CartCamera = 'CartCamera',
  CartCheckout = 'CartCheckout',
  CartProduct = 'CartProduct',
  CartSearch = 'CartSearch',
}
export type RootStackParam = {
  [RootStackRoutes.Home]: undefined;
  [RootStackRoutes.RegistrationWalkthrough]: undefined;
  [RootStackRoutes.RegisterScan]: undefined;
  [RootStackRoutes.RegisterCamera]: {
    user: string;
  };
  [RootStackRoutes.LoginCamera]: undefined;
  [RootStackRoutes.LoginWelcome]: undefined;
  [RootStackRoutes.CartCamera]: undefined;
  [RootStackRoutes.CartCheckout]: undefined;
  [RootStackRoutes.CartProduct]: {
    product: string;
  };
  [RootStackRoutes.CartSearch]: undefined;
};
export type RootStackNavigationProps<T extends keyof RootStackParam> = {
  navigation: NativeStackNavigationProp<RootStackParam, T>;
  route: RouteProp<RootStackParam, T>;
};
