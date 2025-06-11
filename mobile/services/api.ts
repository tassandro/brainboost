// api.ts (React Native)
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Criação da instância
const API = axios.create({
  baseURL: 'http://172.15.0.76:8080',
});

// Intercepta requisições para incluir token
API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const baseURL = config.baseURL ?? '';
  const url = config.url ?? '';
  console.log('[API REQUEST]', config.method?.toUpperCase(), baseURL + url);
  console.log('[HEADERS]', config.headers);

  console.log('🔵 [API REQUEST]');
  console.log('🔹 METHOD:', config.method?.toUpperCase());
  console.log('🔹 URL:', baseURL + url);
  console.log('🔹 HEADERS:', config.headers);
  console.log('🔹 BODY:', config.data);

  return config;
});

// Intercepta respostas para lidar com erros (como 401)
API.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const baseURL = config.baseURL ?? '';
    const url = config.url ?? '';

    console.log('[API REQUEST]', config.method?.toUpperCase(), baseURL + url);
    console.log('[HEADERS]', config.headers);

    console.log('🔵 [API REQUEST]');
    console.log('🔹 METHOD:', config.method?.toUpperCase());
    console.log('🔹 URL:', baseURL + url);
    console.log('🔹 HEADERS:', config.headers);
    console.log('🔹 BODY:', config.data);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

  API.interceptors.response.use(
    (response) => {
      console.log('🟢 [API RESPONSE]:', response.data);
      return response;
    },
    async (error) => {
      console.warn('🔴 [API ERROR MESSAGE]:', error.message);
      console.warn('🔴 [API ERROR REQUEST]:', error.request);
      console.warn('🔴 [API ERROR RESPONSE]:', error.response?.data);
      return Promise.reject(error);
    }
  );

export default API;
