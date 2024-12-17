import {Product} from '../utils/types';

export type RootStackParamList = {
  Home: undefined;
  Details: {product: Product};
  Profile: undefined;
  Settings: undefined;
  Search: undefined;
  Cart: undefined;
  Register: undefined;
  Login: undefined;
};
