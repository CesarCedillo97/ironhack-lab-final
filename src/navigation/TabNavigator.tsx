import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedStack from './FeedStack';
import CartScreen from '../screens/Cart/CartScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchStack from './SearchStack';
import {MainColors} from '../utils/theme';

const Tab = createBottomTabNavigator();

const getTabBarIcon =
  (route: any) =>
  ({color, size}: {focused: boolean; color: string; size: number}) => {
    let iconName;

    if (route.name === 'Home') {
      iconName = 'home';
    } else if (route.name === 'Search') {
      iconName = 'search';
    } else if (route.name === 'Cart') {
      iconName = 'shopping-cart';
    }

    return <Icon name={iconName || 'default-icon'} color={color} size={size} />;
  };

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: getTabBarIcon(route),
        tabBarActiveTintColor: MainColors.primary,
        tabBarInactiveTintColor: MainColors.tertiary,
        tabBarStyle: {backgroundColor: '#f8f8f8'},
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={FeedStack} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{headerShown: true}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
