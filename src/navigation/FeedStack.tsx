import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';
import Details from '../screens/ProductDetails/ProductDetailsScreen';

const Stack = createStackNavigator();

const FeedStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator>
);

export default FeedStack;
