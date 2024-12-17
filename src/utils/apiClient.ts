import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {ApiResponse} from './types';
import {ApiUrls} from './constants';

const apiClient: AxiosInstance = axios.create({
  baseURL: ApiUrls.BASE_URL, // URL base de tu API
  timeout: 5000, // Tiempo de espera (opcional)
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchData = async <T>(
  config: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.request(config);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('API Error:', error.message || error);

    return {
      success: false,
      error: error.response?.data?.error || 'Something went wrong.',
    };
  }
};

export default apiClient;
