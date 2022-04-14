import type { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum RootStackRoutes {
  Home = 'Home',
  Login = 'Login',
  Register = 'Register',
  Cart = 'Cart',
}
export type RootStackParam = {
  [RootStackRoutes.Home]: undefined;
  [RootStackRoutes.Login]: NavigatorScreenParams<LoginStackParam>;
  [RootStackRoutes.Register]: NavigatorScreenParams<RegisterStackParam>;
  [RootStackRoutes.Cart]: NavigatorScreenParams<CartStackParam>;
  [RegisterStackRoutes.RegisterCamera]: {
    user: string;
  };
  [LoginStackRoutes.LoginWelcome]: undefined;
};
export type RootStackNavigationProps<T extends keyof RootStackParam> = {
  navigation: NativeStackNavigationProp<RootStackParam, T>;
  route: RouteProp<RootStackParam, T>;
};

export enum RegisterStackRoutes {
  RegisterInfo = 'RegisterInfo',
  RegisterCamera = 'RegisterCamera',
}
export type RegisterStackParam = {
  [RegisterStackRoutes.RegisterInfo]: undefined;
  [RegisterStackRoutes.RegisterCamera]: {
    user: string;
  };
};
export type RegisterStackProps<T extends keyof RegisterStackParam> = {
  navigation: NativeStackNavigationProp<RegisterStackParam, T>;
  route: RouteProp<RegisterStackParam, T>;
};

export enum LoginStackRoutes {
  LoginWelcome = 'LoginWelcome',
  LoginCamera = 'LoginCamera',
}
export type LoginStackParam = {
  [LoginStackRoutes.LoginWelcome]: undefined;
  [LoginStackRoutes.LoginCamera]: undefined;
};
export type LoginStackProps<T extends keyof LoginStackParam> = {
  navigation: NativeStackNavigationProp<LoginStackParam, T>;
  route: RouteProp<LoginStackParam, T>;
};

export enum CartStackRoutes {
  CartCamera = 'CartCamera',
  CartSummary = 'CartSummary',
  CartProduct = 'CartProduct',
}
export type CartStackParam = {
  [CartStackRoutes.CartCamera]: undefined;
  [CartStackRoutes.CartSummary]: undefined;
  [CartStackRoutes.CartProduct]: undefined;
};
export type CartStackProps<T extends keyof CartStackParam> = {
  navigation: NativeStackNavigationProp<CartStackParam, T>;
  route: RouteProp<CartStackParam, T>;
};
