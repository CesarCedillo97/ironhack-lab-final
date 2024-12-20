import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import {Alert, Linking, StyleSheet} from 'react-native';
import {AuthProvider} from './src/context/AuthContext';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';
import GetLocalStorageData from './src/storage/GetLocalStorageData';
import {StorageKeys} from './src/storage/StorageKeys';
import {AvalibleLanguages} from './src/utils/constants';

const App = () => {
  const setLanguage = async () => {
    const savedLanguage = await GetLocalStorageData<AvalibleLanguages>(
      StorageKeys.LANGUAGE,
    );
    if (savedLanguage.success && savedLanguage.data) {
      i18n.changeLanguage(savedLanguage.data);
    } else {
      i18n.changeLanguage('es');
    }
  };

  useEffect(() => {
    setLanguage();
    const handleInitialLink = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleUrl(initialUrl);
      }
    };

    const subscription = Linking.addEventListener('url', ({url}) => {
      handleUrl(url);
    });

    handleInitialLink();

    return () => {
      subscription.remove();
    };
  }, []);

  const handleUrl = (url: string) => {
    const route = url.replace(/.*?:\/\//g, '');
    const [path, id] = route.split('/');

    if (path === 'open' && id) {
      Alert.alert('Deeplink', `Abrir ruta: ${path}, con ID: ${id}`);
    } else {
      Alert.alert('Deeplink', `Ruta desconocida: ${route}`);
    }
  };
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <GestureHandlerRootView style={styles.container}>
          <SafeAreaProvider>
            <RootNavigator />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </AuthProvider>
    </I18nextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

/* const linking = {
  prefixes: ['ironhackFinal://'],
  config: {
    screens: {
      Auth: {
        screens: {
          Login: 'login',
          Register: 'register',
        },
      },
      App: {
        screens: {
          Home: 'home',
          Profile: 'profile',
          Settings: 'settings',
        },
      },
    },
  },
}; */
