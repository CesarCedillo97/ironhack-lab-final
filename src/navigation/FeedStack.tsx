import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionSpecs,
} from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = React.lazy(() => import('../screens/Home/HomeScreen'));
const Details = React.lazy(
  () => import('../screens/ProductDetails/ProductDetailsScreen'),
);

const FeedStack: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      gestureEnabled: true,
      transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator>
);

export default FeedStack;
