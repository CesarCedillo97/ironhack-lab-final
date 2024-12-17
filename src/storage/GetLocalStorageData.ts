import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageKeys} from './StorageKeys';
import {ApiResponse} from '../utils/types';

export default async <T>(key: StorageKeys): Promise<ApiResponse<T>> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return {success: true, data: JSON.parse(value) as T};
    }
    return {
      success: false,
      error: 'No info found',
    };
  } catch (error) {
    return {
      success: false,
      error: 'Error al consultar Storage: ' + JSON.stringify(error),
    };
  }
};
