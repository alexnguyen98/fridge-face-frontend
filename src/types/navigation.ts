import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum RootStackRoutes {
  Home = 'Home',
  Login = 'Login',
  Register = 'Register',
}
export type RootStackParam = {
  [RootStackRoutes.Home]: undefined;
  [RootStackRoutes.Login]: undefined;
  [RootStackRoutes.Register]: undefined;
};

export enum RegisterStackRoutes {
  RegisterCamera = 'RegisterCamera',
  RegisterInfo = 'RegisterInfo',
}
export type RegisterStackParam = {
  [RegisterStackRoutes.RegisterCamera]: undefined;
  [RegisterStackRoutes.RegisterInfo]: undefined;
};

export type RootStackProps<T extends keyof RootStackParam> = NativeStackNavigationProp<RootStackParam, T>;
