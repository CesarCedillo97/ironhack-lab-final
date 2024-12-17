import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../screens/Search/SearchScreen';
import Details from '../screens/ProductDetails/ProductDetailsScreen';

const Stack = createStackNavigator();

const SearchStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="Search" component={SearchScreen} />
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator>
);

export default SearchStack;
