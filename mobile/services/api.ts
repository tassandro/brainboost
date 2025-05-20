// api.ts (React Native)
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Criação da instância
const API = axios.create({
  // baseURL: 'http://10.0.2.2:8000',
  // baseURL: 'http://172.15.2.156:8000',
  baseURL: 'http://192.168.1.4:8000',
});

// Intercepta requisições para incluir token
API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  //  Alert.alert(
  //   '🔵 API REQUEST',
  //   [
  //     `🔹 METHOD: ${config.method?.toUpperCase()}`,
  //     `🔹 URL: ${config.baseURL ?? ''}${config.url ?? ''}`,
  //     `🔹 HEADERS: ${JSON.stringify(config.headers, null, 2)}`,
  //     `🔹 BODY: ${typeof config.data === 'string' ? config.data : JSON.stringify(config.data, null, 2)}`
  //   ].join('\n\n')
  // ); 
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
