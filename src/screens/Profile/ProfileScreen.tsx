/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useCallback, useState} from 'react';
import DrawerHeader from '../../components/DrawerHeader';
import {PageStatus} from '../../utils/constants';
import {useFocusEffect} from '@react-navigation/native';
import GetLocalStorageData from '../../storage/GetLocalStorageData';
import {LoginUserResponse} from '../../utils/types';
import {StorageKeys} from '../../storage/StorageKeys';
import {TextColors} from '../../utils/theme';
import {useAuth} from '../../context/AuthContext';
import Button from '../../components/Button';

const ProfileScreen = () => {
  const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.LOADING);
  const [userData, setUserData] = useState<LoginUserResponse | null>(null);

  const {logout} = useAuth();

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  const getData = async () => {
    setPageStatus(PageStatus.LOADING);
    const storedUser = await GetLocalStorageData<LoginUserResponse>(
      StorageKeys.USER,
    );
    if (storedUser.success && storedUser.data) {
      setUserData(storedUser.data);
      setPageStatus(PageStatus.CONTENT);
    } else {
      logout();
    }
  };

  const renderContent = () => {
    if (pageStatus === PageStatus.LOADING) {
      return <Text style={styles.loadingText}>Loading...</Text>;
    }

    if (userData) {
      return (
        <View style={styles.profileContainer}>
          <Image source={{uri: userData.image}} style={styles.profileImage} />
          <Text style={styles.name}>
            {userData.firstName} {userData.lastName}
          </Text>
          <Text style={styles.username}>@{userData.username}</Text>
          <Text style={styles.email}>{userData.email}</Text>
          <Text style={styles.gender}>{userData.gender}</Text>

          <Button text="Cerrar sesión" onPress={() => logout()} size="full" />
        </View>
      );
    }
  };

  return (
    <>
      <DrawerHeader title="Profile" />
      <View style={styles.container}>{renderContent()}</View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    fontSize: 16,
    color: TextColors.secondary,
    marginTop: 20,
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: TextColors.primary,
  },
  username: {
    fontSize: 18,
    color: TextColors.secondary,
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: TextColors.primary,
    marginBottom: 4,
  },
  gender: {
    fontSize: 16,
    color: TextColors.secondary,
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
    width: '80%',
  },
});
