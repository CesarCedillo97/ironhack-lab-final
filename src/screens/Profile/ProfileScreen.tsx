import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DrawerHeader from '../../components/DrawerHeader';

const ProfileScreen = () => {
  return (
    <>
      <DrawerHeader title="Profile" />
      <View style={styles.container}>
        <Text>ProfileScreen</Text>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
