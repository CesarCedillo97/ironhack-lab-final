import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MainColors} from '../utils/theme';

export type HeaderProps = {
  title: string;
};

type DrawerNavigation = DrawerNavigationProp<RootStackParamList>;

const DrawerHeader = ({title}: HeaderProps) => {
  const navigation = useNavigation<DrawerNavigation>();

  const handleDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleDrawer} style={styles.button}>
          <Icon name="menu" size={24} color={MainColors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
};

export default memo(DrawerHeader);

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    zIndex: 100,
    elevation: 4,
  },
  iconContainer: {
    width: '15%',
    alignItems: 'flex-start',
  },
  textContainer: {
    width: '85%',
    justifyContent: 'center',
    textAlign: 'left',
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
