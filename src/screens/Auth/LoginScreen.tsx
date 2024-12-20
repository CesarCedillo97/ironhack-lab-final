import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/types';
import {useAuth} from '../../context/AuthContext';
import Button from '../../components/Button';
import loginUser from '../../api/loginUser';
import SaveToLocalStorage from '../../storage/SaveToLocalStorage';
import {StorageKeys} from '../../storage/StorageKeys';
import {LoginUserResponse} from '../../utils/types';
import {PageStatus} from '../../utils/constants';
import {useTranslation} from 'react-i18next';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen: React.FC = () => {
  const {t} = useTranslation();

  const navigation = useNavigation<LoginScreenNavigationProp>();
  const {login} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, seterrorMessage] = useState<string>('');
  const [screenState, setscreenState] = useState<PageStatus>(
    PageStatus.CONTENT,
  );

  const handleLogin = async () => {
    setscreenState(PageStatus.LOADING);
    if (username === '' || password === '') {
      seterrorMessage(t('genericErrorMessage'));
      setscreenState(PageStatus.CONTENT);
      return;
    }
    const responseUser = await loginUser({username, password});
    if (responseUser.success && responseUser.data) {
      seterrorMessage('');
      console.log(responseUser.data);
      await SaveToLocalStorage<LoginUserResponse>(
        StorageKeys.USER,
        responseUser.data,
      );
      login();
    }
    setscreenState(PageStatus.CONTENT);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('loginScreenHeader')}</Text>

      <TextInput
        style={styles.input}
        placeholder={t('userNamePlaceHolder')}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder={t('passwordPlaceHolder')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text style={styles.errorText}>{errorMessage}</Text>

      <Button
        text={t('loginButton')}
        onPress={handleLogin}
        isLoading={screenState === PageStatus.LOADING}
      />

      <View style={styles.signupContainer}>
        <Text>{t('registerQuestion')}</Text>
        <Button
          text={t('registerText')}
          size="md"
          onPress={() => navigation.replace('Register')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  signupContainer: {
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default LoginScreen;
