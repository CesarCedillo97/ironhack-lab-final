import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import DrawerHeader from '../../components/DrawerHeader';
import {Picker} from '@react-native-picker/picker';
import {AvalibleLanguages} from '../../utils/constants';
import SaveToLocalStorage from '../../storage/SaveToLocalStorage';
import {StorageKeys} from '../../storage/StorageKeys';

const SettingsScreen = () => {
  const {t, i18n} = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (language: string) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    SaveToLocalStorage<string>(StorageKeys.LANGUAGE, language);
  };

  return (
    <>
      <DrawerHeader title={t('settingsScreenHeader')} />
      <View style={styles.container}>
        <View style={styles.languageContainer}>
          <Text style={styles.label}>{t('changeLanguage')}</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={itemValue => changeLanguage(itemValue)}
              style={Platform.OS === 'ios' ? styles.pickerIOS : styles.picker}>
              {AvalibleLanguages.map(({languageCode, languageName}) => (
                <Picker.Item
                  label={languageName}
                  value={languageCode}
                  key={languageName}
                />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    </>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  languageContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    height: 55,
    width: '100%',
  },
  pickerIOS: {
    height: 100,
    width: '100%',
  },
});
